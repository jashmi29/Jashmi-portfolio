'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Shield, Trophy, Palette, X, Maximize2 } from 'lucide-react';
import { SectionWrapper, SectionHeading } from '@/components/section-heading';
import { cn } from '@/lib/utils';
import {
  certificates,
  type Certificate,
  type CertificateCategory,
} from '@/lib/data/certificates';

import { sports } from '@/lib/data/sports';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Shield,
  Trophy,
  Palette,
};

function TechFullscreenViewer({
  cert,
  onClose,
}: {
  cert: Certificate;
  onClose: () => void;
}) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Lightweight zoom: mouse wheel zoom in/out, plus +/- keyboard.
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => setScale(1), [cert.id]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-5xl"
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full glass-strong text-white"
            aria-label="Close"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>

          <motion.div
            className="flex items-center justify-center"
            style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
            onWheel={(e) => {
              e.preventDefault();
              const delta = e.deltaY > 0 ? -0.12 : 0.12;
              setScale((s) => Math.max(1, Math.min(2.5, s + delta)));
            }}
          >
            <Image
              src={cert.image}
              alt={`${cert.title} preview`}
              width={1400}
              height={900}
              className="max-h-[85vh] w-auto rounded-2xl object-contain shadow-lift"
            />
          </motion.div>

          {/* Minimal title below image (no extra metadata) */}
          <p className="mt-3 text-center text-sm font-semibold text-white/70">{cert.title}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const TechCertificateCard = React.forwardRef<
  HTMLDivElement,
  {
    cert: Certificate;
    onOpen: () => void;
  }
>(function TechCertificateCard({ cert, onOpen }, ref) {
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      onClick={onOpen}
      className="group cursor-pointer overflow-hidden rounded-3xl glass transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={cert.image}
            alt={`${cert.title} thumbnail`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-contain bg-transparent transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent opacity-90" />
          <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full glass-strong text-white opacity-0 transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="border-t border-white/10 bg-background/60 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/40 sm:p-5">
          <p className="font-display text-base font-semibold leading-[1.3] text-foreground">
            {cert.title}
          </p>
        </div>
      </div>
    </motion.div>
  );
});
TechCertificateCard.displayName = 'TechCertificateCard';

function isTech(c: Certificate) {
  return c.category === 'tech';
}

function ViewAllButton({
  onClick,
  count,
}: {
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group mt-5 w-full rounded-2xl border border-white/10 bg-background/40 px-4 py-3 text-sm font-semibold transition-all',
        'hover:-translate-y-0.5 hover:border-white/20 hover:bg-background/55'
      )}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-foreground">
          View All
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold leading-none text-muted-foreground transition-colors group-hover:bg-muted-foreground/15">
            {count}
          </span>
        </span>
        <span className="inline-flex items-center gap-2 text-muted-foreground">
          →
        </span>
      </div>
    </button>
  );
}

function CategorySection({
  title,
  icon,
  certificates,
  limit,
  onViewAll,
  onOpenFullscreen,
}: {
  title: string;
  icon: React.ReactNode;
  certificates: Certificate[];
  limit: number;
  onViewAll: () => void;
  onOpenFullscreen: (cert: Certificate) => void;
}) {
  const initial = certificates.slice(0, limit);

  return (
    <div className="rounded-3xl glass p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-background/60 text-foreground">
              {icon}
            </div>
            <h3 className="font-display text-2xl font-bold leading-snug">{title}</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Showing {Math.min(limit, certificates.length)} of {certificates.length}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {initial.map((cert) => (
            <TechCertificateCard
              key={cert.id}
              cert={cert}
              onOpen={() => onOpenFullscreen(cert)}
            />
          ))}
        </AnimatePresence>
      </div>

      <ViewAllButton onClick={onViewAll} count={certificates.length} />
    </div>
  );
}

