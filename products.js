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
    id: 'EL-001',
    name: 'Carregador USB-C 20W',
    category: 'Eletrônicos',
    condition: 'novo',
    price: 49.90,
    stock: 3,
    featured: true,
    badge: 'NOVO',

    image: '',
    media: [],

    description: 'Carregador compacto USB-C de 20W. Consulte compatibilidade com seu aparelho.'
  },

  {
    id: 'FER-001',
    name: 'Jogo de Chaves 6 peças',
    category: 'Ferramentas',
    condition: 'novo',
    price: 39.90,
    stock: 2,
    featured: false,
    badge: 'OFERTA',

    image: '',
    media: [],

    description: 'Jogo de chaves para tarefas domésticas e manutenção.'
  },

  {
    id: 'INF-001',
    name: 'Roteador Wi-Fi — Testado',
    category: 'Informática',
    condition: 'seminovo',
    price: 59.90,
    stock: 1,
    featured: true,
    badge: 'ACHADO',

    image: '',
    media: [],

    description: 'Equipamento usado e testado. Estado e acessórios conforme fotos. Consulte o modelo disponível.'
  },

  {
    id: 'GAM-001',
    name: 'Controle USB para PC',
    category: 'Games',
    condition: 'novo',
    price: 69.90,
    stock: 2,
    featured: true,
    badge: 'NOVO',

    image: '',
    media: [],

    description: 'Controle USB para computador e jogos compatíveis.'
  },

  {
    id: 'SEM-001',
    name: 'Caixa de som portátil',
    category: 'Seminovos',
    condition: 'seminovo',
    price: 79.90,
    stock: 1,
    featured: true,
    badge: 'TESTADO',

    image: '',
    media: [],

    description: 'Produto seminovo, testado e funcionando. Pequenos sinais de uso podem existir.'
  },

  {
    id: 'INF-002',
    name: 'Memória RAM DDR3 4GB',
    category: 'Informática',
    condition: 'usado',
    price: 35.00,
    stock: 1,
    featured: false,
    badge: 'TESTADO',

    image: '',
    media: [],

    description: 'Memória usada, testada antes da venda. Confirme compatibilidade com seu computador.'
  }

];