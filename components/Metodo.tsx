import { copy } from '@/content/copy';
import { Heading, Section } from './ui';

export default function Metodo() {
  const { before, accent, steps, result } = copy.metodo;
  const [resultLabel, ...resultText] = result.split(':');

  return (
    <Section id="metodo" tone="white" labelledBy="metodo-titulo">
      <div data-reveal>
        <Heading id="metodo-titulo" before={before} accent={accent} />
      </div>

      <ol className="mt-5 grid gap-2.5 md:mt-10 md:grid-cols-3 md:gap-5">
        {steps.map((step, i) => (
          <li
            key={step.title}
            data-reveal
            style={{ transitionDelay: `${i * 80}ms` }}
            className="flex items-center gap-3 rounded-[12px] bg-paper px-3 py-2.5 md:flex-col md:items-start md:gap-4 md:rounded-2xl md:p-7"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-[9px] bg-cyan font-display text-[15px] font-black text-black md:size-12 md:text-[18px]">
              {step.number}
            </span>
            <span className="leading-snug">
              <span className="block font-display text-[15px] font-extrabold uppercase tracking-[-0.01em] md:text-[22px]">{step.title}</span>
              <span className="mt-0.5 block text-[13.5px] text-black/75 md:mt-2 md:text-[15px]">{step.body}</span>
            </span>
          </li>
        ))}
      </ol>

      <p data-reveal className="mt-4 rounded-[12px] border border-black/15 px-4 py-3 text-center text-[14px] leading-snug md:mx-auto md:mt-8 md:max-w-[720px] md:rounded-full md:text-[16px]">
        <strong>{resultLabel}:</strong>
        {resultText.join(':')}
      </p>
    </Section>
  );
}
