/**
 * Textos, perguntas e regras do mini diagnóstico (/aplicar).
 * Para mudar uma pergunta, opção, perfil ou rótulo, edite aqui: o componente só lê deste arquivo.
 */

export type CampoId = 'nome' | 'empresa' | 'folga' | 'preco' | 'diferenca' | 'procura' | 'trava' | 'faturamento' | 'telefone';

/** Campos de dor: cada um vale pontos de dificuldade. */
export const camposDeDor = ['folga', 'preco', 'diferenca', 'procura'] as const;

export type Pergunta =
  | { id: 'nome' | 'empresa'; tipo: 'texto'; titulo: string; ajuda?: string; placeholder: string }
  | { id: 'telefone'; tipo: 'tel'; titulo: string; ajuda?: string; placeholder: string }
  | { id: (typeof camposDeDor)[number] | 'trava' | 'faturamento'; tipo: 'opcoes'; titulo: string; ajuda?: string; opcoes: readonly string[] };

/**
 * Depois do nome e da empresa, as perguntas são sobre as dores do dono.
 * Nas perguntas de dor, as opções vão sempre da menor para a maior dificuldade:
 * a primeira vale 0 ponto, a segunda 1 e a terceira 2. Quatro perguntas somam de 0 a 8 pontos.
 * A pergunta "trava" não vale pontos: diz à equipe a maior dor dele.
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
    id: 'folga',
    tipo: 'opcoes',
    titulo: 'Se você tirar uma semana de folga, as vendas caem?',
    opcoes: ['Não caem', 'Caem um pouco', 'Caem muito'],
  },
  {
    id: 'preco',
    tipo: 'opcoes',
    titulo: 'Se você aumentar o seu preço, o cliente continua comprando?',
    ajuda: 'Mostra o quanto a sua marca vale',
    opcoes: ['Sim, continua', 'Alguns vão embora', 'Quase todos somem'],
  },
  {
    id: 'diferenca',
    tipo: 'opcoes',
    titulo: 'Seu cliente sabe por que comprar de você e não do outro?',
    opcoes: ['Sabe bem', 'Mais ou menos', 'Não, para ele é tudo igual'],
  },
  {
    id: 'procura',
    tipo: 'opcoes',
    titulo: 'Seus clientes procuram você ou você corre atrás deles?',
    opcoes: ['Eles me procuram', 'Metade a metade', 'Eu corro atrás de todos'],
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

/** Perfis pelos pontos de dificuldade (0 a 8): quanto maior, mais a pessoa está sofrendo hoje. */
export const perfis = [
  { ate: 2, titulo: 'PRONTO PARA ESCALAR', texto: 'Você tem boas bases, vamos ver até onde dá para crescer?' },
  { ate: 5, titulo: 'DINHEIRO NA MESA', texto: '' },
  { ate: 8, titulo: 'PRECISA DE AÇÃO AGORA', texto: 'Cada mês assim é cliente indo para o concorrente' },
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
    primeiraLeitura: 'Primeira leitura, o diagnóstico profundo é o Raio-X',
    voltarSite: 'Voltar ao site',
  },
} as const;
