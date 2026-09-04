export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).json({ ok: true });
  // Próxima etapa: validar a assinatura do Mercado Pago e consultar o pagamento
  // pelo ID antes de marcar um pedido como pago em um banco de dados.
  console.log('Mercado Pago webhook recebido:', req.body);
  return res.status(200).json({ received: true });
}
