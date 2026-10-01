# Garagem do Eletrônico

Site catálogo responsivo para a Garagem do Eletrônico.

## Como usar

1. Abra `config.js` e troque o número em `whatsapp` pelo WhatsApp da loja.
2. Abra `products.js` e cadastre os produtos reais.
3. Para usar fotos, crie `assets/produtos/`, coloque as imagens ali e informe o caminho em `image`, por exemplo `assets/produtos/roteador.jpg`.
4. Publique a pasta inteira em qualquer hospedagem de site estático.

## Estrutura

- `index.html` — estrutura do site.
- `styles.css` — visual responsivo.
- `app.js` — catálogo, filtros, modal e lista de interesse.
- `config.js` — dados gerais da loja.
- `products.js` — produtos/estoque do catálogo.
- `assets/logo.png` — logo da marca.

## O que já funciona

- Site responsivo para celular e computador.
- Catálogo com busca e filtros.
- Categorias.
- Status de estoque.
- Página/modal de detalhes do produto.
- Lista de interesse salva no navegador.
- Mensagem automática para WhatsApp.
- Área de Achados da Garagem.
- Área de serviços.
- Identificação de produtos novos/seminovos/usados.

## Importante

A versão é um catálogo estático: os dados dos produtos ficam no arquivo `products.js`. Ela não possui ainda painel administrativo, banco de dados, login ou pagamento online. Essas funções podem ser adicionadas na próxima etapa sem refazer o layout.