function FullscreenGallery({
  title,
  certificates,
  initialIndex,
  onClose,
  onOpenImage,
}: {
  title: string;
  certificates: Certificate[];
  initialIndex?: number;
  onClose: () => void;
  onOpenImage: (cert: Certificate) => void;
}) {
  useBodyOverflowLock(true);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[95] bg-black/90 p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="mx-auto flex w-full max-w-6xl flex-col"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white/80">{title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-white/60">Click any certificate to open the fullscreen image preview</p>
            </div>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full glass-strong text-white"
              aria-label="Close"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 overflow-y-auto pb-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((cert) => (
                <TechCertificateCard
                  key={cert.id}
                  cert={cert}
                  onOpen={() => onOpenImage(cert)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function useBodyOverflowLock(locked: boolean) {
  React.useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

export function Certificates() {
  // Tech/NCC/Creative come from certificates.ts
  const tech = certificates.filter((c) => c.category === 'tech');
  const ncc = certificates.filter((c) => c.category === 'ncc');
  const creative = certificates.filter((c) => c.category === 'creative');

  // Sports comes from sports.ts (flatten all sport.certificates)
  const earlyCertificates: Certificate[] = React.useMemo(() => {
    return sports.flatMap((s) =>
      (s.certificates ?? []).map((c) => ({
        id: c.id,
        title: c.title,
        issuer: c.issuer,
        date: c.date,
        // This section doesn’t rely on category metadata from sports certificates.
        category: 'ncc',
        description: c.description,
        image: c.image,
        context: c.event,
        learningOutcomes: c.highlights ?? [],
      }))
    );
  }, []);


  const [gallery, setGallery] = React.useState<
    | { type: 'tech' | 'ncc' | 'creative'; index: number }
    | { type: 'sports'; index: number }
    | null
  >(null);

  const [techFullscreen, setTechFullscreen] = React.useState<Certificate | null>(null);
  const [earlyFullscreen, setEarlyFullscreen] = React.useState<Certificate | null>(null);

  const openEarlyImage = (cert: Certificate) => {
    setEarlyFullscreen(cert);
  };


  return (
    <SectionWrapper id="certificates" className="relative overflow-hidden">
      <SectionHeading
        eyebrow="Certificates"
        title="A premium digital archive"
        description="Browse credentials across tech, NCC, sport, and the creative disciplines."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <CategorySection
          title="Tech & Engineering"
          icon={<Code2 className="h-5 w-5" />}
          certificates={tech}
          limit={3}
          onViewAll={() => setGallery({ type: 'tech', index: 0 })}
          onOpenFullscreen={(cert) => setTechFullscreen(cert)}
        />

        <CategorySection
          title="NCC"
          icon={<Shield className="h-5 w-5" />}
          certificates={ncc}
          limit={3}
          onViewAll={() => setGallery({ type: 'ncc', index: 0 })}
          onOpenFullscreen={(cert) => setTechFullscreen(cert)}
        />

        <CategorySection
          title="Early Achievements"
          icon={<Trophy className="h-5 w-5" />}
          certificates={earlyCertificates}
          limit={3}
          onViewAll={() => setGallery({ type: 'sports', index: 0 })}
          onOpenFullscreen={(cert) => openEarlyImage(cert)}
        />

        <CategorySection
          title="Creative"
          icon={<Palette className="h-5 w-5" />}
          certificates={creative}
          limit={3}
          onViewAll={() => setGallery({ type: 'creative', index: 0 })}
          onOpenFullscreen={(cert) => setTechFullscreen(cert)}
        />
      </div>

      {gallery?.type === 'tech' && (
        <FullscreenGallery
          title="Tech & Engineering"
          certificates={tech}
          onClose={() => setGallery(null)}
          onOpenImage={(cert) => setTechFullscreen(cert)}
        />
      )}
      {gallery?.type === 'ncc' && (
        <FullscreenGallery
          title="NCC"
          certificates={ncc}
          onClose={() => setGallery(null)}
          onOpenImage={(cert) => setTechFullscreen(cert)}
        />
      )}
      {gallery?.type === 'creative' && (
        <FullscreenGallery
          title="Creative"
          certificates={creative}
          onClose={() => setGallery(null)}
          onOpenImage={(cert) => setTechFullscreen(cert)}
        />
      )}
      {gallery?.type === 'sports' && (
        <AnimatePresence>
          <motion.div

            className="fixed inset-0 z-[95] bg-black/90 p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGallery(null)}
          >
            <motion.div
              className="mx-auto flex w-full max-w-6xl flex-col"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white/80">Early Achievements</p>

                  <p className="mt-0.5 text-xs leading-relaxed text-white/60">Click any certificate to open the fullscreen image preview</p>
                </div>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full glass-strong text-white"
                  aria-label="Close"
                  onClick={() => setGallery(null)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 overflow-y-auto pb-10">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {earlyCertificates.map((cert) => (
                    <TechCertificateCard
                      key={cert.id}
                      cert={cert}
                      onOpen={() => {
                        openEarlyImage(cert);
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {techFullscreen && <TechFullscreenViewer cert={techFullscreen} onClose={() => setTechFullscreen(null)} />}
      {earlyFullscreen && (
        <TechFullscreenViewer cert={earlyFullscreen} onClose={() => setEarlyFullscreen(null)} />
      )}

    </SectionWrapper>
  );
}


