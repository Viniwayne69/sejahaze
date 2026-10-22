/**
 * Todo o texto do site. Edite aqui — os componentes apenas leem deste arquivo.
 * Títulos com destaque: `before` (caixa alta), `accent` (serifa itálica com barra) e `after`.
 */

export const copy = {
  brand: 'HAZE',
  apply: 'Iniciar aplicação',
  applyNote: 'Leva menos de 2 minutos',
  skipLink: 'Pular para o conteúdo',

  topBar: {
    status: 'Aplicações abertas',
  },

  hero: {
    before: 'FAZEMOS DA SUA MARCA UMA DAS MAIS',
    accent: 'desejadas',
    after: 'DA GERAÇÃO',
    subtitle: 'Consultoria que estrutura a experiência do cliente, do primeiro contato ao pós-venda',
  },

  promessa: {
    before: 'VENDA MAIS CARO PARA OS CLIENTES CERTOS,',
    accent: 'SEM DESCONTO',
    antes: 'Antes',
    depois: 'Depois',
    antesFrase: 'Sobrevivendo...',
    depoisFrase: 'Crescendo cada vez mais!',
  },

  dores: {
    title: 'SE A SUA MARCA ESTÁ ASSIM...',
    items: [
      'Vende, mas não consegue crescer',
      'Vende barato e o concorrente leva a fama',
      'Atrai quem só pergunta o preço e perde o cliente certo',
    ],
    closing: 'Chegou a hora de mudar isso com a HAZE',
    cta: 'Quero uma marca desejada',
  },

  metodo: {
    before: 'COMO A HAZE FAZ ISSO',
    accent: 'na prática',
    steps: [
      {
        number: '01',
        title: 'Raio-X',
        body: 'Diagnóstico profundo para achar o que está travando a sua empresa',
      },
      {
        number: '02',
        title: 'Arquitetura',
        body: 'Estruturamos o comercial, posicionamos a marca e montamos o sistema de vendas',
      },
      {
        number: '03',
        title: 'Implementação',
        body: 'Colocamos tudo para funcionar na prática, com a equipe treinada',
      },
    ],
    result: 'Resultado: Marca forte no mercado, time treinado para dar resultado, e aumento do dobro do faturamento',
  },

  paraQuem: {
    sim: {
      title: 'Para quem é',
      dica: 'Toque no que faz sentido para você',
      resposta: 'Então a HAZE é para você',
      items: [
        'Para quem quer uma comunicação clara, que atraia o cliente certo',
        'Quem sente que não está conseguindo escalar o negócio',
        'Sente que está deixando dinheiro na mesa e não sabe o que fazer',
        'Vende, mas não tem um processo comercial definido',
      ],
    },
  },

  depoimentos: {
    before: 'QUEM JÁ PASSOU PELA',
    accent: 'HAZE',
    subtitle: 'Mensagens de clientes',
    hint: 'Deslize para ver mais',
    /**
     * ATENÇÃO: depoimentos FICTÍCIOS, só para montar o layout.
     * Troque pelos reais e mude `illustrative` para false antes de divulgar o site.
     */
    illustrative: true,
    illustrativeNote: 'Exemplos ilustrativos',
    items: [
      {
        name: 'Marina Lopes',
        business: 'Studio de estética',
        message:
          'Depois do posicionamento a gente parou de competir com a clínica do lado, subimos o preço e a agenda continuou cheia',
        time: '09:14',
      },
      {
        name: 'Rafael Costa',
        business: 'Móveis planejados',
        message:
          'O Raio-X do faturamento abriu meus olhos, eu achava que o problema era tráfego e era o pós-venda',
        time: '18:42',
      },
      {
        name: 'Juliana Prado',
        business: 'Consultoria financeira',
        message: 'Meu time finalmente fala a mesma língua, o cliente já chega sabendo por que somos diferentes',
        time: '11:03',
      },
      {
        name: 'André Melo',
        business: 'Restaurante',
        message: 'Paramos de fazer promoção toda semana e o ticket médio subiu, melhor decisão do ano',
        time: '21:27',
      },
      {
        name: 'Carla Nunes',
        business: 'Moda feminina',
        message: 'A marca ficou com a nossa cara, as clientes começaram a marcar a loja sem a gente pedir',
        time: '15:55',
      },
    ],
  },

  aplicacao: {
    before: 'A SUA MARCA DESEJADA',
    accent: 'COMEÇA AQUI',
    body: 'Conte sobre o seu negócio, avaliamos o encaixe e voltamos com o próximo passo',
    cta: 'Quero aplicar minha marca',
    passos: ['Você responde', 'Avaliamos o encaixe', 'Voltamos com o próximo passo'],
  },

  perguntas: {
    title: 'PERGUNTAS FREQUENTES',
    items: [
      {
        question: 'Como funciona a aplicação?',
        answer:
          'Você responde 8 perguntas em menos de 2 minutos, avaliamos o encaixe e voltamos com o próximo passo',
      },
      {
        question: 'O que eu recebo em cada parte?',
        answer:
          'Raio-X: diagnóstico profundo, análise do faturamento e mapa da jornada. Arquitetura: posicionamento, identidade visual, mentoria da equipe e sistema comercial completo (site, CRM, página de vendas e anúncios). Implementação: marca aplicada, time treinado e acompanhamento semanal',
      },
      {
        question: 'Preciso já ter uma marca para começar?',
        answer:
          'Basta ter um negócio funcionando, a marca pode estar confusa, é aí que começamos, na etapa Raio-X',
      },
      {
        question: 'A HAZE serve para o meu tipo de negócio?',
        answer:
          'Serve para negócios que querem atrair clientes mais alinhados, na aplicação você conta o seu contexto e avaliamos o encaixe',
      },
    ],
  },

  ultimoAviso: {
    before: 'O PREÇO DE CONTINUAR',
    accent: 'IGUAL',
    body: 'Quando a sua marca é igual a todas, o cliente só olha o preço',
    cta: 'Quero sair da comparação por preço',
  },

  stickyBar: {
    lead: 'Aplicação',
    note: 'Menos de 2 min',
  },

  footer: {
    tagline: 'Marcas que atraem os clientes certos',
    copyright: '© 2026 HAZE, todos os direitos reservados',
  },
} as const;
