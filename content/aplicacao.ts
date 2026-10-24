/**
 * Textos, perguntas e regras do mini diagnóstico (/aplicar).
 * Para mudar uma pergunta, opção, perfil ou rótulo, edite aqui: o componente só lê deste arquivo.
 */

/** As 12 perguntas de dor: cada uma vale pontos de dificuldade (0, 1 ou 2). */
export const camposDeDor = [
  'escolha',
  'lembrado',
  'procura',
  'somem',
  'medo',
  'aumento',
  'sobra',
  'escuro',
  'doente',
  'folga',
  'parado',
  'doisAnos',
] as const;

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
      /** Só nas perguntas de dor: o problema em poucas palavras, usado no resumo para a equipe. */
      dor?: string;
    };

/**
 * Seis áreas, duas perguntas cada. A soma dos pontos das duas mostra qual área está mais fraca.
 * `fraco` é a frase do resultado ("Ponto mais fraco: ...").
 */
export const areas = [
  { id: 'desejo', rotulo: 'Desejo', fraco: 'a sua marca ainda não é a escolha do cliente', campos: ['escolha', 'lembrado'] },
  { id: 'vendas', rotulo: 'Vendas', fraco: 'você corre atrás de clientes e perde muitos no caminho', campos: ['procura', 'somem'] },
  { id: 'preco', rotulo: 'Preço', fraco: 'você deixa dinheiro na mesa por medo de cobrar mais', campos: ['medo', 'aumento'] },
  { id: 'dinheiro', rotulo: 'Dinheiro', fraco: 'o dinheiro não acompanha o seu trabalho', campos: ['sobra', 'escuro'] },
  { id: 'liberdade', rotulo: 'Liberdade', fraco: 'o negócio depende só de você', campos: ['doente', 'folga'] },
  { id: 'futuro', rotulo: 'Futuro', fraco: 'o seu negócio está parado há tempo demais', campos: ['parado', 'doisAnos'] },
] as const;

export type AreaId = (typeof areas)[number]['id'];

/** Em empate de áreas, vale esta ordem: da que mais liga à oferta da HAZE para a que menos liga. */
export const prioridadeAreas: readonly AreaId[] = ['desejo', 'preco', 'vendas', 'liberdade', 'dinheiro', 'futuro'];

/**
 * Nome e empresa primeiro, depois o maior desafio (sem pontos) e as 12 perguntas de dor.
 * Nas perguntas de dor, as opções vão sempre da menor para a maior dificuldade:
 * a primeira vale 0 ponto, a segunda 1 e a terceira 2, então doze perguntas somam de 0 a 24 pontos.
 */
