/**
 * Todo o texto do site. Edite aqui — os componentes apenas leem deste arquivo.
 * Os títulos com destaque são divididos em `before` (caixa alta), `accent`
 * (serifa itálica com barra) e `after`.
 */

export type NavItem = { label: string; href: string };
export type Card = { title: string; body: string };
export type Stage = {
  id: 'porto' | 'rota' | 'travessia';
  label: string;
  title: string;
  subtitle: string;
  cards: readonly Card[];
  result: { label: string; text: string };
  cta: string;
};

export const copy = {
  brand: 'HAZE',
  apply: 'Iniciar aplicação',
  applyNote: 'Leva menos de 2 minutos',
  skipLink: 'Pular para o conteúdo',
  openMenu: 'Abrir menu',
  closeMenu: 'Fechar menu',

  nav: [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviço', href: '#solucoes' },
    { label: 'Perguntas', href: '#perguntas' },
  ] satisfies readonly NavItem[],

  hero: {
    before: 'FAZEMOS DA SUA MARCA UMA DAS MAIS',
    accent: 'desejadas',
    after: 'DA SUA GERAÇÃO',
    subtitle:
      'Criamos e aceleramos marcas que atraem os clientes certos, elevam o valor percebido e vendem mais.',
  },

  metodo: {
    before: 'COMO TRANSFORMAMOS A SUA MARCA EM UMA DAS mais',
    accent: 'desejadas?',
    name: { lead: 'Método', strong: 'HAZE' },
    cards: [
      {
        number: '01',
        title: 'Porto',
        question: 'Para onde a marca quer ir?',
        body: 'Diagnóstico Profundo, Raio-X do Faturamento e Mapa da Jornada: o retrato completo de onde a empresa está perdendo dinheiro',
        href: '#porto',
      },
      {
        number: '02',
        title: 'Rota',
        question: 'Como chegar lá sendo diferente?',
        body: 'Posicionamento de Marca, Proposta de Valor e Foco Estratégico: a marca definida e o argumento que sustenta o seu preço',
        href: '#rota',
      },
      {
        number: '03',
        title: 'Travessia',
        question: 'Como isso vira realidade?',
        body: 'Marca Aplicada, Time Treinado e Acompanhamento Semanal: a marca rodando na empresa inteira, com ajuste toda semana',
        href: '#travessia',
      },
    ],
    body: 'Unimos marca, experiência do cliente e processo para transformar empresas comuns em marcas desejadas, que vendem mais, vendem mais caro e vendem de novo, sem brigar por preço',
  },

  porto: {
    id: 'porto',
    label: 'PARTE 1 · PORTO',
    title: 'DESCUBRA O QUE ESTÁ TRAVANDO A SUA EMPRESA E PARA ONDE ELA PRECISA IR',
    subtitle: 'Para enxergar onde a empresa está perdendo cliente hoje e para onde ela precisa ir',
    cards: [
      {
        title: 'Diagnóstico Profundo',
        body: 'Abrimos o seu negócio e a sua marca, com os gargalos e as oportunidades apontados um a um, para você crescer sem gastar dinheiro no lugar errado.',
      },
      {
        title: 'Raio-X do Faturamento',
        body: 'Olhamos quanto cada cliente gasta, quantos voltam a comprar, quantos dos que chegam realmente compram e quanto custa trazer um cliente novo, para mostrar em dinheiro o que a sua marca está deixando escapar.',
      },
      {
        title: 'Mapa da Jornada',
        body: 'Desenhamos o caminho do seu cliente, do primeiro contato ao pós-venda, com o ponto exato onde ele desiste marcado, para você parar de perder venda no meio do percurso.',
      },
    ],
    result: { label: 'Resultado:', text: 'mais gente certa chegando e menos cliente perdido no caminho' },
    cta: 'Quero definir meu destino',
  } satisfies Stage,

  rota: {
    id: 'rota',
    label: 'PARTE 2 · ROTA',
    title: 'OCUPE O LUGAR QUE SÓ A SUA MARCA PODE OCUPAR E SAIA DA COMPARAÇÃO POR PREÇO',
    subtitle: 'Para a sua marca ser escolhida pelo que é, e não pelo preço',
    cards: [
      {
        title: 'Posicionamento de Marca',
        body: 'Com os gargalos na mesa, definimos o lugar que só a sua marca ocupa e o cliente que ela quer atrair, para a empresa inteira saber o que vende e para quem.',
      },
      {
        title: 'Proposta de Valor',
        body: 'Estruturamos a proposta de valor da sua marca e os argumentos de venda que sustentam o seu preço, entregando o repertório comercial completo para objeções e comparações, para o seu time vender com margem e sem depender de desconto.',
      },
      {
        title: 'Foco Estratégico',
        body: 'Definimos o que sai da operação, das promoções que corroem margem aos processos que geram atrito na jornada, para concentrar o investimento apenas no que gera receita eficiente.',
      },
    ],
    result: { label: 'Resultado:', text: 'menos desconto para fechar e ticket maior em cada pedido' },
    cta: 'Quero traçar minha rota',
  } satisfies Stage,

  travessia: {
    id: 'travessia',
    label: 'PARTE 3 · TRAVESSIA',
    title: 'COLOQUE A MARCA PARA FUNCIONAR NA JORNADA INTEIRA, DO ANÚNCIO AO PÓS-VENDA',
    subtitle: 'Para o cliente viver exatamente o que a comunicação promete, e a marca virar rotina da empresa',
    cards: [
      {
        title: 'Marca Aplicada',
        body: 'Com o caminho livre, colocamos a marca na identidade, no site e nos conteúdos, para o cliente reconhecer a sua empresa em tudo o que ela mostra.',
      },
      {
        title: 'Time Treinado',
        body: 'Treinamos o seu time e ajustamos cada ponto da jornada, do anúncio ao pós-venda, para o cliente viver exatamente o que a sua comunicação promete.',
      },
      {
        title: 'Acompanhamento Semanal',
        body: 'Acompanhamos a execução toda semana, com dados na mesa, correções e registro do que funcionou, para a marca virar rotina da empresa e não documento na gaveta.',
      },
    ],
    result: { label: 'Resultado:', text: 'cliente que compra de novo e indica a sua marca' },
    cta: 'Quero minha marca em prática',
  } satisfies Stage,

  antesDepois: {
    label: 'MÉTODO HAZE',
    before: 'ANTES E',
    accent: 'DEPOIS',
    antes: {
      title: 'Antes',
      items: ['Marca genérica', 'Comunicação confusa', 'Baixo valor percebido', 'Dependência de preço', 'Pouca diferenciação'],
    },
    depois: {
      title: 'Depois',
      items: ['Marca reconhecível', 'Posicionamento claro', 'Maior valor percebido', 'Mais autoridade', 'Mais preferência'],
    },
  },

  paraQuem: {
    label: 'PARA QUEM É',
    before: 'FEITO PARA MARCAS QUE QUEREM SER',
    accent: 'escolhidas',
    sim: {
      title: 'É para você se',
      items: [
        'Já vende, mas sente que a marca não mostra o valor do que entrega.',
        'Quer ser escolhido pelo que é, e não só pelo preço.',
        'Quer uma comunicação clara, que atraia o cliente certo.',
        'Está pronto para colocar um plano em prática.',
      ],
    },
    nao: {
      title: 'Ainda não é para você se',
      items: [
        'Procura apenas um logo ou um design pronto, sem estratégia.',
        'Quer resultado imediato sem mudar a forma de se posicionar.',
        'Ainda não tem um produto ou serviço definido para vender.',
      ],
    },
  },

  perguntas: {
    label: 'PERGUNTAS FREQUENTES',
    title: 'O QUE VOCÊ PRECISA SABER ANTES DE APLICAR',
    items: [
      {
        question: 'Como funciona a aplicação?',
        answer:
          'Você preenche um formulário curto, que leva menos de 2 minutos, e com as suas respostas avaliamos se a HAZE é o caminho certo para a sua marca e retornamos com o próximo passo.',
      },
      {
        question: 'O que eu recebo em cada parte?',
        answer:
          'Porto: Diagnóstico Profundo, Raio-X do Faturamento e Mapa da Jornada, Rota: Posicionamento de Marca, Proposta de Valor e Foco Estratégico, Travessia: Marca Aplicada, Time Treinado e Acompanhamento Semanal, com ajustes toda semana.',
      },
      {
        question: 'Preciso já ter uma marca para começar?',
        answer:
          'Você precisa ter um negócio, produto ou serviço em funcionamento, a marca pode estar confusa ou pouco clara, esse é justamente o ponto de partida do Porto.',
      },
      {
        question: 'A HAZE serve para o meu tipo de negócio?',
        answer:
          'O Método HAZE foi pensado para negócios que querem aumentar o valor percebido e atrair clientes mais alinhados, na aplicação você conta o seu contexto e analisamos o encaixe.',
      },
      {
        question: 'Posso contratar só uma parte?',
        answer:
          'A HAZE é um único serviço, feito em ordem: Porto, Rota e Travessia, cada parte se apoia na anterior, por isso não são vendidas separadamente, conte na aplicação o seu momento e vemos juntos como começar.',
      },
    ],
  },

  proximoPasso: {
    label: 'PRÓXIMO PASSO',
    before: 'VAMOS VER O QUE A SUA MARCA PODE',
    accent: 'se tornar?',
    body: 'Conte um pouco sobre o seu negócio, se fizer sentido, damos o próximo passo juntos.',
  },

  footer: {
    tagline: 'Marcas que atraem os clientes certos.',
    nav: [
      { label: 'Início', href: '#inicio' },
      { label: 'Serviço', href: '#solucoes' },
      { label: 'Para quem é', href: '#para-quem' },
      { label: 'Perguntas', href: '#perguntas' },
    ] satisfies readonly NavItem[],
    copyright: '© 2026 HAZE, todos os direitos reservados.',
  },
} as const;
