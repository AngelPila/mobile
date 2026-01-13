import React from 'react';

export type ProfileHeroProps = {
  gradientClassName: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  titleClassName?: string;
  subtitleClassName?: string;
  className?: string;
  children?: React.ReactNode;
};

export function ProfileHero({
  gradientClassName,
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
  className,
  children,
}: ProfileHeroProps) {
  const rootClassName = [
    gradientClassName,
    'app-bleed-x',
    'app-bleed-top',
    'text-white',
    'pb-0',
    'rounded-b-3xl',
    'shadow-lg',
    'animate-slide-in-down',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const computedTitleClassName = [
    'text-4xl',
    'font-bold',
    titleClassName ?? 'mb-2',
  ]
    .filter(Boolean)
    .join(' ');

  const computedSubtitleClassName = [
    subtitleClassName ?? 'text-white/80',
    'text-base',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassName}>
      <div
        style={{
          paddingTop: 'calc(var(--app-safe-area-top) + 0.25rem)',
          paddingLeft: 'calc(var(--app-content-padding-x) + var(--app-safe-area-left))',
          paddingRight: 'calc(var(--app-content-padding-x) + var(--app-safe-area-right))',
          paddingBottom: '2rem',
        }}
      >
        <h2 className={computedTitleClassName}>{title}</h2>
        {subtitle ? <p className={computedSubtitleClassName}>{subtitle}</p> : null}
        {children}
      </div>
    </div>
  );
}
