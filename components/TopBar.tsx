import { copy } from '@/content/copy';
import Logo from './Logo';
import { Bar, Container } from './ui';

export default function TopBar() {
  return (
    <div className="border-b border-line bg-graphite text-paper">
      <Container className="flex h-[53px] items-center justify-between">
        <Logo tone="light" size="sm" />
        <p className="flex items-center gap-2.5 text-[13px] font-semibold">
          <Bar className="ao-vivo h-[3px] w-3.5" />
          {copy.topBar.status}
        </p>
      </Container>
    </div>
  );
}
