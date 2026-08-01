'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Reveal, TextReveal } from '@/components/interactive/reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      <Reveal>
        <span className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </span>
      </Reveal>
      <h2 className="max-w-4xl font-display text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl">
        <TextReveal text={title} />
      </h2>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'max-w-3xl text-base leading-[1.8] text-muted-foreground sm:text-lg',
              align === 'center' && 'mx-auto'
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function SectionWrapper({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn('relative scroll-mt-24 px-6 py-24 sm:px-8 md:py-32', className)}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
