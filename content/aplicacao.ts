/**
 * Textos, perguntas e regras do mini diagnóstico (/aplicar).
 * Para mudar uma pergunta, opção, perfil ou rótulo, edite aqui: o componente só lê deste arquivo.
 */

/** As 11 perguntas que pontuam: cada uma vale pontos de dificuldade (0, 1 ou 2). */
export const camposDeDor = ['escolha', 'lembrado', 'procura', 'chega', 'medo', 'cobraMenos', 'sobra', 'doente', 'horas', 'doisAnos', 'plano'] as const;

export type CampoId = 'nome' | 'empresa' | 'trava' | 'faturamento' | 'telefone' | (typeof camposDeDor)[number];

export type Pergunta =
  | { id: 'nome' | 'empresa'; tipo: 'texto'; titulo: string; ajuda?: string; placeholder: string }
  | { id: 'telefone'; tipo: 'tel'; titulo: string; ajuda?: string; placeholder: string }
  | {
      id: (typeof camposDeDor)[number] | 'trava' | 'faturamento';
      tipo: 'opcoes';
      titulo: string;
      ajuda?: string;
      opcoes: readonly string[];
      /** Só nas perguntas de dor: pontos de dificuldade de cada opção (0, 1 ou 2), na mesma ordem de `opcoes`. */
      pontos?: readonly number[];
      /** Só nas perguntas de dor: o problema em poucas palavras, usado no resumo para a equipe. */
      dor?: string;
    };

/**
 * Seis áreas: cinco com duas perguntas e Dinheiro com uma. A área com mais dificuldade (em proporção) é a mais fraca.
 * `fraco` é a frase do resultado ("Ponto mais fraco: ...").
 */
export const areas = [
  { id: 'desejo', rotulo: 'Desejo', forte: 'os clientes já escolhem você', meio: 'parte dos clientes já escolhe você, e há espaço para mais', fraco: 'a sua marca ainda não é a primeira escolha do cliente', campos: ['escolha', 'lembrado'] },
  { id: 'vendas', rotulo: 'Vendas', forte: 'quem se interessa costuma comprar', meio: 'dá para converter muito mais quem se interessa', fraco: 'muita gente se interessa e ainda não compra', campos: ['procura', 'chega'] },
  { id: 'preco', rotulo: 'Preço', forte: 'você cobra com tranquilidade o que vale', meio: 'o seu preço tem espaço para subir', fraco: 'a sua marca ainda não sustenta o preço que merece', campos: ['medo', 'cobraMenos'] },
  { id: 'dinheiro', rotulo: 'Dinheiro', forte: 'o dinheiro acompanha o seu trabalho', meio: 'o dinheiro pode acompanhar melhor o trabalho', fraco: 'o seu trabalho ainda não rende o que deveria', campos: ['sobra'] },
  { id: 'liberdade', rotulo: 'Liberdade', forte: 'o negócio anda mesmo sem você', meio: 'o negócio pode andar melhor sem você', fraco: 'o negócio ainda depende só de você', campos: ['doente', 'horas'] },
  { id: 'futuro', rotulo: 'Futuro', forte: 'o seu negócio caminha para crescer', meio: 'o seu negócio pode crescer ainda mais', fraco: 'o seu negócio ainda não é uma marca desejada', campos: ['doisAnos', 'plano'] },
] as const;

export type AreaId = (typeof areas)[number]['id'];

/** Em empate de áreas, vale esta ordem: da que mais liga à oferta da HAZE para a que menos liga. */
export const prioridadeAreas: readonly AreaId[] = ['desejo', 'preco', 'vendas', 'liberdade', 'dinheiro', 'futuro'];

/**
 * Dezesseis perguntas no total: nome, empresa, o que quer conseguir (sem pontos), 11 de dor, faturamento e WhatsApp.
 * Nas perguntas de dor, cada opção tem os seus pontos de dificuldade (0, 1 ou 2) em `pontos`,
 * então onze perguntas somam de 0 a 22 pontos. "Não sei ao certo" vale 1.
 */
