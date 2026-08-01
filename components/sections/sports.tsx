'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  X,
  Calendar,
  MapPin,
} from 'lucide-react';
import { SectionWrapper, SectionHeading } from '@/components/section-heading';
import { Reveal, Stagger, StaggerItem } from '@/components/interactive/reveal';
import { SportCertificatesEditorial } from './sport-certificates-editorial';
import { sports, type Sport } from '@/lib/data/sports';
import { cn } from '@/lib/utils';

function SportDetail({ sport, onBack }: { sport: Sport; onBack: () => void }) {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[85] overflow-y-auto bg-background no-scrollbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Cinematic hero banner */}
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src={sport.heroImage}
          alt={sport.name}
          className="h-full w-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, hsl(var(--background)), transparent 50%), linear-gradient(135deg, ${sport.accent}55, transparent 60%)`,
          }}
        />
        <div className="noise-overlay absolute inset-0" />

        {/* Breadcrumb */}
        <div className="absolute left-6 top-6 flex items-center gap-2 text-sm text-white/80 sm:left-8">
          <button onClick={onBack} className="flex items-center gap-1 hover:text-white">
            <ChevronLeft className="h-4 w-4" /> Sports
          </button>
          <span>/</span>
          <span className="font-semibold text-white">{sport.name}</span>
        </div>

        <button
          onClick={onBack}
          className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full glass-strong text-white sm:right-8"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Title */}
        <div className="absolute bottom-8 left-6 right-6 sm:left-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white"
              style={{ backgroundColor: `${sport.accent}99` }}
            >
              Since {sport.startDate}
            </span>
            <h2 className="mt-4 font-display text-5xl font-bold leading-[1.05] text-white sm:text-6xl md:text-7xl">
              {sport.name}
            </h2>
            <p className="mt-2 text-lg leading-relaxed text-white/80">{sport.discipline}</p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-16 px-6 py-16 sm:px-8">
        {/* Intro */}
        <Reveal>
          <p className="max-w-3xl font-display text-2xl font-medium leading-[1.35] sm:text-3xl">
            {sport.intro}
          </p>
        </Reveal>

        <SportCertificatesEditorial sport={sport} />

        {/* Event info */}
        <div className="grid gap-6 rounded-3xl glass p-6 sm:grid-cols-2 sm:p-8">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Active since</p>
              <p className="mt-0.5 font-semibold leading-snug">{sport.startDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Discipline</p>
              <p className="mt-0.5 font-semibold leading-snug">{sport.discipline}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onBack}
          className="mx-auto flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent/10"
        >
          <ChevronLeft className="h-4 w-4" /> Back to all sports
        </button>
      </div>
    </motion.div>
  );
}

export function Sports() {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const activeSport = sports.find((s) => s.id === activeId) ?? null;

  return (
    <SectionWrapper id="sports" className="relative overflow-hidden">
      <SectionHeading
        eyebrow="Sports"
        title="Every sport is a journey"
        description="Select a sport to enter its full-screen, cinematic experience."
      />

      <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.12}>
        {sports.map((sport) => (
          <StaggerItem key={sport.id}>
            <button
              onClick={() => setActiveId(sport.id)}
              className="group relative block h-full w-full overflow-hidden rounded-3xl text-left shadow-lift transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative h-72 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sport.heroImage}
                  alt={sport.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, hsl(var(--background)) 5%, transparent 70%), linear-gradient(135deg, ${sport.accent}44, transparent)`,
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] leading-none text-white"
                    style={{ backgroundColor: `${sport.accent}99` }}
                  >
                    {sport.startDate} — Present
                  </span>
                  <h3 className="mt-2.5 font-display text-2xl font-bold leading-[1.15] text-foreground">
                    {sport.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{sport.discipline}</p>
                  <p className="mt-3 line-clamp-2 text-sm leading-[1.7] text-muted-foreground/80">
                    {sport.intro}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold leading-none text-primary">
                    Enter experience
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </div>
              </div>
            </button>
          </StaggerItem>
        ))}
      </Stagger>

      <AnimatePresence>
        {activeSport && (
          <SportDetail sport={activeSport} onBack={() => setActiveId(null)} />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
