'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X, Search, Download } from 'lucide-react';
import { Reveal } from '@/components/interactive/reveal';
import { cn } from '@/lib/utils';
import type { Sport, SportCertificate } from '@/lib/data/sports';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function useBodyScrollLock(locked: boolean) {
  React.useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

type ViewerProps = {
  certificates: SportCertificate[];
  initialIndex: number;
  onClose: () => void;
};

function FullscreenImageViewer({
  certificates,
  initialIndex,
  onClose,
}: ViewerProps) {
  const [index, setIndex] = React.useState(initialIndex);
  const [scale, setScale] = React.useState(1);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const cert = certificates[index];
  useBodyScrollLock(true);

  React.useEffect(() => {
    setIndex(initialIndex);
    setScale(1);
  }, [initialIndex]);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIndex((v) => (v - 1 + certificates.length) % certificates.length);
      if (e.key === 'ArrowRight') setIndex((v) => (v + 1) % certificates.length);
      if (e.key === '+' || e.key === '=') setScale((s) => clamp(s + 0.12, 1, 2.5));
      if (e.key === '-' || e.key === '_') setScale((s) => clamp(s - 0.12, 1, 2.5));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [certificates.length, onClose]);

  if (!cert) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-6"
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
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.12),transparent_45%)]" />

          {/* Top bar */}
          <div className="absolute left-0 right-0 top-0 flex items-center justify-between gap-3 p-2 sm:p-3">
            <div className="min-w-0">
              <p className="truncate text-center text-sm font-semibold text-white/80 sm:text-left">
                {cert.title}
              </p>
              <p className="truncate text-xs text-white/60">
                {cert.issuer} · {cert.date}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                className="pointer-events-auto rounded-full glass-strong text-white hover:bg-white/10"
                aria-label="Zoom in"
                onClick={() => setScale((s) => clamp(s + 0.12, 1, 2.5))}
                whileTap={{ scale: 0.96 }}
              >
                <Search className="h-4 w-4" />
              </motion.button>

              <a
                href={cert.image}
                download={cert.title}
                target="_blank"
                rel="noreferrer"
                className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full glass-strong text-white hover:bg-white/10"
                aria-label="Download certificate"
              >
                <Download className="h-4 w-4" />
              </a>

              <motion.button
                className="pointer-events-auto rounded-full glass-strong text-white hover:bg-white/10"
                aria-label="Close viewer"
                onClick={onClose}
                whileTap={{ scale: 0.96 }}
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>
          </div>

          {/* Nav */}
          {certificates.length > 1 && (
            <>
              <motion.button
                className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-auto rounded-full glass-strong text-white hover:bg-white/10"
                aria-label="Previous certificate"
                onClick={() => {
                  setIndex((v) => (v - 1 + certificates.length) % certificates.length);
                  setScale(1);
                }}
                whileTap={{ scale: 0.96 }}
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.button
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto rounded-full glass-strong text-white hover:bg-white/10"
                aria-label="Next certificate"
                onClick={() => {
                  setIndex((v) => (v + 1) % certificates.length);
                  setScale(1);
                }}
                whileTap={{ scale: 0.96 }}
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </>
          )}

          {/* Image */}
          <motion.div
            className="relative mt-14 flex w-full items-center justify-center"
            transition={{ duration: 0.25 }}
          >
            <motion.img
              key={cert.id}
              ref={imgRef}
              src={cert.image}
              alt={cert.title}
              className="max-h-[78vh] w-auto rounded-2xl object-contain shadow-lift"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'center center' }}
              onWheel={(e) => {
                e.preventDefault();
                setScale((s) => {
                  const delta = e.deltaY > 0 ? -0.12 : 0.12;
                  return clamp(s + delta, 1, 2.5);
                });
              }}
            />
          </motion.div>

          {/* Footer hint */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/60">
            <span>Zoom:</span>
            <span className="rounded-full bg-white/10 px-2 py-1">Mouse wheel</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">ESC to close</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function CertificateStory({
  sport,
  cert,
  index,
  onOpen,
}: {
  sport: Sport;
  cert: SportCertificate;
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <Reveal>
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="group relative rounded-[22px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-3 shadow-lift"
        >
          <motion.button
            type="button"
            onClick={() => onOpen(index)}
            className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[18px] border border-white/10 bg-background/40 shadow-lift transition-all duration-300 hover:-translate-y-0.5"
            whileHover={{ y: -2 }}
          >
            <div
              className="absolute inset-0 opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${sport.accent}44, transparent 50%)`,
              }}
            />
            <div className="absolute inset-0 rounded-[18px] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_45%)]" />

            <div className="relative aspect-[4/5] overflow-hidden rounded-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cert.image}
                alt={cert.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute inset-0 flex items-end justify-between p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full glass-strong text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Maximize2 className="h-4 w-4" />
                </div>
              </div>
            </div>

            <span className="sr-only">Open fullscreen preview for {cert.title}</span>
          </motion.button>
        </motion.div>

        {index !== undefined ? <div className="h-0" /> : null}
      </div>
    </Reveal>
  );
}

export function SportCertificatesEditorial({ sport }: { sport: Sport }) {
  const [viewerIndex, setViewerIndex] = React.useState<number | null>(null);

  if (!sport.certificates?.length) return null;

  return (
    <section>
      <h3 className="mb-10 font-display text-2xl font-bold">Certificates</h3>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {sport.certificates.map((cert, i) => (
          <div key={cert.id} className="scroll-mt-24">
            <CertificateStory
              sport={sport}
              cert={cert}
              index={i}
              onOpen={(idx) => setViewerIndex(idx)}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {viewerIndex !== null && (
          <FullscreenImageViewer
            certificates={sport.certificates}
            initialIndex={viewerIndex}
            onClose={() => setViewerIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

