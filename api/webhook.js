import crypto from 'node:crypto';

/**
 * Webhook do Mercado Pago (Orders API / Checkout notifications).
 *
 * IMPORTANTE sobre autenticação:
 * O Mercado Pago NÃO envia "Authorization: Bearer ...", nem nenhum header
 * de autenticação tradicional nas notificações de webhook. Portanto este
 * endpoint NUNCA deve exigir Authorization Bearer — se exigisse, toda
 * notificação real do Mercado Pago seria rejeitada com 401, que era
 * exatamente o sintoma relatado.
 *
 * A forma correta e atual de validar que a notificação realmente veio do
 * Mercado Pago é validar a ASSINATURA enviada nos headers:
 *   x-signature   -> contém "ts=...,v1=..."
 *   x-request-id  -> identificador da requisição
 * combinados com o "Webhook Secret" (assinatura secreta) gerado no painel
 * do Mercado Pago Developers (Suas integrações > sua aplicação >
 * Webhooks > Configurar notificações > "Assinatura secreta").
 *
 * Esse secret deve ser guardado em uma variável de ambiente própria,
 * SEPARADA do Access Token:
 *   MERCADO_PAGO_WEBHOOK_SECRET
 */

function isValidSignature(req) {
  const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
  // Se o secret ainda não foi configurado na Vercel, não há como validar a
  // assinatura. Nesse caso apenas logamos um aviso e seguimos aceitando a
  // notificação, para não travar a integração antes da configuração final.
  if (!secret) {
    console.warn('MERCADO_PAGO_WEBHOOK_SECRET não configurado — assinatura não validada.');
    return true;
  }

  const signatureHeader = req.headers['x-signature'];
  const requestId = req.headers['x-request-id'];
  if (!signatureHeader) return false;

  // x-signature vem no formato: "ts=1704908010,v1=618c85345248dd820d5fd456117c2e5e5e0862d..."
  const parts = String(signatureHeader).split(',').reduce((acc, part) => {
    const [key, value] = part.split('=').map(s => s && s.trim());
    if (key && value) acc[key] = value;
    return acc;
  }, {});
  const ts = parts.ts;
  const receivedHash = parts.v1;
  if (!ts || !receivedHash) return false;

  // O id do recurso pode chegar via querystring (formato clássico:
  // ?data.id=XXXX&type=payment) ou dentro do corpo (formato atual da
  // Orders API: body.data.id). Verificamos os dois.
  const dataIdFromQuery = req.query && (req.query['data.id'] || req.query.id);
  const dataIdFromBody = req.body && req.body.data && req.body.data.id;
  const dataId = String(dataIdFromQuery || dataIdFromBody || '').toLowerCase();

  // Manifest exigido pelo Mercado Pago para o cálculo do HMAC.
  let manifest = `id:${dataId};`;
  if (requestId) manifest += `request-id:${requestId};`;
  manifest += `ts:${ts};`;

  const computedHash = crypto
    .createHmac('sha256', secret)
    .update(manifest)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(Buffer.from(computedHash), Buffer.from(receivedHash));
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  // O Mercado Pago envia GET esporadicamente para checar disponibilidade
  // do endpoint durante a configuração — respondemos 200 sem exigir nada.
  if (req.method === 'GET' || req.method === 'HEAD') {
    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  if (!isValidSignature(req)) {
    console.warn('Webhook recebido com assinatura inválida ou ausente.');
    return res.status(401).json({ error: 'Assinatura inválida.' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

  // Aceita tanto o formato de notificação clássico (type/topic + data.id)
  // quanto o formato atual de Orders API (action: "order.processed" etc).
  const eventType = body.type || body.topic || 'desconhecido';
  const eventAction = body.action || null;
  const resourceId = body.data && body.data.id;

  console.log('Mercado Pago webhook recebido:', {
    type: eventType,
    action: eventAction,
    resourceId,
    liveMode: body.live_mode
  });

  // Próxima etapa (quando o banco de dados for adicionado): usar
  // resourceId/eventAction para consultar o pagamento/pedido na API do
  // Mercado Pago e então atualizar o status do pedido no banco.

  // Sempre responder 200 rapidamente após validar a assinatura, para que o
  // Mercado Pago não fique reenviando a notificação indefinidamente.
  return res.status(200).json({ received: true });
}
