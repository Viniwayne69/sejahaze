/**
 * Textos, perguntas e regras do mini diagnóstico (/aplicar).
 * Para mudar uma pergunta, opção, perfil ou rótulo, edite aqui: o componente só lê deste arquivo.
 */

export type CampoId = 'nome' | 'empresa' | 'sobra' | 'parado' | 'folga' | 'equipe' | 'diferenca' | 'trava' | 'futuro' | 'faturamento' | 'telefone';

/** Campos de dor: cada um vale pontos de dificuldade. */
export const camposDeDor = ['sobra', 'parado', 'folga', 'equipe', 'diferenca'] as const;

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
    id: 'trava',
    tipo: 'opcoes',
    titulo: 'Qual tem sido seu maior desafio hoje?',
    opcoes: ['Atrair os clientes certos', 'Fechar as vendas', 'Vender barato', 'A equipe', 'Não sei'],
  },
  {
    id: 'sobra',
    tipo: 'opcoes',
    titulo: 'Você trabalha muito e no fim do mês não sobra dinheiro?',
    opcoes: ['Sobra bastante', 'Sobra pouco', 'Não sobra nada'],
  },
  {
    id: 'parado',
    tipo: 'opcoes',
    titulo: 'Sua empresa está do mesmo tamanho há muito tempo?',
    opcoes: ['Não, está crescendo', 'Cresceu pouco', 'Sim, não sai do lugar'],
  },
  {
    id: 'folga',
    tipo: 'opcoes',
    titulo: 'Se você tirar uma semana de folga, as vendas caem?',
    opcoes: ['Não caem', 'Caem um pouco', 'Caem muito'],
  },
  {
    id: 'equipe',
    tipo: 'opcoes',
    titulo: 'Seus funcionários vendem ou só dão trabalho?',
    opcoes: ['Vendem bem', 'Alguns vendem', 'Só dão trabalho'],
  },
  {
    id: 'diferenca',
    tipo: 'opcoes',
    titulo: 'Seu cliente sabe por que comprar de você e não do outro?',
    opcoes: ['Sabe bem', 'Mais ou menos', 'Não, para ele é tudo igual'],
  },
  {
    id: 'futuro',
    tipo: 'opcoes',
    titulo: 'O que acontece com a sua empresa se nada mudar daqui a 2 anos?',
    opcoes: ['Vai crescer', 'Fica igual', 'Perco clientes', 'Tenho que baixar o preço', 'Pode fechar', 'Não sei'],
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
  trava: (n) => `${n}, qual tem sido seu maior desafio hoje?`,
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
      `Oi, sou ${nome}, da ${empresa}. Fiz o diagnóstico da HAZE: dificuldade ${nota} de 10, o meu maior desafio hoje é ${trava.toLowerCase()}. Faturamento: ${faturamento}. Quero conversar`,
    semWhatsapp: 'Em breve nossa equipe chama você no WhatsApp',
    voltarSite: 'Voltar ao site',
  },
} as const;
