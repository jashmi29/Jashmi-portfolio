'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Building2, Calendar } from 'lucide-react';
import { SectionWrapper, SectionHeading } from '@/components/section-heading';
import { Reveal, Stagger, StaggerItem } from '@/components/interactive/reveal';
import { leadership, type LeadershipRole } from '@/lib/data/leadership';
import { cn } from '@/lib/utils';

function LeadershipChapter({
  role,
  index,
}: {
  role: LeadershipRole;
  index: number;
}) {
  const reversed = index % 2 === 1;
  return (
    <Reveal>
      <div
        className={cn(
          'grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12',
          reversed && 'lg:[direction:rtl]'
        )}
      >
        {/* Image */}
        <div className="[direction:ltr]">
          <div className="group relative overflow-hidden rounded-3xl gradient-border glass p-2 shadow-lift transition-transform duration-300 hover:-translate-y-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={role.image}
                alt={role.organization}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${role.accent}55, transparent 60%), linear-gradient(to top, rgba(0,0,0,0.5), transparent 50%)`,
                }}
              />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs uppercase tracking-[0.15em] text-white/70">
                  {role.duration}
                </p>
                <p className="mt-1 font-display text-xl font-bold leading-snug">{role.organization}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="[direction:ltr] space-y-6">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${role.accent}22` }}
            >
              <Building2 className="h-5 w-5" style={{ color: role.accent }} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {role.organization}
              </p>
              <h3 className="mt-0.5 font-display text-2xl font-bold leading-snug">{role.role}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm leading-relaxed text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            {role.duration}
          </div>

          {/* Responsibilities */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Responsibilities
            </p>
            <ul className="space-y-2.5">
              {role.responsibilities.map((r, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-2.5 text-sm leading-[1.7] text-muted-foreground"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: role.accent }}
                  />
                  {r}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Impact */}
          <div className="rounded-2xl glass p-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Impact
            </p>
            <ul className="space-y-2.5">
              {role.impact.map((imp, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-[1.7] text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {imp}
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          <div className="flex flex-wrap gap-2">
            {role.achievements.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium leading-none"
                style={{ backgroundColor: `${role.accent}18`, color: role.accent }}
              >
                <Award className="h-3 w-3" />
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Leadership() {
  return (
    <SectionWrapper id="leadership" className="relative overflow-hidden">
      <SectionHeading
        eyebrow="Leadership & NCC"
        title="Chapters of service and leadership"
        description="Leadership as meaningful stories — not bullet points on a card."
      />

      <div className="mt-16 space-y-20">
        {leadership.map((role, i) => (
          <LeadershipChapter key={role.id} role={role} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
