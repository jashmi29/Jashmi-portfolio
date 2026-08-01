'use client';

import * as React from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { SectionWrapper, SectionHeading } from '@/components/section-heading';
import { Reveal, Stagger, StaggerItem } from '@/components/interactive/reveal';
import { GradientOrb } from '@/components/interactive/ambient';
import { aboutContent, aboutStats, aboutKeywords, experiences } from '@/lib/data/about';

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const count = useMotionValue(0);
  const [display, setDisplay] = React.useState('0');

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, value, count]);

  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-display text-4xl font-bold leading-none tracking-tight sm:text-5xl">
        {display}
        <span className="text-gradient-primary">{suffix}</span>
      </span>
      <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{label}</span>
    </div>
  );
}

function HighlightedParagraph({
  text,
  highlights,
}: {
  text: string;
  highlights: string[];
}) {
  let parts: (string | { match: string })[] = [text];
  highlights.forEach((hl) => {
    parts = parts.flatMap((p) =>
      typeof p === 'string' && p.includes(hl)
        ? p
            .split(hl)
            .flatMap((seg, i, arr) =>
              i < arr.length - 1 ? [seg, { match: hl }] : [seg]
            )
        : [p]
    );
  });
  return (
    <>
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          <React.Fragment key={i}>{part}</React.Fragment>
        ) : (
          <span key={i} className="font-semibold text-foreground">
            {part.match}
          </span>
        )
      )}
    </>
  );
}

export function About() {
  return (
    <SectionWrapper id="about" className="relative overflow-hidden">
      <GradientOrb className="right-0 top-1/4 h-72 w-72" color="hsl(var(--mesh-2) / 0.15)" />

      <SectionHeading
        eyebrow="About"
        title="The person behind the pixels"
        description="A story told in three disciplines — engineering, design, and sport."
      />

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        {/* Editorial text column */}
        <div className="space-y-10">
          <Reveal>
            <p className="max-w-3xl font-display text-2xl font-medium leading-[1.3] tracking-tight sm:text-3xl">
              {aboutContent.lead}
            </p>
          </Reveal>

          <div className="space-y-8">
            {aboutContent.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="max-w-prose text-base leading-[1.8] text-muted-foreground sm:text-lg">
                  <HighlightedParagraph text={p.text} highlights={p.highlight} />
                </p>
              </Reveal>
            ))}
          </div>

          {/* Experience list */}
          <Reveal delay={0.2}>
            <div className="mt-10 space-y-6 border-l border-border pl-6">
              {experiences.map((exp, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[27px] top-1.5 h-2 w-2 rounded-full bg-primary ring-4 ring-primary/10" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="font-display text-base font-semibold leading-snug">{exp.role}</span>
                    <span className="text-xs leading-relaxed text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="mt-1 text-sm leading-[1.7] text-muted-foreground">
                    {exp.org} — {exp.summary}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right column: stats + keywords */}
        <div className="space-y-10">
          {/* Floating identity keywords */}
          <div className="relative flex h-48 flex-wrap items-center justify-center gap-3 rounded-3xl glass p-6">
            <span className="absolute left-5 top-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              What drives me
            </span>
            {aboutKeywords.map((kw, i) => (
              <motion.span
                key={kw.text}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.15, rotate: 0 }}
                style={{ rotate: kw.angle }}
                className="cursor-default rounded-full bg-foreground/[0.04] px-4 py-2 font-display text-sm font-semibold leading-snug text-foreground ring-1 ring-border backdrop-blur"
              >
                {kw.text}
              </motion.span>
            ))}
          </div>

          {/* Animated statistics */}
          <Stagger className="grid grid-cols-2 gap-6 rounded-3xl glass p-6" stagger={0.12}>
            {aboutStats.map((stat) => (
              <StaggerItem key={stat.label}>
                <Counter value={stat.value} suffix={stat.suffix} label={stat.label} />
              </StaggerItem>
            ))}
          </Stagger>

          {/* Visual storytelling block */}
          <Reveal delay={0.2}>
            <div className="relative overflow-hidden rounded-3xl gradient-border glass p-6">
              <div className="noise-overlay absolute inset-0" />
              <p className="relative font-display text-lg font-medium leading-[1.4]">
                “Software is a craft. Like sport, it rewards the people who show up
                early, repeat the fundamentals, and sweat the details nobody watches.”
              </p>
              <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                — my working philosophy
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
