/**
 * Todo o texto do site. Edite aqui — os componentes apenas leem deste arquivo.
 * Títulos com destaque: `before` (caixa alta), `accent` (serifa itálica com barra) e `after`.
 */

export const copy = {
  brand: 'HAZE',
  apply: 'Iniciar diagnóstico gratuito',
  /**
   * Como o diagnóstico é apresentado em todo o site. A duração real do questionário ainda não foi medida,
   * por isso nenhum texto promete tempo: depois de cronometrar, é só acrescentar a duração aqui.
   */
  applyNote: 'Diagnóstico inicial gratuito',
  skipLink: 'Pular para o conteúdo',

  topBar: {
    status: 'Diagnóstico gratuito',
    /** Menu do topo, só aparece no computador. */
    links: [
      { rotulo: 'O problema', href: '#dores' },
      { rotulo: 'Como funciona', href: '#metodo' },
      { rotulo: 'Para quem é', href: '#para-quem' },
      { rotulo: 'Perguntas', href: '#perguntas' },
    ],
  },

  hero: {
    before: 'MOLDAMOS A SUA MARCA PARA SER',
    accent: 'desejada',
    after: 'E VENDER MAIS',
    subtitle: 'Consultoria que estrutura a experiência do cliente, do primeiro contato ao pós-venda',
    nota: 'Descubra o que pode estar impedindo sua marca de vender mais com nosso diagnóstico inicial gratuito',
  },

  promessa: {
    chamada: 'CHEGA DE VENDER POUCO!',
    before: 'TENHA UMA MARCA TÃO',
    accent: 'IRRESISTÍVEL',
    after: 'QUE O CLIENTE PAGA O PREÇO CHEIO',
    antes: 'Antes',
    depois: 'Depois',
    antesFrase: 'Marca ignorada...',
    depoisFrase: 'Marca disputada pelo cliente certo!',
  },

  dores: {
    title: 'SE A SUA MARCA ESTÁ ASSIM...',
    items: [
      'Vende, mas a sua marca não desperta desejo',
      'Vende barato enquanto o concorrente leva a fama e o cliente',
      'Só atrai quem pergunta o preço e perde quem paga',
    ],
  },

  /** Quebra de crença: entre as dores e o método. Sem ponto final, como pede a marca. */
  quebra: {
    rotulo: 'O QUE TRAVA A SUA MARCA',
    before: 'TALVEZ O PROBLEMA NÃO SEJA A',
    accent: 'FALTA DE CLIENTES',
    texto: 'Os clientes chegam, mas poucos compram: são dois os motivos',
    passos: [
      {
        rotulo: 'DIFERENÇA',
        titulo: 'PODEM ESTAR FALTANDO MOTIVOS PARA ESCOLHER VOCÊ',
        texto: 'Quando o cliente não percebe diferença clara entre você e seus concorrentes, o preço acaba sendo o critério de decisão',
        pergunta: 'Se todas as marcas parecem iguais, por que ele pagaria mais pela sua?',
      },
      {
        rotulo: 'VENDA',
        titulo: 'FALTA UM PROCESSO QUE TRANSFORME INTERESSE EM VENDAS',
        texto: 'Mesmo quando alguém demonstra interesse, um atendimento sem direção ou a falta de acompanhamento podem fazer a venda escapar',
        pergunta: 'De que adianta despertar interesse se não consegue transformá-lo em compra?',
      },
    ],
  },

  /** Os 3 pilares: o mecanismo, antes das etapas do método. Sem ponto final, como pede a marca. */
  pilares: {
    rotulo: 'OS 3 PILARES DE UMA MARCA DESEJADA',
    before: 'O QUE FAZ UMA MARCA SER',
    accent: 'ESCOLHIDA?',
    texto: 'É a combinação de três elementos que trabalham juntos para aumentar o valor percebido e transformar interesse em vendas',
    itens: [
      {
        numero: '01',
        rotulo: 'POSICIONAMENTO',
        titulo: 'SEJA A ESCOLHA, NÃO MAIS UMA OPÇÃO',
        texto: 'Sua marca precisa ocupar um lugar claro na mente do cliente: quando ele entende o que torna seu negócio diferente, deixa de comparar apenas preços e passa a ter motivos para escolher você',
      },
      {
        numero: '02',
        rotulo: 'EXPERIÊNCIA',
        titulo: 'FAÇA O CLIENTE PERCEBER VALOR EM CADA CONTATO',
        texto: 'Do primeiro contato ao pós-venda, cada interação influencia a maneira como sua marca é percebida, e uma experiência bem estruturada aumenta o valor percebido e faz o cliente querer voltar',
      },
      {
        numero: '03',
        rotulo: 'CONVERSÃO',
        titulo: 'TRANSFORME INTERESSE EM VENDAS',
        texto: 'Despertar desejo é apenas parte do processo: sua empresa precisa de atendimento preparado e uma estrutura comercial que transforme oportunidades em clientes',
      },
    ],
  },

  metodo: {
    before: 'COMO A HAZE FAZ ISSO',
    accent: 'na prática',
    steps: [
      {
        number: '01',
        title: 'Raio-X',
        body: 'Reunião de diagnóstico: entendemos por que a sua marca não é desejada e saímos com um plano de ação claro',
      },
      {
        number: '02',
        title: 'Arquitetura',
        body: 'Estruturamos o comercial, posicionamos a marca e montamos a máquina que encanta o cliente certo e fecha a venda',
      },
      {
        number: '03',
        title: 'Implementação',
        body: 'Colocamos tudo para rodar, com a sua equipe treinada para vender',
      },
    ],
    result: 'Resultado: Marca desejada no mercado, time treinado para dar resultado e mais vendas',
  },

  /**
   * Provas: casos reais no formato problema, intervenção e resultado.
   * Fica VAZIO de propósito: sem caso real autorizado, a seção não aparece no site.
   * Nunca invente cliente, número ou depoimento. Para exibir, preencha `itens` (e só então).
   */
  provas: {
    rotulo: 'RESULTADOS REAIS',
    before: 'O QUE MUDOU NAS MARCAS QUE',
    accent: 'PASSARAM PELA HAZE',
    itens: [] as readonly {
      cliente: string
      segmento: string
      problema: string
      intervencao: string
      resultado: string
    }[],
  },

  paraQuem: {
    sim: {
      title: 'Para quem é',
      dica: 'Toque no que faz sentido para você',
      resposta: 'Então a HAZE é para você',
      items: [
        'Quer atrair o cliente certo, não o que só pergunta o preço',
        'Vende, mas o negócio não escala',
        'Sabe que está deixando dinheiro na mesa, mas não sabe onde',
        'Vende no improviso, sem processo comercial definido',
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

  perguntas: {
    title: 'PERGUNTAS FREQUENTES',
    items: [
      {
        question: 'Como funciona o diagnóstico?',
        answer:
          'Você responde a algumas perguntas sobre o seu negócio, vê o seu resultado na hora e a nossa equipe continua a conversa pelo WhatsApp',
      },
      {
        question: 'O que eu recebo em cada parte?',
        answer:
          'Raio-X: reunião de diagnóstico que termina em um plano de ação claro; Arquitetura: posicionamento, identidade visual, mentoria da equipe e sistema comercial completo (site, CRM, página de vendas e anúncios); Implementação: marca aplicada, time treinado e acompanhamento semanal',
      },
      {
        question: 'Preciso já ter uma marca para começar?',
        answer:
          'Basta ter um negócio funcionando, a marca pode estar confusa, é aí que começamos, na etapa Raio-X',
      },
      {
        question: 'A HAZE serve para o meu tipo de negócio?',
        answer:
          'Serve para negócios que querem atrair clientes mais alinhados, no diagnóstico você conta o seu contexto e vemos o encaixe',
      },
    ],
  },

  ultimoAviso: {
    before: 'O PREÇO DE CONTINUAR',
    accent: 'IGUAL',
    body: 'Marca igual a todas não dá vontade de comprar, só de comparar preço',
    cta: 'Quero ser escolhido, não comparado',
  },

  stickyBar: {
    lead: 'Diagnóstico grátis',
    note: 'Resultado na hora',
    botao: 'Iniciar diagnóstico',
  },

  footer: {
    tagline: 'Marca desejada vende mais',
    copyright: '© 2026 HAZE, todos os direitos reservados',
  },
} as const;
