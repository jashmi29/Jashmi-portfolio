'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  X,
  ArrowUpRight,
  ChevronRight,
  Layers,
  Cpu,
  Workflow,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { SectionWrapper, SectionHeading } from '@/components/section-heading';
import { Reveal, Stagger, StaggerItem } from '@/components/interactive/reveal';
import { TiltCard } from '@/components/interactive/magnetic';
import { GradientOrb } from '@/components/interactive/ambient';
import { projects, type Project } from '@/lib/data/projects';
import { cn } from '@/lib/utils';

function SafeImage({
  src,
  alt,
  fill,
  sizes,
  className,
  accent,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  accent?: string;
}) {
  const [hasError, setHasError] = React.useState(false);

  if (hasError) {
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-center p-2 text-center text-xs text-muted-foreground"
        style={{
          background: accent ? `radial-gradient(circle, ${accent}22 0%, transparent 80%)` : undefined,
        }}
      >
        <Layers className="h-5 w-5 opacity-50" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}

/** Browser mockup frame wrapping a preview image */
function BrowserMockup({ src, accent, title }: { src: string; accent: string; title: string }) {
  const [hasError, setHasError] = React.useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background shadow-lift">
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <div className="ml-3 flex-1 truncate rounded-md bg-background/60 px-2 py-1 text-[10px] text-muted-foreground">
          {title.toLowerCase().replace(/\s+/g, '-')}.vercel.app
        </div>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {hasError ? (
          <div
            className="flex h-full w-full flex-col items-center justify-center p-4 text-center"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${accent}33 0%, hsl(var(--background)) 100%)`,
            }}
          >
            <div className="rounded-full p-3" style={{ backgroundColor: `${accent}22`, color: accent }}>
              <Layers className="h-6 w-6" />
            </div>
            <p className="mt-2 font-display text-sm font-bold text-foreground">{title}</p>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center p-2">
            <Image
              src={src}
              alt={`${title} preview`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              onError={() => setHasError(true)}
            />
          </div>
        )}
        <div
          className="absolute inset-0 mix-blend-overlay pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${accent}55, transparent 60%)` }}
        />
      </div>
    </div>
  );
}

