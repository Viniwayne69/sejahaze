/**
 * Textos e perguntas do formulário de aplicação (/aplicar).
 * Para mudar uma pergunta ou opção, edite aqui — o componente só lê deste arquivo.
 */

export type CampoId = 'nome' | 'email' | 'telefone' | 'empresa' | 'cargo' | 'faturamento' | 'setor' | 'horario';

export type Pergunta =
  | { id: 'nome' | 'empresa'; tipo: 'texto'; titulo: string; ajuda?: string; placeholder: string }
  | { id: 'email'; tipo: 'email'; titulo: string; ajuda?: string; placeholder: string }
  | { id: 'telefone'; tipo: 'tel'; titulo: string; ajuda?: string; placeholder: string }
  | { id: 'cargo' | 'faturamento' | 'setor'; tipo: 'opcoes'; titulo: string; ajuda?: string; opcoes: readonly string[] }
  | { id: 'horario'; tipo: 'horario'; titulo: string; ajuda?: string; opcional: true };

export const perguntas: readonly Pergunta[] = [
  { id: 'nome', tipo: 'texto', titulo: 'Qual o seu nome completo?', placeholder: 'Digite seu nome' },
  { id: 'email', tipo: 'email', titulo: 'Qual o seu melhor e-mail?', placeholder: 'nome@suaempresa.com.br' },
  {
    id: 'telefone',
    tipo: 'tel',
    titulo: 'Qual o seu WhatsApp?',
    ajuda: 'Com DDD, é por aqui que entraremos em contato',
    placeholder: '(11) 99999-9999',
  },
  { id: 'empresa', tipo: 'texto', titulo: 'Qual o nome da sua empresa?', placeholder: 'Ex: Almeida & Silva' },
  {
    id: 'cargo',
    tipo: 'opcoes',
    titulo: 'Qual o seu cargo?',
    opcoes: ['Sócio ou fundador', 'CEO ou C-Level', 'Diretor', 'Profissional Liberal', 'Autônomo', 'Outros'],
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
  { id: 'setor', tipo: 'opcoes', titulo: 'Qual o setor da sua empresa?', opcoes: ['Serviço', 'Comércio', 'Indústria'] },
  {
    id: 'horario',
    tipo: 'horario',
    titulo: 'Quando prefere conversar com a gente?',
    ajuda: 'Escolha um dia e horário para a reunião online, ou, se preferir, pule e entramos em contato',
    opcional: true,
  },
];

/**
 * Depois do nome, as perguntas passam a falar com a pessoa pelo primeiro nome.
 * Quem não tem versão aqui usa o título normal.
 */
export const titulosComNome: Partial<Record<CampoId, (nome: string) => string>> = {
  email: (n) => `Prazer, ${n}, qual o seu melhor e-mail?`,
  telefone: (n) => `${n}, qual o seu WhatsApp?`,
  empresa: (n) => `${n}, qual o nome da sua empresa?`,
  cargo: (n) => `E qual o seu cargo, ${n}?`,
  horario: (n) => `${n}, quando prefere conversar com a gente?`,
};

/** Dias (getDay: 1 = segunda) e horários oferecidos para a reunião. */
export const diasReuniao = [
  { dia: 1, nome: 'Segunda-feira' },
  { dia: 2, nome: 'Terça-feira' },
  { dia: 3, nome: 'Quarta-feira' },
  { dia: 4, nome: 'Quinta-feira' },
  { dia: 5, nome: 'Sexta-feira' },
] as const;

export const horariosReuniao = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] as const;

export const textosAplicacao = {
  metaTitle: 'HAZE | Aplicação',
  metaDescription: 'Responda às perguntas e nossa equipe indicará o caminho mais adequado para o seu negócio, leva menos de 2 minutos',
  boasVindas: {
    tituloAcessivel: 'Aplicação HAZE',
    paragrafos: [
      'Responda às perguntas a seguir e nossa equipe indicará o caminho mais adequado para o seu negócio, leva menos de 2 minutos',
    ],
    fotoAlt:
      'Dona de uma marca olhando por cima do ombro, diante da loja com letreiro ciano e uma fila de clientes com sacolas pretas esperando para entrar',
    botao: 'Iniciar aplicação',
  },
  ok: 'OK',
  dicaEnter: 'ou pressione Enter',
  voltar: 'Voltar',
  enviar: 'Enviar',
  enviando: 'Enviando',
  pular: 'Pular e enviar',
  de: 'de',
  /** Incentivos curtos no contador, perto do fim: Diversão e Preguiça (está acabando) */
  incentivos: { quaseLa: 'Quase lá', ultima: 'Última pergunta' },
  erros: {
    obrigatoria: 'Esta pergunta é obrigatória',
    nome: 'Informe nome e sobrenome',
    email: 'Informe um e-mail válido',
    telefone: 'Informe um WhatsApp válido com DDD',
    envio: 'Não foi possível enviar agora, tente novamente em instantes',
  },
  fim: {
    titulo: 'PRONTO,',
    recebido: 'Recebemos a sua aplicação e já vamos olhar a sua marca',
    semReuniao:
      'Recebemos a sua aplicação e já vamos olhar a sua marca, em breve nossa equipe entra em contato pelo WhatsApp',
    voltarSite: 'Voltar ao site',
    reuniaoRotulo: 'Reunião pré-agendada',
    proximos: 'O que acontece agora',
    resumoReuniao: 'Link de acesso por WhatsApp e e-mail',
  },
} as const;
