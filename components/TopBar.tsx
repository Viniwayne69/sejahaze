import { copy } from '@/content/copy';
import Logo from './Logo';
import { Container } from './ui';

export default function TopBar() {
  return (
    <div className="border-b border-line bg-graphite text-paper">
      <Container className="flex h-[53px] items-center justify-between">
        <Logo tone="light" size="sm" />
        <p className="flex items-center gap-2 text-[13px] font-semibold">
          <span aria-hidden="true" className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2.5 rounded-full bg-cyan" />
          </span>
          {copy.topBar.status}
        </p>
      </Container>
    </div>
  );
}
