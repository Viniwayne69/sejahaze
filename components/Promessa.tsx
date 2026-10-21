import { copy } from '@/content/copy';
import { Heading, Section } from './ui';

export default function Promessa() {
  const { before, accent, body } = copy.promessa;

  return (
    <Section texture="papel-azul" labelledBy="promessa-titulo">
      <div data-reveal className="md:mx-auto md:max-w-[820px] md:text-center">
        <Heading id="promessa-titulo" before={before} accent={accent} size="lg" />
        <p className="mt-4 text-[15.5px] leading-[1.45] md:mt-6 md:text-[18px]">{body}</p>
      </div>
    </Section>
  );
}
