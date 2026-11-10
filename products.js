// ======================================
// PRODUTOS DO CATÁLOGO
//
// Para adicionar produto, copie um bloco.
//
// image: foto principal (compatibilidade)
// media: sequência de fotos e vídeos
//
// Exemplos:
// 'assets/produtos/produto.jpg'
// 'assets/produtos/video.mp4'
//
// O carrossel aceita:
// .jpg .jpeg .png .webp
// .mp4 .webm .ogg
// ======================================

const PRODUCTS = [

  {
    id: 'PASS-001',
    name: 'Passadeira a vapor Mondial',
    category: 'Ferramentas',
    condition: 'novo',
    price: 280,
    stock: 2,
    featured: true,
    badge: 'ACHADO',

    image: 'img/PASS.webp',
    media: ['img/PASS1.webp'],

    description: '✨ Passadeira a vapor Mondial\n• Desamassa sem precisar de tábua\n• Vapor potente para diversos tecidos\n• Ideal para camisas, vestidos, ternos e cortinas\n• Cabide ajustável e reservatório removível\n• Produto novo e pronto para uso'
  },

  {
    id: 'FER-001',
    name: 'Jogo de Chaves 6 peças',
    category: 'Ferramentas',
    condition: 'novo',
    price: 40.90,
    stock: 2,
    featured: false,
    badge: 'OFERTA',

    image: 'img/IMG-FER-001.webp',
    media: ['img/IMG1-FER-001.webp'],

    description: '⚠️⚠️⚠️VENDO KIT DE CHAVES⚠️⚠️⚠️⚠️ Especificações do: Avulso;- 46 PEÇAS; Estojo termocolante de plástico; Ferramentas de aço cromo vanádio; Medidas 24x13x5 (L, L, A); Peso 1.080kg Encaixes hexagonais padrão 1/4"- Encaixes hexagonais padrão 1/4" Lista de embalagem da embalagem: 14”: Avulso - 4 mm - 4,5 mm - 5,5 mm -6 mm -7 mm; Leve - 8 mm-9 mm-10 mm- 12 mm-13 mm-14 mm; Tomada 21 COM Bits: Ponta de fenda: 4 mm - 5,5 mm-7 mm; Dica Hexagonal: 3 mm - 4 mm -6 mm-7 mm- Dica Hexagonal: 3 mm - 4 mm - 5 mm- 6 mm-7 mm-8 mm-8 mm Ponta Philips: 1-3; Ponta Pozi: 1-3; Ponta de Torx: T10- T15-T20-T25 -T30-T40; Chaves sextavadas L: 1,5 mm - 2 mm - 2,5 mm; Cabo Fixo 74"; Extensão 50 mm (2") e Extensão 100 mm (4"); Extensão Flexível 150 mm (6"); Catraca Reversível 14" com Lançamento Rápido: 15 x 2,7 x2,3 cm - 01 Catraca Reversível 14" com Lançamento Rápido: 15 x 2,7 x 2,3 cm. -01 Cabo de Alimentação T; -01 Junta Universal; -01 Bit Adaptador, Mala- 01 Maleta Valor 40 reais.'
  },

//{
// id: 'INF-001',
//  name: 'Roteador Wi-Fi — Testado',
//  
// category: 'Informática',
// condition: 'seminovo',
// price: 59.90,
//stock: 1,
// featured: true,
// badge: 'ACHADO',
//
//   image: '',
//   media: [],
//
//   description: 'Equipamento usado e testado. Estado e acessórios conforme fotos. Consulte o modelo disponível.'
 // },
///
  {
    id: 'XRE-001',
    name: 'HONDA XRE 300 2014',
    category: 'Ferramentas',
    condition: 'novo',
    price: 19500,
    stock: 2,
    featured: true,
    badge: 'ACHADO',

    image: 'img/XRE.jpeg',
    media: ['img/XRE1.webp'],

    description: '🏍️ HONDA XRE 300 2014 À VENDA 🔴 Ano: 2014 📍 Km: 37.000 km 📍 Local: Itamarandiba – MG 💰 Valor: R$ 19.500 Moto muito bem cuidada, de uso no dia a dia e bem conservada. Uma XRE forte, confortável e confiável, ótima tanto para cidade quanto para estrada. ✅ 37 mil km ✅ Moto bem cuidada ✅ Pronta para uso ✅ Documentação em dia 💰 R$ 19.500 🔄 Estudo trocas — dependendo da proposta. 📲 Interessados podem chamar no WhatsApp para mais informações e fotos..'
  },

  {
    id: 'PARA-001',
    name: 'Parafusadeira e furadeira sem fio 12V Luatek',
    category: 'Ferramentas',
    condition: 'novo',
    price: 150,
    stock: 2,
    featured: true,
    badge: 'ACHADO',

    image: 'img/FUR1.webp',
    media: ['img/IMG FUR.webp'],

    description: '📢 Parafusadeira e furadeira sem fio 12V\n• Bateria de lítio recarregável\n• Luz LED para ambientes com pouca iluminação\n• Controle de torque para maior precisão\n• Duas velocidades e reversão de giro\n• Ideal para montagens, reformas e pequenos reparos\n• Produto novo e pronto para uso'
  },

];