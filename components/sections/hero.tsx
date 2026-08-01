'use client';

import * as React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useScroll,
} from 'framer-motion';
import Image from 'next/image';
import { ArrowDown, Sparkles, Github, Linkedin, Mail, ExternalLink, Briefcase } from 'lucide-react';
import { Magnetic } from '@/components/interactive/magnetic';
import { Particles, GradientOrb } from '@/components/interactive/ambient';
import { TextReveal } from '@/components/interactive/reveal';
import { profileInfo, contactInfo } from '@/lib/data/profile';
import { HireMeModal } from '@/components/sections/hire-me-modal';

const IDENTITY_CHIPS = [
  { label: 'Engineer', x: -250, y: -120, delay: 0, icon: 'Code' },
  { label: 'Designer', x: 150, y: -90, delay: 0.4, icon: 'Palette' },
  { label: 'Athlete', x: -200, y: 80, delay: 0.2, icon: 'Medal' },
  { label: 'Cadet', x: 170, y: 110, delay: 0.6, icon: 'Shield' }
];

const PROFILE_IMAGE =
  'https://www.image2url.com/r2/default/images/1782022326028-0b42b5f6-d5f0-4d79-92b2-fd503fa6998b.jpeg';

function useMouseParallax(strength: number) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mx.set((e.clientX / innerWidth - 0.5) * strength);
      my.set((e.clientY / innerHeight - 0.5) * strength);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [mx, my, strength]);

  return { sx, sy };
}

export function Hero() {
  const { sx, sy } = useMouseParallax(40);
  const [roleIndex, setRoleIndex] = React.useState(0);
  const [hireMeOpen, setHireMeOpen] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % profileInfo.roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const layer1X = useTransform(sx, (v) => v * 0.4);
  const layer1Y = useTransform(sy, (v) => v * 0.4);
  const layer2X = useTransform(sx, (v) => v * 0.8);
  const layer2Y = useTransform(sy, (v) => v * 0.8);
  const layer3X = useTransform(sx, (v) => v * 1.4);
  const layer3Y = useTransform(sy, (v) => v * 1.4);
  const frameX = useTransform(sx, (v) => v * 0.7);
  const frameY = useTransform(sy, (v) => v * 0.7);

  const socialIcon = {
    github: Github,
    linkedin: Linkedin,
    mail: Mail,
  } as const;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24"
    >
      {/* Layered lighting behind composition */}
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-70" />
      <GradientOrb className="left-[10%] top-[20%] h-72 w-72" color="hsl(var(--mesh-1) / 0.3)" />
      <GradientOrb className="right-[12%] top-[30%] h-80 w-80" color="hsl(var(--mesh-3) / 0.25)" />
      <GradientOrb className="bottom-[15%] left-[40%] h-96 w-96" color="hsl(var(--mesh-2) / 0.2)" />
      <Particles count={20} />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
      >
        {/* Left: text */}
        <div className="flex flex-col items-start gap-7">
          {/* Availability indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium text-foreground">
              {contactInfo.availability}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            <TextReveal text="I craft" />
            <br />
            <span className="text-gradient-primary">
              <TextReveal text="interfaces" delay={0.15} />
            </span>
            <br />
            <TextReveal text="that feel alive." delay={0.3} />
          </h1>

          {/* Rotating roles */}
          <div className="flex h-10 items-center gap-3 overflow-hidden">
            <span className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
              I am a
            </span>
            <div className="relative h-10 w-[280px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center font-display text-xl font-semibold text-foreground"
                >
                  {profileInfo.roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl text-base leading-[1.8] text-muted-foreground sm:text-lg"
          >
            {profileInfo.intro}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={0.4}>
              <button
                onClick={() =>
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="group inline-flex items-center gap-2.5 rounded-full glass px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/10"
              >
                View my work
                <ArrowDown className="h-4 w-4 -rotate-90 transition-transform group-hover:translate-x-1" />
              </button>
            </Magnetic>
            <Magnetic strength={0.4}>
              <button
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="inline-flex items-center gap-2.5 rounded-full glass px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-accent/10"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                Get in touch
              </button>
            </Magnetic>
            <Magnetic strength={0.4}>
              <button
                onClick={() => setHireMeOpen(true)}
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 px-7 py-3.5 text-sm font-semibold text-background shadow-lift transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_-6px_hsl(var(--primary))]"
              >
                <span className="absolute -inset-x-8 -top-1/2 h-32 w-5 -translate-x-20 rotate-12 bg-white/20 transition-transform duration-500 group-hover:translate-x-40" />
                <span className="relative z-10">Hire Me</span>
                <Briefcase className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Magnetic>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-3"
          >
            {contactInfo.socials.map((s) => {
              const Icon = socialIcon[s.icon as keyof typeof socialIcon] ?? Mail;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full glass text-muted-foreground transition-all hover:scale-110 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* Right: layered 3D profile composition */}
        <motion.div
          style={{ x: layer1X, y: layer1Y }}
          className="relative mx-auto hidden aspect-square w-full max-w-md items-center justify-center lg:flex"
        >
          {/* Decorative rotating rings */}
          <motion.div
            style={{ x: layer2X, y: layer2Y }}
            className="absolute inset-0 rounded-full border border-primary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            style={{ x: layer3X, y: layer3Y }}
            className="absolute inset-[8%] rounded-full border border-primary/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />

          {/* Soft floating decorative blobs */}
          <motion.div
            style={{ x: layer2X, y: layer2Y }}
            className="absolute -left-4 top-10 h-24 w-24 rounded-full bg-gradient-to-br from-primary/30 to-chart-3/20 blur-2xl"
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{ x: layer3X, y: layer3Y }}
            className="absolute -right-2 bottom-12 h-20 w-20 rounded-full bg-gradient-to-br from-chart-2/30 to-primary/20 blur-2xl"
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          {/* Glass profile frame with animated gradient border */}
          <motion.div
            style={{ x: frameX, y: frameY }}
            className="relative aspect-[4/5] w-[78%] overflow-hidden rounded-[2rem] gradient-border glass-strong shadow-lift"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={PROFILE_IMAGE}
              alt={`${profileInfo.name} portrait`}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
              style={{ filter: 'saturate(1.05) contrast(1.02)' }}
              priority
            />
            {/* Depth overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-chart-3/10 mix-blend-overlay" />
            {/* Name plate */}
            <div className="absolute inset-x-4 bottom-4 rounded-2xl glass px-4 py-3">
              <p className="font-display text-base font-semibold leading-snug text-white">
                {profileInfo.name}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-white/70">{profileInfo.tagline}</p>
            </div>
          </motion.div>

          {/* Floating identity chips with natural physics */}
          {IDENTITY_CHIPS.map((chip) => (
            <motion.div
              key={chip.label}
              style={{
                x: layer2X,
                y: layer2Y,
                left: `calc(50% + ${chip.x}px)`,
                top: `calc(50% + ${chip.y}px)`,
              }}
              className="absolute"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + chip.delay }}
            >
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
                transition={{
                  duration: 4 + chip.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: chip.delay,
                }}
                className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full glass-strong px-3.5 py-1.5 text-xs font-medium shadow-soft"
              >
                {chip.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <HireMeModal open={hireMeOpen} onOpenChange={setHireMeOpen} />

      {/* Scroll indicator */}
      <motion.button
        onClick={() =>
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-label="Scroll to about"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-border p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-primary"
            animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.button>
    </section>
  );
}
