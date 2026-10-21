import { cn } from './ui';

type IconProps = { className?: string };

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export function CompassIcon({ className }: IconProps) {
  return (
    <svg {...base} className={cn('size-6', className)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </svg>
  );
}

export function RouteIcon({ className }: IconProps) {
  return (
    <svg {...base} className={cn('size-6', className)}>
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M8 19h7.5a3.5 3.5 0 000-7h-7a3.5 3.5 0 010-7H16" />
    </svg>
  );
}

export function BridgeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={cn('size-6', className)}>
      <path d="M2 9h20M4 9v10M20 9v10M2 19h20" />
      <path d="M8 19v-3a4 4 0 018 0v3" />
    </svg>
  );
}

export function TrendDownIcon({ className }: IconProps) {
  return (
    <svg {...base} className={cn('size-5', className)}>
      <path d="M3 7l6 6 4-4 8 8" />
      <path d="M21 11v6h-6" />
    </svg>
  );
}

export function TagIcon({ className }: IconProps) {
  return (
    <svg {...base} className={cn('size-5', className)}>
      <path d="M20.6 13.4l-7.2 7.2a2 2 0 01-2.8 0L3 13V3h10l7.6 7.6a2 2 0 010 2.8z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </svg>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg {...base} className={cn('size-5', className)}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0113 0" />
      <path d="M16 4.6a3.5 3.5 0 010 6.8M18.5 20a6.5 6.5 0 00-3-5.5" />
    </svg>
  );
}

export function CheckCircle({ className }: IconProps) {
  return (
    <span aria-hidden="true" className={cn('grid size-[22px] shrink-0 place-items-center rounded-full bg-cyan text-black', className)}>
      <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 8.5l3 3 6-7" />
      </svg>
    </span>
  );
}

export function CrossCircle({ className }: IconProps) {
  return (
    <span aria-hidden="true" className={cn('grid size-[22px] shrink-0 place-items-center rounded-full border border-gray text-gray', className)}>
      <svg viewBox="0 0 16 16" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M4 4l8 8M12 4l-8 8" />
      </svg>
    </span>
  );
}

export function QuestionIcon({ className }: IconProps) {
  return (
    <svg {...base} className={cn('size-5', className)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 114 2c-.9.6-1.5 1.2-1.5 2.2" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <svg {...base} className={cn('size-5', className)}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function MegaphoneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={cn('size-8', className)}>
      <path d="M3 10v4a1 1 0 001 1h2l5 4V5L6 9H4a1 1 0 00-1 1z" />
      <path d="M15 8.5a5 5 0 010 7M18 6a8.5 8.5 0 010 12" />
    </svg>
  );
}

export function DoubleCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 18 12" aria-hidden="true" className={cn('h-2.5 w-3.5', className)} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 6.5l3 3 6-7.5M7.5 9.5l1 0.5 7-8" />
    </svg>
  );
}