export const perguntas: readonly Pergunta[] = [
  { id: 'nome', tipo: 'texto', titulo: 'Seu primeiro nome?', placeholder: 'Digite seu nome' },
  { id: 'empresa', tipo: 'texto', titulo: 'Nome do seu negócio?', placeholder: 'Ex: Almeida & Silva' },
  {
    id: 'trava',
    tipo: 'opcoes',
    titulo: 'O que você mais quer conseguir?',
    opcoes: ['Atrair mais clientes', 'Fechar mais vendas', 'Cobrar mais caro', 'Ficar com mais dinheiro', 'Ter uma equipe melhor', 'Não sei ao certo', 'Outro'],
  },
  {
    id: 'escolha',
    tipo: 'opcoes',
    titulo: 'Quantos clientes voltam a comprar?',
    opcoes: ['Quase todos', 'Mais da metade', 'Poucos', 'Quase nenhum', 'Não sei ao certo'],
    pontos: [0, 1, 2, 2, 1],
    dor: 'clientes não voltam',
  },
  {
    id: 'lembrado',
    tipo: 'opcoes',
    titulo: 'Clientes novos por indicação, nos últimos 3 meses?',
    opcoes: ['Vários', 'Alguns', 'Um ou dois', 'Nenhum', 'Não sei ao certo'],
    pontos: [0, 1, 2, 2, 1],
    dor: 'poucas indicações',
  },
  {
    id: 'procura',
    tipo: 'opcoes',
    titulo: 'De cada 10 que pedem preço, quantos compram?',
    opcoes: ['8 a 10', '5 a 7', '2 a 4', '0 a 1', 'Nunca contei'],
    pontos: [0, 0, 1, 2, 1],
    dor: 'poucos interessados compram',
  },
  {
    id: 'chega',
    tipo: 'opcoes',
    titulo: 'O cliente já chega querendo comprar?',
    opcoes: ['Quase sempre', 'Metade das vezes', 'Poucas vezes', 'Quase nunca', 'Não sei ao certo'],
    pontos: [0, 1, 2, 2, 1],
    dor: 'o cliente não chega querendo comprar',
  },
  {
    id: 'medo',
    tipo: 'opcoes',
    titulo: 'O seu preço, perto dos concorrentes, é:',
    opcoes: ['Maior', 'Parecido', 'Menor', 'Não sei ao certo'],
    pontos: [0, 1, 2, 1],
    dor: 'cobra menos que os concorrentes',
  },
  {
    id: 'cobraMenos',
    tipo: 'opcoes',
    titulo: 'Você cobra menos do que gostaria para vender?',
    opcoes: ['Não, cobro o que quero', 'Às vezes', 'Quase sempre', 'Não sei ao certo'],
    pontos: [0, 1, 2, 1],
    dor: 'cobra menos do que gostaria para vender',
  },
  {
    id: 'sobra',
    tipo: 'opcoes',
    titulo: 'Quanto sobrou no último mês, depois de pagar tudo?',
    opcoes: ['Um bom valor', 'Pouco', 'Nada', 'Faltou', 'Não sei ao certo'],
    pontos: [0, 1, 2, 2, 1],
    dor: 'não sobra dinheiro',
  },
  {
    id: 'doente',
    tipo: 'opcoes',
    titulo: 'Se você tirasse 30 dias de férias, o que aconteceria?',
    opcoes: ['Tudo normal', 'Com dificuldade', 'Cairia muito', 'Pararia', 'Nunca pensei nisso'],
    pontos: [0, 1, 2, 2, 1],
    dor: 'o negócio para sem ele',
  },
  {
    id: 'horas',
    tipo: 'opcoes',
    titulo: 'Quantas horas por semana você trabalha no negócio?',
    opcoes: ['Até 30 horas', 'De 30 a 44 horas', 'De 45 a 60 horas', 'Mais de 60 horas', 'Nunca contei'],
    pontos: [0, 1, 2, 2, 1],
    dor: 'trabalha horas demais',
  },
  {
    id: 'doisAnos',
    tipo: 'opcoes',
    titulo: 'Como será a sua empresa em 2 anos?',
    opcoes: ['Muito maior', 'Um pouco maior', 'Igual', 'Menor', 'Não sei ao certo'],
    pontos: [0, 1, 2, 2, 1],
    dor: 'não vê o negócio crescendo',
  },
  {
    id: 'plano',
    tipo: 'opcoes',
    titulo: 'Você tem um plano para os próximos 12 meses?',
    opcoes: ['Sim, com metas', 'Só na cabeça', 'Não tenho', 'Nunca pensei nisso'],
    pontos: [0, 1, 2, 2],
    dor: 'sem plano para os próximos 12 meses',
  },
  {
    id: 'faturamento',
    tipo: 'opcoes',
    titulo: 'Faturamento anual?',
    opcoes: [
      'Ainda não faturamos',
      'Até R$ 60 mil/ano',
      'R$ 60 – 180 mil/ano',
      'R$ 180 – 500 mil/ano',
      'R$ 500 mil – 1 mi/ano',
      'R$ 1 – 5 mi/ano',
      'Mais de R$ 5 mi/ano',
    ],
  },
  {
    id: 'telefone',
    tipo: 'tel',
    titulo: 'Seu WhatsApp?',
    ajuda: 'Com DDD',
    placeholder: '(11) 99999-9999',
  },
];

/** Depois do nome, só esta pergunta chama a pessoa pelo primeiro nome, para não ficar repetitivo. */
export const titulosComNome: Partial<Record<CampoId, (nome: string) => string>> = {
  trava: (n) => `${n}, o que você mais quer conseguir?`,
};

/** Perfis pelos pontos de dificuldade (0 a 22): quanto maior, mais espaço a marca tem para crescer em desejo. */
export const perfis = [
  { ate: 5, titulo: 'MARCA JÁ DESEJADA', texto: 'Ela já atrai, vamos ver até onde pode chegar' },
  { ate: 13, titulo: 'DESEJO EM CRESCIMENTO', texto: 'A base existe, falta mais gente desejá-la' },
  { ate: 22, titulo: 'PRONTA PARA SER DESEJADA', texto: 'Ela pode ser a escolha do mercado, e o caminho começa agora' },
] as const;

