/** Destino de todos os botões "Iniciar aplicação" e CTAs das seções (a página do formulário). */
export const APPLY_URL = process.env.NEXT_PUBLIC_APPLY_URL || '/aplicar';

/** URL pública do site, usada nos metadados (Open Graph). */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sejahaze.vercel.app';

/**
 * Banco do CRM (Supabase) onde o formulário /aplicar grava os leads.
 * A URL e a chave "publishable" são públicas por natureza (vão no navegador), a proteção
 * dos dados é feita pelas políticas do banco. NUNCA coloque aqui a chave secreta
 * (sb_secret_...) nem a service_role. As variáveis de ambiente têm prioridade.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mzyortoigexatzbmbqci.supabase.co';
export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_-4w_VFF_Gl1YlHdj8hVoFQ_G2mVxRwa';
