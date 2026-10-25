/**
 * Textos, perguntas e regras do mini diagnóstico (/aplicar).
 * Para mudar uma pergunta, opção, perfil ou rótulo, edite aqui: o componente só lê deste arquivo.
 */

/** As 7 perguntas de dor: cada uma vale pontos de dificuldade (0, 1 ou 2). */
export const camposDeDor = ['escolha', 'lembrado', 'procura', 'medo', 'sobra', 'doente', 'doisAnos'] as const;

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
 * Seis áreas: Desejo com duas perguntas e as outras cinco com uma. A área com mais dificuldade (em proporção) é a mais fraca.
 * `fraco` é a frase do resultado ("Ponto mais fraco: ...").
 */
export const areas = [
  { id: 'desejo', rotulo: 'Desejo', forte: 'os clientes já escolhem você e falam de você', meio: 'parte dos clientes já escolhe você, e há espaço para ser a escolha de todos', fraco: 'a sua marca pode se tornar a primeira escolha do cliente', campos: ['escolha', 'lembrado'] },
  { id: 'vendas', rotulo: 'Vendas', forte: 'quem se interessa por você costuma comprar', meio: 'quem se interessa por você já compra, e dá para converter muito mais', fraco: 'muita gente já se interessa por você, e cada uma pode virar cliente', campos: ['procura'] },
  { id: 'preco', rotulo: 'Preço', forte: 'você cobra com tranquilidade o que o seu trabalho vale', meio: 'o seu preço já tem espaço para subir com mais segurança', fraco: 'a sua marca pode sustentar um preço bem maior', campos: ['medo'] },
  { id: 'dinheiro', rotulo: 'Dinheiro', forte: 'o dinheiro acompanha o seu trabalho', meio: 'o dinheiro pode acompanhar melhor o seu trabalho', fraco: 'o seu trabalho pode render muito mais para você', campos: ['sobra'] },
  { id: 'liberdade', rotulo: 'Liberdade', forte: 'o negócio anda mesmo sem você', meio: 'o negócio pode andar com mais ritmo mesmo sem você', fraco: 'o negócio pode andar sem depender só de você', campos: ['doente'] },
  { id: 'futuro', rotulo: 'Futuro', forte: 'o seu negócio caminha para crescer', meio: 'o seu negócio pode crescer ainda mais', fraco: 'o seu negócio pode se tornar uma marca desejada nos próximos anos', campos: ['doisAnos'] },
] as const;

export type AreaId = (typeof areas)[number]['id'];

/** Em empate de áreas, vale esta ordem: da que mais liga à oferta da HAZE para a que menos liga. */
export const prioridadeAreas: readonly AreaId[] = ['desejo', 'preco', 'vendas', 'liberdade', 'dinheiro', 'futuro'];

/**
 * Doze perguntas no total: nome, empresa, maior desafio (sem pontos), 7 de dor, faturamento e WhatsApp.
 * Nas perguntas de dor, cada opção tem os seus pontos de dificuldade (0, 1 ou 2) em `pontos`,
 * então sete perguntas somam de 0 a 14 pontos. "Não sei ao certo" vale 1.
 */
