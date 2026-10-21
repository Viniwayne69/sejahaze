import type { Metadata } from 'next';
import FormularioAplicacao from '@/components/FormularioAplicacao';
import { textosAplicacao } from '@/content/aplicacao';

export const metadata: Metadata = {
  title: textosAplicacao.metaTitle,
  description: textosAplicacao.metaDescription,
  alternates: { canonical: '/aplicar' },
};

export default function AplicarPage() {
  return <FormularioAplicacao />;
}