/** Phone mockup */
function PhoneMockup({ src, accent }: { src: string; accent: string }) {
  const [hasError, setHasError] = React.useState(false);

  return (
    <div className="relative mx-auto w-[180px]">
      <div
        className="rounded-[2rem] border-[6px] border-foreground/80 bg-background p-1 shadow-lift"
        style={{ boxShadow: `0 20px 50px ${accent}40` }}
      >
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.5rem]">
          {!hasError ? (
            <Image
              src={src}
              alt="Mobile preview"
              fill
              sizes="(min-width: 768px) 20vw, 100vw"
              className="object-cover"
              onError={() => setHasError(true)}
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center p-4 text-center text-xs text-muted-foreground"
              style={{ background: `linear-gradient(180deg, ${accent}33, transparent)` }}
            >
              Preview
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>
        <div className="absolute left-1/2 top-1 h-1 w-12 -translate-x-1/2 rounded-b-lg bg-foreground/80" />
      </div>
    </div>
  );
}

function CaseStudyHero({ project }: { project: Project }) {
  const [hasError, setHasError] = React.useState(false);
  const heroSrc = project.caseStudyHero;

  if (heroSrc && !hasError) {
    return (
      <Image
        src={heroSrc}
        alt={`${project.title} hero`}
        fill
        sizes="(min-width: 768px) 60vw, 100vw"
        className="object-cover"
        onError={() => setHasError(true)}
      />
    );
  }

  // Premium placeholder: gradient + identity overlay (NO reuse of previewImage)
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(900px circle at 20% 10%, ${project.accent}66 0%, transparent 55%), radial-gradient(700px circle at 80% 40%, hsl(var(--primary))55 0%, transparent 55%), linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--background)) 40%, #0b1220 100%)`,
        }}
      />
      <div className="absolute inset-0 opacity-[0.18] mix-blend-soft-light">
        <div className="absolute -left-24 top-10 h-56 w-56 rounded-full" style={{ backgroundColor: `${project.accent}55` }} />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full" style={{ backgroundColor: `hsl(var(--primary))55` }} />
      </div>
      <div className="absolute bottom-6 left-6 right-6">
        <div className="max-w-xl">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{ backgroundColor: `${project.accent}33`, color: project.accent, border: `1px solid ${project.accent}55` }}
          >
            Hero Coming Soon
          </span>
          <h3 className="mt-3 font-display text-3xl font-bold leading-[1.15] text-white sm:text-4xl">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/80">{project.tagline}</p>
          <div className="mt-4 h-10 w-full rounded-2xl bg-white/5 backdrop-blur-md border border-white/10" />
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  React.useEffect(() => {

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-background/70 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl glass-strong shadow-lift no-scrollbar"
      >
        {/* Header banner */}
        <div className="relative h-48 overflow-hidden sm:h-64">
        <CaseStudyHero project={project} />

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, hsl(var(--background)), transparent 70%), linear-gradient(135deg, ${project.accent}66, transparent)`,
            }}
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full glass-strong text-foreground transition-colors hover:bg-destructive/20"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span
                className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
                style={{ backgroundColor: `${project.accent}33`, color: project.accent }}
              >
                {project.category}
              </span>
              <h3 className="mt-2 font-display text-3xl font-bold leading-[1.15] text-white sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-white/80">{project.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full glass-strong px-3 py-2 text-xs font-semibold text-white"
              >
                <Github className="h-3.5 w-3.5" /> Code
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-semibold text-black"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Demo
              </a>
              {project.wireframe && (
                <a
                  href={project.wireframe}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full glass-strong px-3 py-2 text-xs font-semibold text-white"
                >
                  <FileText className="h-3.5 w-3.5" /> Wireframe
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-10 p-6 sm:p-8">
          {/* Tech chips */}
          <div className="flex flex-wrap gap-2.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-medium leading-none text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="max-w-prose text-base leading-[1.8] text-muted-foreground sm:text-lg">
            {project.description}
          </p>

          {/* Feature highlights */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold leading-snug">
              <CheckCircle2 className="h-5 w-5 text-primary" /> Feature Highlights
            </h4>
            <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
              {project.features.map((f) => (
                <StaggerItem key={f.title}>
                  <div className="h-full rounded-2xl glass p-4">
                    <p className="font-display text-sm font-semibold leading-snug">{f.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Architecture & How it works */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl glass p-5">
              <h4 className="mb-2 flex items-center gap-2 font-display text-base font-semibold leading-snug">
                <Layers className="h-4 w-4 text-primary" /> Architecture
              </h4>
              <p className="text-sm leading-[1.8] text-muted-foreground">
                {project.architecture}
              </p>
            </div>
            <div className="rounded-2xl glass p-5">
              <h4 className="mb-2 flex items-center gap-2 font-display text-base font-semibold leading-snug">
                <Workflow className="h-4 w-4 text-primary" /> How it Works
              </h4>
              <p className="text-sm leading-[1.8] text-muted-foreground">
                {project.howItWorks}
              </p>
            </div>
          </div>

          {/* Gallery with device mockups */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold leading-snug">
              <Cpu className="h-5 w-5 text-primary" /> Gallery & Mockups
            </h4>

            <div className="grid items-center gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                {project.galleryImages[0] ? (
                  <BrowserMockup
                    src={project.galleryImages[0]}
                    accent={project.accent}
                    title={project.title}
                  />
                ) : (
                  <div className="relative overflow-hidden rounded-xl border border-border bg-muted/30">
                    <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.accent}22, transparent 60%)` }} />
                    <div className="relative p-6">
                      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-semibold text-muted-foreground">
                        <Cpu className="h-4 w-4" /> Coming Soon
                      </div>
                      <div className="mt-3 text-sm font-semibold text-foreground">Desktop/Web Screenshot</div>
                      <div className="mt-1 text-xs text-muted-foreground">Replace with your real asset URL when ready.</div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                {project.galleryImages[1] ? (
                  <PhoneMockup
                    src={project.galleryImages[1]}
                    accent={project.accent}
                  />
                ) : (
                  <div className="relative mx-auto w-[180px]">
                    <div
                      className="rounded-[2rem] border-[6px] border-foreground/80 bg-background p-1 shadow-lift"
                      style={{ boxShadow: `0 20px 50px ${project.accent}40` }}
                    >
                      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.5rem]">
                        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${project.accent}22, transparent 65%)` }} />
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="rounded-2xl border border-border bg-background/60 px-3 py-2 text-center">
                            <div className="text-xs font-semibold text-muted-foreground">Coming Soon</div>
                            <div className="mt-1 text-[10px] text-muted-foreground">Mobile Mockup</div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      <div className="absolute left-1/2 top-1 h-1 w-12 -translate-x-1/2 rounded-b-lg bg-foreground/80" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional screenshots */}
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {project.galleryImages.length > 2 ? (
                project.galleryImages.slice(2).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-video overflow-hidden rounded-xl border border-border"
                  >
                    <SafeImage
                      src={img}
                      alt={`${project.title} screenshot ${i + 3}`}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover"
                      accent={project.accent}
                    />
                  </div>
                ))
              ) : (
                (project.galleryDemoImages ?? []).slice(0, 3).map((demoImg, i) => (
                  <div
                    key={`${project.title}-demo-${i}`}
                    className="relative aspect-video overflow-hidden rounded-xl border border-border"
                  >
                    <SafeImage
                      src={demoImg}
                      alt={`${project.title} demo screenshot ${i + 3}`}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover"
                      accent={project.accent}
                    />
                  </div>
                ))
              )}
            </div>

          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const reversed = index % 2 === 1;
  return (
    <Reveal>
      <div
        className={cn(
          'grid items-center gap-8 lg:grid-cols-2 lg:gap-12',
          reversed && 'lg:[direction:rtl]'
        )}
      >
        {/* Preview */}
        <div className="[direction:ltr]">
          <TiltCard maxTilt={6} className="group relative cursor-pointer" >
            <div onClick={onOpen}>
              <div className="relative overflow-hidden rounded-3xl gradient-border glass p-2 shadow-lift transition-transform duration-300 group-hover:-translate-y-1">
                <BrowserMockup
                  src={project.previewImage}
                  accent={project.accent}
                  title={project.title}
                />
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Content */}
        <div className="[direction:ltr] space-y-5">
          <div className="flex items-center gap-2.5">
            <span
              className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
              style={{ backgroundColor: `${project.accent}22`, color: project.accent }}
            >
              {project.category}
            </span>
            {project.featured && (
              <span className="rounded-full bg-primary/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                Featured
              </span>
            )}
          </div>

          <h3 className="font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl">
            {project.title}
          </h3>
          <p className="text-lg font-medium leading-snug text-muted-foreground">{project.tagline}</p>
          <p className="max-w-prose text-base leading-[1.8] text-muted-foreground">
            {project.description}
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-2.5">
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-medium leading-none text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onOpen}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
            >
              View project
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent/10"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent/10"
            >
              <ArrowUpRight className="h-4 w-4" /> Live
            </a>
            {project.wireframe && (
              <a
                href={project.wireframe}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent/10"
              >
                <FileText className="h-4 w-4" /> Wireframe
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/** "View More Projects" simple button linking to the GitHub profile */
function ViewMoreCard() {
  return (
    <Reveal>
      <div className="flex justify-center">
        <a
          href="https://github.com/jashmi29"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
        >
          View more projects
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </Reveal>
  );
}

export function Projects() {
  const [openId, setOpenId] = React.useState<string | null>(null);
  const openProject = projects.find((p) => p.id === openId) ?? null;

  return (
    <SectionWrapper id="projects" className="relative overflow-hidden">
      <GradientOrb className="right-10 top-20 h-72 w-72" color="hsl(var(--mesh-1) / 0.12)" />

      <SectionHeading
        eyebrow="Projects"
        title="Premium product showcases"
        description="Each project has its own visual identity. Open one for the full case study."
      />

      <div className="mt-16 space-y-24">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onOpen={() => setOpenId(project.id)}
          />
        ))}
        <ViewMoreCard />
      </div>

      <AnimatePresence>
        {openProject && (
          <ProjectModal project={openProject} onClose={() => setOpenId(null)} />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
