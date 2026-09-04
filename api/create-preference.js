const CATALOG = {
  "PDE-019": "Vortex",
  "PDE-020": "Bravio",
  "PDE-021": "Maré",
  "PDE-022": "Arpão",
  "PDE-023": "Siroco",
  "PDE-024": "Caliente",
  "PDE-025": "Calmaria",
  "PDE-026": "Elizabeth",
  "PDE-027": "Maré",
  "PDE-028": "Hexagonal",
  "PDE-029": "Estrange",
  "PDE-030": "Canela",
  "PDE-001": "Ossos",
  "PDE-002": "Geribá",
  "PDE-003": "Azeda",
  "PDE-004": "Ferradura",
  "PDE-005": "Timão",
  "PDE-006": "Manguinhos",
  "PDE-007": "Rasa",
  "PDE-008": "Tartaruga",
  "PDE-009": "Cristalina",
  "PDE-010": "Sereia",
  "PDE-011": "Bússola",
  "PDE-012": "Enseada",
  "PDE-013": "Brava",
  "PDE-014": "Zangada",
  "PDE-015": "Baía",
  "PDE-016": "Orla",
  "PDE-017": "Maré",
  "PDE-018": "Arpoador"
};
const PRICE = 149.00;

function siteUrl(req) {
  return process.env.SITE_URL || `https://${req.headers.host}`;
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    return res.status(204).end();
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido.' });
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  try {
    if (!process.env.MP_ACCESS_TOKEN) throw new Error('Integração de pagamento ainda não configurada.');
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const requested = Array.isArray(body.items) ? body.items : [];
    if (!requested.length) return res.status(400).json({ error: 'Carrinho vazio.' });

    const items = requested.map(item => {
      const id = String(item.id || '');
      const title = CATALOG[id];
      const quantity = Math.max(1, Math.min(10, Number.parseInt(item.quantity,10) || 1));
      if (!title) throw new Error(`Produto inválido: ${id}`);
      return { id, title: `PIDE Eyewear — ${title} (${id})`, quantity, unit_price: PRICE, currency_id: 'BRL' };
    });

    const orderId = `PIDE-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    const base = siteUrl(req).replace(/\/$/, '');
    const preference = {
      items,
      external_reference: orderId,
      back_urls: {
        success: `${base}/sucesso.html`,
        failure: `${base}/falha.html`,
        pending: `${base}/pendente.html`
      },
      auto_return: 'approved',
      notification_url: process.env.WEBHOOK_URL || `${base}/api/webhook`
    };

    const mp = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method:'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'Content-Type':'application/json'
      },
      body: JSON.stringify(preference)
    });
    const data = await mp.json();
    if (!mp.ok) {
      console.error('Mercado Pago:', data);
      return res.status(502).json({ error:'Não foi possível criar o pagamento.' });
    }
    return res.status(200).json({ init_point:data.init_point, preference_id:data.id, order_id:orderId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error:error.message || 'Erro interno.' });
  }
}