/** Proporção de dificuldade de cada área, de 0 (tudo bem) a 1 (muito espaço para crescer). */
export type Proporcoes = Record<AreaId, number>;
const forte = (p: number) => p <= 0.25;
const fraca = (p: number) => p >= 0.75;

/**
 * Padrões que leem duas áreas juntas. O primeiro que combina vira o título do resultado (no lugar do perfil
 * pelos pontos), e cada um só diz o que as respostas da pessoa já mostram. A ordem é a de prioridade.
 */
export const padroes: readonly { quando: (p: Proporcoes) => boolean; titulo: string; texto: string }[] = [
  { quando: (p) => forte(p.desejo) && fraca(p.preco), titulo: 'DESEJADA, MAS BARATA', texto: 'Os clientes já escolhem você, mas o preço ainda não mostra isso' },
  { quando: (p) => forte(p.vendas) && fraca(p.liberdade), titulo: 'VENDE BEM, MAS PRESO', texto: 'As vendas vão bem, mas o negócio ainda depende só de você' },
  { quando: (p) => fraca(p.desejo) && forte(p.vendas), titulo: 'VENDE, MAS NÃO ENCANTA', texto: 'Você vende, mas a marca ainda não é a escolha do cliente' },
  { quando: (p) => forte(p.desejo) && fraca(p.vendas), titulo: 'DESEJADA, MAS NÃO VENDE', texto: 'A marca chama atenção, falta transformar interesse em venda' },
  { quando: (p) => fraca(p.preco) && fraca(p.dinheiro), titulo: 'PREÇO BAIXO, CAIXA CURTO', texto: 'O preço baixo e o dinheiro curto andam juntos, e dá para mudar isso' },
  { quando: (p) => fraca(p.liberdade) && fraca(p.dinheiro), titulo: 'MUITA HORA, POUCA SOBRA', texto: 'Você trabalha muito e o dinheiro não acompanha, e dá para mudar isso' },
  { quando: (p) => fraca(p.desejo) && fraca(p.futuro), titulo: 'MARCA A CONSTRUIR', texto: 'Ainda não há uma marca desejada, e este é o melhor momento para começar' },
  { quando: (p) => forte(p.desejo) && fraca(p.futuro), titulo: 'BOA MARCA, SEM PLANO', texto: 'A marca já atrai, falta um plano para crescer' },
];

export const textosAplicacao = {
  metaTitle: 'HAZE | Diagnóstico',
  metaDescription: 'Descubra o quanto a sua marca é desejada, perguntas rápidas e o resultado na hora',
  boasVindas: {
    antes: 'O QUANTO A SUA MARCA É',
    destaque: 'DESEJADA',
    depois: 'HOJE?',
    paragrafos: ['Resultado na hora, em menos de 3 minutos'],
    recebe: ['Sua nota de desejo, de 1 a 10', 'Onde crescer mais', 'O primeiro passo'],
    fotoAlt:
      'Um homem e uma mulher lado a lado diante de uma vitrine ao pôr do sol, olhando com desejo para o que está exposto, com um gráfico hexagonal de radar em ciano flutuando no vidro',
    botao: 'Iniciar diagnóstico gratuito',
  },
  som: { arquivo: '/audio/get-away.mp3', rotulo: 'Escute um som enquanto nos conta sobre você' },
  ok: 'OK',
  dicaEnter: 'ou pressione Enter',
  voltar: 'Voltar',
  ver: 'Ver o meu resultado',
  enviando: 'Enviando',
  de: 'de',
  incentivos: { quaseLa: 'Quase lá', ultima: 'Última pergunta' },
  erros: {
    obrigatoria: 'Esta pergunta é obrigatória',
    nome: 'Informe o seu primeiro nome',
    telefone: 'Informe um WhatsApp válido com DDD',
    envio: 'Não foi possível enviar agora, tente novamente em instantes',
  },
  resultado: {
    rotulo: 'o seu resultado',
    pontuacao: (nota: number) => `${nota} de 10`,
    medidorTitulo: 'O quanto a sua marca é desejada',
    medidorExtremos: ['Pouco', 'Muito'],
    whatsappBotao: 'Falar com a HAZE no WhatsApp',
    whatsappMensagem: (nome: string, empresa: string) => `Oi, sou ${nome}, da ${empresa}, quero conversar`,
    calculando: 'Calculando o seu resultado',
    pontoFraco: 'Resolver agora',
    radarTitulo: 'A sua marca por área',
    toque: 'Toque em uma área',
    forte: 'Já é forte',
    atencao: 'Em crescimento',
    fragil: 'A construir',
    legendaBotao: 'Um plano de ação claro para a sua marca ser mais desejada e vender mais',
  },
} as const;
