PIDE EYEWEAR — LOJA ONLINE + MERCADO PAGO

ESTA VERSÃO JÁ ESTÁ PREPARADA PARA COMPRA REAL:
- "QUERO ESTE MODELO" adiciona o produto ao carrinho.
- Carrinho abre pelo ícone superior.
- "FINALIZAR COMPRA" chama /api/create-preference.
- O servidor valida os IDs dos produtos e define os preços no backend.
- O Access Token fica somente em variável de ambiente.
- O cliente é enviado ao Checkout Pro do Mercado Pago.
- Há páginas de sucesso, falha e pagamento pendente.

IMPORTANTE:
1. NÃO coloque o MERCADO_PAGO_ACCESS_TOKEN no script.js, index.html ou GitHub.
2. O preço atual configurado no backend é R$ 149,00 para todos os modelos.
3. Antes de produção, crie/seleciona uma aplicação no Mercado Pago Developers e teste com credenciais de teste.

PUBLICAÇÃO RECOMENDADA — VERCEL:
1. Crie um repositório privado ou público no GitHub e envie ESTA pasta inteira.
2. Importe o repositório no Vercel.
3. Em Settings > Environment Variables, adicione:
   MERCADO_PAGO_ACCESS_TOKEN = seu Access Token
   SITE_URL = URL final do site no Vercel
   ALLOWED_ORIGIN = URL do seu GitHub Pages, se o frontend continuar lá.
4. Faça o deploy.
5. Se o frontend continuar no GitHub Pages, altere no index.html:
   window.PIDE_CHECKOUT_API = "https://SEU-PROJETO.vercel.app/api/create-preference";
6. Se tudo for hospedado no Vercel, deixe /api/create-preference como está.

WEBHOOK:
O endpoint /api/webhook já existe como ponto de entrada, mas o ideal é ligar a próxima fase a um banco (Supabase) para:
- salvar pedidos;
- confirmar pagamento consultando a API do Mercado Pago;
- baixar estoque somente após pagamento aprovado;
- registrar cliente e itens.

SEGURANÇA:
O frontend nunca deve decidir o preço final. A função serverless usa um catálogo interno e preço definido no servidor.