export const perguntas: readonly Pergunta[] = [
  { id: 'nome', tipo: 'texto', titulo: 'Qual o seu primeiro nome?', placeholder: 'Digite seu nome' },
  { id: 'empresa', tipo: 'texto', titulo: 'Qual o nome do seu negócio?', ajuda: 'Para personalizar o seu resultado', placeholder: 'Ex: Almeida & Silva' },
  {
    id: 'trava',
    tipo: 'opcoes',
    titulo: 'Qual tem sido seu maior desafio hoje?',
    opcoes: ['Conseguir clientes novos', 'Fechar as vendas', 'Vender sem baixar o preço', 'O caixa não fecha', 'A equipe', 'Não sei ao certo', 'Outro'],
  },
  {
    id: 'escolha',
    tipo: 'opcoes',
    titulo: 'Com que frequência um cliente diz que o seu preço está caro ou pede desconto?',
    opcoes: ['Quase nunca', 'Algumas vezes por mês', 'Toda semana', 'Quase todo cliente', 'Não sei ao certo'],
    pontos: [0, 1, 2, 2, 1],
    dor: 'cliente diz que está caro',
  },
  {
    id: 'lembrado',
    tipo: 'opcoes',
    titulo: 'Nos últimos 3 meses, quantos clientes novos vieram por indicação de outro cliente?',
    opcoes: ['Vários, é o que mais traz cliente', 'Alguns', 'Um ou dois', 'Nenhum', 'Não sei ao certo'],
    pontos: [0, 1, 2, 2, 1],
    dor: 'poucas indicações',
  },
  {
    id: 'procura',
    tipo: 'opcoes',
    titulo: 'Das pessoas que se interessam (perguntam o preço, pedem orçamento, mandam mensagem), quantas acabam comprando?',
    opcoes: ['Quase todas', 'Mais da metade', 'Menos da metade', 'Pouquíssimas', 'Nunca contei'],
    pontos: [0, 0, 1, 2, 1],
    dor: 'poucos interessados compram',
  },
  {
    id: 'medo',
    tipo: 'opcoes',
    titulo: 'Quando você pensa em aumentar o seu preço, o que sente?',
    opcoes: ['Tranquilidade, o meu preço vale isso', 'Um pouco de receio', 'Medo de perder clientes', 'Já deixei de aumentar por medo', 'Nunca pensei nisso'],
    pontos: [0, 1, 2, 2, 1],
    dor: 'medo de aumentar o preço',
  },
  {
    id: 'sobra',
    tipo: 'opcoes',
    titulo: 'No último mês, depois de pagar tudo, quanto sobrou para você?',
    opcoes: ['Sobrou um valor bom', 'Sobrou pouco', 'Não sobrou nada', 'Faltou, e usei dinheiro de casa ou peguei emprestado', 'Não sei ao certo'],
    pontos: [0, 1, 2, 2, 1],
    dor: 'não sobra dinheiro',
  },
  {
    id: 'doente',
    tipo: 'opcoes',
    titulo: 'Se você ficasse 30 dias sem poder trabalhar, o que aconteceria com o seu negócio?',
    opcoes: ['Continuaria funcionando normal', 'Funcionaria com dificuldade', 'Cairia muito', 'Pararia, tudo depende de mim', 'Nunca pensei nisso'],
    pontos: [0, 1, 2, 2, 1],
    dor: 'o negócio para sem ele',
  },
  {
    id: 'doisAnos',
    tipo: 'opcoes',
    titulo: 'O que acontece com a sua empresa se nada mudar daqui a 2 anos?',
    opcoes: ['Ela cresce', 'Fica do mesmo tamanho', 'Perco clientes', 'Preciso baixar o preço', 'Pode fechar', 'Não sei ao certo'],
    pontos: [0, 1, 2, 2, 2, 1],
    dor: 'teme que o negócio encolha',
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

/** Perfis pelos pontos de dificuldade (0 a 14): quanto maior, mais espaço a marca tem para crescer em desejo. */
export const perfis = [
  { ate: 3, titulo: 'MARCA JÁ DESEJADA', texto: 'A sua marca já atrai, vamos ver até onde ela pode chegar' },
  { ate: 8, titulo: 'DESEJO EM CRESCIMENTO', texto: 'A sua marca já tem base, falta fazer muito mais gente desejá-la' },
  { ate: 14, titulo: 'PRONTA PARA SER DESEJADA', texto: 'A sua marca pode ser a escolha do seu mercado, e o caminho começa agora' },
] as const;

export const textosAplicacao = {
  metaTitle: 'HAZE | Diagnóstico',
  metaDescription: 'Descubra o quanto a sua marca é desejada, perguntas rápidas e o resultado na hora',
  boasVindas: {
    antes: 'O QUANTO A SUA MARCA É',
    destaque: 'DESEJADA',
    depois: 'HOJE?',
    paragrafos: ['Perguntas rápidas e o seu resultado na hora, leva menos de 2 minutos'],
    recebe: ['Sua nota de desejo de 1 a 10', 'Onde a sua marca mais pode crescer', 'O primeiro passo para chegar lá'],
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
    medidorTitulo: 'O quanto a sua marca é desejada',
    medidorExtremos: ['Pouco', 'Muito'],
    whatsappBotao: 'Falar com a HAZE no WhatsApp',
    whatsappMensagem: (nome: string, empresa: string) => `Oi, sou ${nome}, da ${empresa}, quero conversar`,
    calculando: 'Calculando o seu resultado',
    pontoFraco: 'Onde a sua marca mais pode crescer',
    radarTitulo: 'A sua marca por área',
    toque: 'Toque em uma área para ver o que ela diz',
    forte: 'Já é forte',
    atencao: 'Em crescimento',
    fragil: 'A construir',
    primeiroPasso: 'Primeiro passo',
    primeiroPassoTexto: 'o Raio-X, uma reunião que termina em um plano de ação claro',
    voltarSite: 'Voltar ao site',
  },
} as const;