export const perguntas: readonly Pergunta[] = [
  { id: 'nome', tipo: 'texto', titulo: 'Qual o seu primeiro nome?', placeholder: 'Digite seu nome' },
  { id: 'empresa', tipo: 'texto', titulo: 'Qual o nome do seu negócio?', ajuda: 'Para personalizar o seu resultado', placeholder: 'Ex: Almeida & Silva' },
  {
    id: 'trava',
    tipo: 'opcoes',
    titulo: 'Qual tem sido seu maior desafio hoje?',
    opcoes: ['Conseguir clientes novos', 'Fechar as vendas', 'Vender sem baixar o preço', 'O caixa não fecha', 'A equipe', 'Outro'],
  },
  {
    id: 'escolha',
    tipo: 'opcoes',
    titulo: 'Na hora de escolher, o cliente escolhe você ou o mais barato?',
    opcoes: ['Escolhe você', 'Depende do dia', 'O mais barato, quase sempre'],
    dor: 'escolhem o mais barato',
  },
  {
    id: 'lembrado',
    tipo: 'opcoes',
    titulo: 'Quando alguém precisa do que você vende, o seu nome é o primeiro em que ele pensa?',
    opcoes: ['Sim, sou o primeiro', 'Às vezes', 'Quase nunca, eu sumo na hora de decidir'],
    dor: 'não é lembrado',
  },
  {
    id: 'procura',
    tipo: 'opcoes',
    titulo: 'Os clientes correm atrás de você ou você corre atrás deles?',
    opcoes: ['Eles me procuram', 'Metade a metade', 'Eu corro atrás de todos'],
    dor: 'corre atrás dos clientes',
  },
  {
    id: 'somem',
    tipo: 'opcoes',
    titulo: 'Quantas pessoas se interessam por você e somem sem comprar?',
    opcoes: ['Poucas', 'Muitas', 'A maioria, e eu nem sei por quê'],
    dor: 'interessados somem sem comprar',
  },
  {
    id: 'medo',
    tipo: 'opcoes',
    titulo: 'Quantas vezes você deixou de ganhar o que merecia por medo de cobrar mais?',
    opcoes: ['Nunca', 'Algumas vezes', 'Sempre'],
    dor: 'medo de cobrar mais',
  },
  {
    id: 'aumento',
    tipo: 'opcoes',
    titulo: 'Se amanhã você aumentasse o seu preço, o que aconteceria?',
    opcoes: ['Continuariam comprando', 'Alguns iriam embora', 'Quase todos sumiriam'],
    dor: 'cliente some se subir o preço',
  },
  {
    id: 'sobra',
    tipo: 'opcoes',
    titulo: 'Você trabalha muito e, no fim do mês, o dinheiro sobra?',
    opcoes: ['Sobra bastante', 'Sobra pouco', 'Não sobra nada'],
    dor: 'não sobra dinheiro',
  },
  {
    id: 'escuro',
    tipo: 'opcoes',
    titulo: 'Você sabe quanto vai ganhar no mês que vem ou vive no escuro?',
    opcoes: ['Sei quase certo', 'Mais ou menos', 'Vivo no escuro'],
    dor: 'vive no escuro',
  },
  {
    id: 'doente',
    tipo: 'opcoes',
    titulo: 'Se você ficasse doente por 30 dias, o que aconteceria com o seu negócio?',
    opcoes: ['Continuaria funcionando', 'Cairia muito', 'Pararia, o negócio sou eu'],
    dor: 'o negócio para sem ele',
  },
  {
    id: 'folga',
    tipo: 'opcoes',
    titulo: 'Quando foi a última vez que você tirou um dia de folga sem pensar no negócio?',
    opcoes: ['Faço isso sempre', 'Raramente', 'Nem lembro'],
    dor: 'não tira folga',
  },
  {
    id: 'parado',
    tipo: 'opcoes',
    titulo: 'Há quanto tempo o seu negócio está do mesmo tamanho?',
    opcoes: ['Está crescendo', 'Cresceu pouco', 'Travado há muito tempo'],
    dor: 'negócio parado',
  },
  {
    id: 'doisAnos',
    tipo: 'opcoes',
    titulo: 'Se nada mudar nos próximos 2 anos, onde o seu negócio estará?',
    opcoes: ['Maior e melhor', 'No mesmo lugar', 'Menor, ou fechado'],
    dor: 'pode encolher se nada mudar',
  },
  {
    id: 'faturamento',
    tipo: 'opcoes',
    titulo: 'Qual o faturamento anual da sua empresa?',
    ajuda: 'Para indicar o caminho certo',
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
    titulo: 'Qual o seu WhatsApp?',
    ajuda: 'Com DDD, para enviar o seu resultado',
    placeholder: '(11) 99999-9999',
  },
];

/** Depois do nome, só esta pergunta chama a pessoa pelo primeiro nome, para não ficar repetitivo. */
export const titulosComNome: Partial<Record<CampoId, (nome: string) => string>> = {
  trava: (n) => `${n}, qual tem sido seu maior desafio hoje?`,
};

/** Perfis pelos pontos de dificuldade (0 a 24): quanto maior, mais a pessoa está sofrendo hoje. */
export const perfis = [
  { ate: 6, titulo: 'PRONTO PARA ESCALAR', texto: 'Você tem boas bases, vamos ver até onde dá para crescer?' },
  { ate: 15, titulo: 'DINHEIRO NA MESA', texto: '' },
  { ate: 24, titulo: 'PRECISA DE AÇÃO AGORA', texto: 'Cada mês assim é cliente indo para o concorrente' },
] as const;

export const textosAplicacao = {
  metaTitle: 'HAZE | Diagnóstico',
  metaDescription: 'Descubra o que está travando as suas vendas, perguntas rápidas e o resultado na hora',
  boasVindas: {
    antes: 'O QUE ESTÁ',
    destaque: 'TRAVANDO',
    depois: 'AS SUAS VENDAS?',
    paragrafos: ['Perguntas rápidas e o seu resultado na hora, leva menos de 3 minutos'],
    recebe: ['Sua nota de 1 a 10', 'O ponto que mais trava a sua marca', 'O primeiro passo para resolver'],
    fotoAlt:
      'Dona de uma marca olhando por cima do ombro, diante da loja com letreiro ciano e uma fila de clientes com sacolas pretas esperando para entrar',
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
    medidorTitulo: 'Como está o seu negócio',
    medidorExtremos: ['Tranquilo', 'Crítico'],
    whatsappBotao: 'Falar com a HAZE no WhatsApp',
    whatsappMensagem: (nome: string, empresa: string, nota: number, trava: string, faturamento: string) =>
      `Oi, sou ${nome}, da ${empresa}, fiz o diagnóstico da HAZE: dificuldade ${nota} de 10, o meu maior desafio hoje é ${trava.toLowerCase()}, faturamento ${faturamento}, quero conversar`,
    calculando: 'Calculando o seu resultado',
    pontoFraco: 'Ponto mais fraco',
    primeiroPasso: 'Primeiro passo',
    primeiroPassoTexto: 'o Raio-X, uma reunião que termina em um plano de ação claro',
    voltarSite: 'Voltar ao site',
  },
} as const;
