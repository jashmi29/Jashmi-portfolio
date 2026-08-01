'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Code,
  Palette,
  Rocket,
  BookOpen,
  Shield,
  Medal,
  Github,
  Sparkles,
  Leaf,
  Flag,
  Trophy,
  Award,
  ShieldCheck,
} from 'lucide-react';
import { SectionWrapper, SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/interactive/reveal';
import { GradientOrb } from '@/components/interactive/ambient';
import { journey, type JourneyMilestone } from '@/lib/data/journey';
import { cn } from '@/lib/utils';

const ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Code,
  Palette,
  Rocket,
  BookOpen,
  Shield,
  Medal,
  Github,
  Sparkles,
  Leaf,
  Flag,
  Trophy,
  Award,
  ShieldCheck,
};

const MARKER_COLORS: Record<JourneyMilestone['marker'], string> = {
  start: 'hsl(var(--chart-2))',
  milestone: 'hsl(var(--chart-1))',
  achievement: 'hsl(var(--chart-3))',
  turning: 'hsl(var(--chart-4))',
  current: 'hsl(var(--chart-5))',
};

function JourneyNode({
  milestone,
  index,
}: {
  milestone: JourneyMilestone;
  index: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.4'],
  });
  const yearY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const yearOpacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);

  const reversed = index % 2 === 1;
  const Icon = ICONS[milestone.icon] ?? Sparkles;
  const color = MARKER_COLORS[milestone.marker];

  return (
    <div ref={ref} className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-2">
      {/* Year — large typography on one side */}
      <motion.div
        style={{ y: yearY, opacity: yearOpacity }}
        className={reversed ? 'md:order-2' : ''}
      >
        <span className="font-display text-[5rem] font-bold leading-none tracking-tighter text-foreground/[0.07] sm:text-[7rem] md:text-[9rem]">
          {milestone.year}
        </span>
      </motion.div>

      {/* Content card */}
      <Reveal delay={0.1} className={reversed ? 'md:order-1 md:text-right' : ''}>
        <div className="group relative rounded-3xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
          {/* Marker line connector */}
          <div
            className={cn(
              'absolute top-1/2 hidden h-px w-8 -translate-y-1/2 md:block',
              reversed ? 'right-full bg-gradient-to-l' : 'left-full bg-gradient-to-r'
            )}
            style={{ background: `linear-gradient(${reversed ? 'to left' : 'to right'}, ${color}, transparent)` }}
          />

          <div className={cn('flex items-center gap-3', reversed && 'md:flex-row-reverse')}>
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${color}22` }}
            >
              <Icon className="h-5 w-5" style={{ color }} />
            </div>
            <div className={cn(reversed && 'md:text-right')}>
              <p className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color }}>
                {milestone.chapter}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold leading-[1.25]">{milestone.title}</h3>
            </div>
          </div>
          <p className={cn('mt-4 text-sm leading-[1.8] text-muted-foreground', reversed && 'md:text-right')}>
            {milestone.description}
          </p>
        </div>
      </Reveal>
    </div>
  );
}

export function Journey() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.6', 'end 0.6'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <SectionWrapper id="journey" className="relative overflow-hidden">
      <GradientOrb className="left-1/4 top-0 h-72 w-72" color="hsl(var(--mesh-5) / 0.1)" />
      <GradientOrb className="right-1/4 bottom-0 h-72 w-72" color="hsl(var(--mesh-1) / 0.1)" />

      <SectionHeading
        eyebrow="Journey"
        title="The story so far"
        description="Not a timeline — a sequence of chapters. Scroll through the years."
      />

      {/* Flowing path container */}
      <div ref={containerRef} className="relative mt-16 space-y-16 md:space-y-24">
        {/* Central flowing path */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block">
          <div className="absolute inset-0 bg-border" />
          <motion.div
            className="absolute inset-x-0 top-0 bg-gradient-to-b from-primary via-chart-2 to-chart-5"
            style={{ height: lineHeight }}
          />
        </div>

        {journey.map((milestone, i) => (
          <JourneyNode key={milestone.year} milestone={milestone} index={i} />
        ))}
      </div>

      {/* Closing marker */}
      <Reveal delay={0.2}>
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full glass-strong">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <p className="font-display text-lg font-semibold leading-snug">The story continues</p>
          <p className="max-w-md text-sm leading-[1.8] text-muted-foreground">
            Every chapter so far was preparation. The next one is being written right now.
          </p>
        </div>
      </Reveal>
    </SectionWrapper>
  );
}

