/**
 * Textos, perguntas e regras do mini diagnóstico (/aplicar).
 * Para mudar uma pergunta, opção, perfil ou rótulo, edite aqui: o componente só lê deste arquivo.
 */

export type CampoId = 'nome' | 'empresa' | 'processo' | 'desconto' | 'somem' | 'concorrente' | 'dependencia' | 'trava' | 'futuro' | 'faturamento' | 'telefone';

/** Campos de dor: cada um vale pontos de dificuldade. */
export const camposDeDor = ['processo', 'desconto', 'somem', 'concorrente', 'dependencia'] as const;

export type Pergunta =
  | { id: 'nome' | 'empresa'; tipo: 'texto'; titulo: string; ajuda?: string; placeholder: string }
  | { id: 'telefone'; tipo: 'tel'; titulo: string; ajuda?: string; placeholder: string }
  | { id: (typeof camposDeDor)[number] | 'trava' | 'futuro' | 'faturamento'; tipo: 'opcoes'; titulo: string; ajuda?: string; opcoes: readonly string[] };

/**
 * Depois do nome e da empresa, as perguntas são sobre as dores do dono.
 * Nas perguntas de dor, as opções vão sempre da menor para a maior dificuldade:
 * a primeira vale 0 ponto, a segunda 1 e a terceira 2. Cinco perguntas somam de 0 a 10 pontos.
 * As perguntas "trava" e "futuro" não valem pontos: dizem à equipe a maior dor dele e o que ele teme se nada mudar.
 */
export const perguntas: readonly Pergunta[] = [
  { id: 'nome', tipo: 'texto', titulo: 'Qual o seu primeiro nome?', placeholder: 'Digite seu nome' },
  { id: 'empresa', tipo: 'texto', titulo: 'Qual o nome do seu negócio?', placeholder: 'Ex: Almeida & Silva' },
  {
    id: 'processo',
    tipo: 'opcoes',
    titulo: 'Você já tem um processo comercial definido?',
    opcoes: ['Sim, bem definido', 'Mais ou menos, cada um faz de um jeito', 'Não tenho'],
  },
  {
    id: 'desconto',
    tipo: 'opcoes',
    titulo: 'Com que frequência você precisa dar desconto para fechar uma venda?',
    opcoes: ['Quase nunca', 'Às vezes', 'Quase sempre'],
  },
  {
    id: 'somem',
    tipo: 'opcoes',
    titulo: 'Quantos clientes só perguntam o preço e somem?',
    opcoes: ['Poucos', 'Alguns', 'A maioria'],
  },
  {
    id: 'concorrente',
    tipo: 'opcoes',
    titulo: 'O concorrente leva clientes que deveriam ser seus?',
    opcoes: ['Raramente', 'Às vezes', 'O tempo todo'],
  },
  {
    id: 'dependencia',
    tipo: 'opcoes',
    titulo: 'Se você parar de vender, as vendas continuam?',
    opcoes: ['Sim, continuam', 'Em parte', 'Não, tudo para'],
  },
  {
    id: 'trava',
    tipo: 'opcoes',
    titulo: 'O que mais trava o seu crescimento hoje?',
    opcoes: ['Atrair os clientes certos', 'Fechar as vendas', 'Vender barato', 'A equipe', 'Não sei'],
  },
  {
    id: 'futuro',
    tipo: 'opcoes',
    titulo: 'O que você acha que vai acontecer com a sua empresa se continuar do jeito que está hoje?',
    opcoes: ['Vai continuar igual, sem crescer', 'Vou perder cada vez mais clientes', 'Vou ter que baixar ainda mais o preço', 'Pode não se sustentar', 'Não sei'],
  },
  {
    id: 'faturamento',
    tipo: 'opcoes',
    titulo: 'Qual o faturamento anual da sua empresa?',
    ajuda: 'Escolha a faixa que mais se aproxima da sua realidade',
    opcoes: [
      'Ainda não faturamos',
      'Até R$ 500 mil/ano',
      'R$ 500 mil – 1 mi/ano',
      'R$ 1 – 5 mi/ano',
      'R$ 5 – 10 mi/ano',
      'R$ 10 – 50 mi/ano',
      'R$ 50 – 200 mi/ano',
      'R$ 200 mi+/ano',
    ],
  },
  {
    id: 'telefone',
    tipo: 'tel',
    titulo: 'Qual o seu WhatsApp?',
    ajuda: 'Com DDD, o seu resultado aparece na próxima tela e a equipe continua a conversa por aqui',
    placeholder: '(11) 99999-9999',
  },
];

/** Depois do nome, só esta pergunta chama a pessoa pelo primeiro nome, para não ficar repetitivo. */
export const titulosComNome: Partial<Record<CampoId, (nome: string) => string>> = {
  processo: (n) => `${n}, você já tem um processo comercial definido?`,
};

/** Perfis pelos pontos de dificuldade (0 a 10): quanto maior, mais a pessoa está sofrendo hoje. */
export const perfis = [
  { ate: 3, titulo: 'DIFICULDADE LEVE' },
  { ate: 6, titulo: 'DIFICULDADE MODERADA' },
  { ate: 10, titulo: 'DIFICULDADE ALTA' },
] as const;

export const textosAplicacao = {
  metaTitle: 'HAZE | Diagnóstico',
  metaDescription: 'Perguntas rápidas, 2 minutos e uma leitura direta do que está travando as suas vendas',
  boasVindas: {
    antes: 'QUANTO A SUA MARCA ESTÁ TE FAZENDO',
    destaque: 'PERDER?',
    paragrafos: ['Perguntas rápidas, 2 minutos e uma leitura direta do que está travando as suas vendas'],
    fotoAlt:
      'Dona de uma marca olhando por cima do ombro, diante da loja com letreiro ciano e uma fila de clientes com sacolas pretas esperando para entrar',
    botao: 'Iniciar diagnóstico',
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
    medidorTitulo: 'Dificuldade hoje',
    medidorExtremos: ['Tranquilo', 'Crítico'],
    whatsappBotao: 'Falar com a HAZE no WhatsApp',
    whatsappMensagem: (nome: string, empresa: string, nota: number, trava: string, faturamento: string) =>
      `Oi, sou ${nome}, da ${empresa}. Fiz o diagnóstico da HAZE: dificuldade ${nota} de 10, o que mais trava hoje é ${trava.toLowerCase()}. Faturamento: ${faturamento}. Quero conversar`,
    semWhatsapp: 'Em breve nossa equipe chama você no WhatsApp',
    voltarSite: 'Voltar ao site',
  },
} as const;
