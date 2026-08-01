'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout,
  Server,
  Palette,
  Wrench,
  Code2,
  Layers,
  Boxes,
  Sparkles,
} from 'lucide-react';
import { SectionWrapper, SectionHeading } from '@/components/section-heading';
import { GradientOrb } from '@/components/interactive/ambient';
import { skillCategories, technologies, type Technology } from '@/lib/data/skills';
import { cn } from '@/lib/utils';

const ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Layout,
  Server,
  Palette,
  Wrench,
  Code2,
  Layers,
  Boxes,
  Sparkles,
};

function OrbitField({ techs, color }: { techs: Technology[]; color: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState(460);
  const [hovered, setHovered] = React.useState<string | null>(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setSize(el.clientWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const count = techs.length;
  const orbitRadius = size * 0.36;
  const ringRadii = [size * 0.44, size * 0.36, size * 0.28];
  const DURATION = 60;

  return (
    <div ref={containerRef} className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* Concentric orbital rings — behind everything */}
      {ringRadii.map((r, idx) => (
        <div
          key={idx}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: r * 2,
            height: r * 2,
            border: `1px ${idx === 1 ? 'solid' : 'dashed'}`,
            borderColor: `${color}1a`,
          }}
        />
      ))}

      {/* Rotating orbit — subtle radial guides + evenly spaced pills */}
      <div className="absolute left-1/2 top-1/2" style={{ width: 0, height: 0 }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: DURATION, repeat: Infinity, ease: 'linear' }}
          style={{ width: 0, height: 0 }}
        >
          {techs.map((tech, i) => {
            const angle = (360 / count) * i;
            const rad = (angle * Math.PI) / 180;
            const px = Math.cos(rad) * orbitRadius;
            const py = Math.sin(rad) * orbitRadius;
            return (
              <div key={tech.name}>
                {/* Subtle radial guide line */}
                <div
                  className="absolute left-0 top-0"
                  style={{
                    width: orbitRadius,
                    height: 1,
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: 'left center',
                    background: `linear-gradient(90deg, ${color}00 0%, ${color}12 100%)`,
                  }}
                />
                {/* Technology pill */}
                <div className="absolute" style={{ transform: `translate(${px}px, ${py}px)` }}>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: DURATION, repeat: Infinity, ease: 'linear' }}
                    style={{ x: '-50%', y: '-50%' }}
                  >
                    <div
                      onMouseEnter={() => setHovered(tech.name)}
                      onMouseLeave={() => setHovered(null)}
                      className={cn(
                        'flex cursor-default items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-md transition-all duration-300',
                        'border-white/10 bg-slate-900/60 text-slate-100',
                        hovered === tech.name &&
                          'scale-110 border-white/25 bg-slate-800/70 text-white',
                        hovered && hovered !== tech.name && 'opacity-40 saturate-50'
                      )}
                      style={
                        hovered === tech.name
                          ? { boxShadow: `0 0 0 1px ${color}30, 0 0 24px ${color}33` }
                          : undefined
                      }
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: tech.color ?? color }}
                      />
                      {tech.name}
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Center card */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div
          className="flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl"
          style={{ boxShadow: `0 0 0 1px ${color}22, 0 8px 40px ${color}26` }}
        >
          <span className="font-display text-2xl font-bold leading-none" style={{ color }}>
            {count}
          </span>
          <span className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-slate-400">
            tools
          </span>
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  const [activeId, setActiveId] = React.useState(skillCategories[0].id);
  const active = skillCategories.find((c) => c.id === activeId)!;
  const activeTechs = technologies.filter((t) => t.categoryId === activeId);
  const activeIcon = ICONS[active.icon] ?? Boxes;

  return (
    <SectionWrapper id="skills" className="relative overflow-hidden">
      <GradientOrb className="left-0 top-1/3 h-80 w-80" color="hsl(var(--mesh-1) / 0.12)" />
      <GradientOrb className="right-0 bottom-1/4 h-72 w-72" color="hsl(var(--mesh-4) / 0.12)" />

      <SectionHeading
        eyebrow="Skills"
        title="An interactive technology ecosystem"
        description="My stack isn't a list — it's a living system. Switch categories to watch the orbit rearrange."
      />

      {/* Category switcher */}
      <div className="mt-12 flex flex-wrap gap-3">
        {skillCategories.map((cat) => {
          const Icon = ICONS[cat.icon] ?? Boxes;
          const isActive = cat.id === activeId;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className={cn(
                'group relative flex items-center gap-2.5 rounded-2xl px-4 py-3 text-sm font-medium transition-all',
                isActive ? 'text-primary-foreground shadow-glow' : 'glass hover:bg-accent/10'
              )}
              style={isActive ? { backgroundColor: cat.color } : undefined}
            >
              <Icon className="h-4 w-4" />
              <span>{cat.label}</span>
              <span
                className={cn(
                  'ml-1 rounded-full px-2 py-0.5 text-[10px] font-bold leading-none',
                  isActive ? 'bg-white/20' : 'bg-muted text-muted-foreground'
                )}
              >
                {technologies.filter((t) => t.categoryId === cat.id).length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        {/* Orbit visualization */}
        <div className="order-2 lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <OrbitField techs={activeTechs} color={active.color} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Category detail panel */}
        <div className="order-1 lg:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${active.color}22` }}
                >
                  {React.createElement(activeIcon, {
                    className: 'h-5 w-5',
                    style: { color: active.color },
                  })}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold leading-snug">{active.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{active.description}</p>
                </div>
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2.5">
                {activeTechs.map((tech, i) => (
                  <motion.span
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-sm font-medium"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: tech.color ?? active.color }}
                    />
                    {tech.name}
                    <span className="text-xs leading-none text-muted-foreground">{tech.weight}</span>
                  </motion.span>
                ))}
              </div>

              {/* Relationship note */}
              <div className="rounded-2xl glass p-6">
                <p className="text-sm leading-[1.8] text-muted-foreground">
                  <span className="font-semibold text-foreground">{active.label}</span>{' '}
                  technologies connect across the stack —{' '}
                  {activeId === 'frontend' && 'powering the interfaces and digital experiences in my projects.'}
                  {activeId === 'backend' && 'powering the APIs, authentication, and data flows behind my applications.'}
                  {activeId === 'design' && 'they shape the systems my components live in.'}
                  {activeId === 'tools' && 'they keep everything building and versioned smoothly.'}
                  {activeId === 'ai' && 'they accelerate my workflows from idea to prototype in minutes.'}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
