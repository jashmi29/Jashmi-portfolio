'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SectionWrapper, SectionHeading } from '@/components/section-heading';
import { Reveal, Stagger, StaggerItem } from '@/components/interactive/reveal';
import { GradientOrb } from '@/components/interactive/ambient';

interface DesignItem {
  title: string;
  category: string;
  image: string;
}

const designItems: DesignItem[] = [
  {
    title: 'Brand Identity',
    category: 'Logo Design',
    image: '/design/logo.jpeg',
  },
  {
    title: 'Pattern Design',
    category: 'Magazine layout',
    image: '/design/ii.png',
  },
  {
    title: 'Visual Design',
    category: 'Product Staging',
    image: '/design/m.png',
  },
  {
    title: 'Poster design',
    category: 'Poster Design',
    image: '/design/Physio.png',
  },
  {
    title: 'Creative Direction',
    category: 'Editorial Poster',
    image: '/design/c.png',
  },
  {
    title: 'Visual Storytelling',
    category: 'Campaign Poster',
    image: '/design/i.png',
  },
];

function Lightbox({
  item,
  onClose,
}: {
  item: DesignItem;
  onClose: () => void;
}) {
  // Close on Escape key
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white/80 transition-colors hover:bg-white/20 hover:text-white"
        aria-label="Close preview"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Image */}
      <motion.div
        className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.image}
          alt={`${item.title} preview`}
          width={1200}
          height={900}
          className="max-h-[85vh] w-auto max-w-[90vw] rounded-2xl object-contain shadow-2xl"
        />

        {/* Bottom caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 pt-12">
          <p className="font-display text-lg font-semibold text-white">{item.title}</p>
          <p className="text-sm text-white/70">{item.category}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DesignCard({
  item,
  onDoubleClick,
}: {
  item: DesignItem;
  onDoubleClick: () => void;
}) {
  const clickTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    // Single click — do nothing (hover effect stays)
    // Double click detection: if a timeout exists, it's a double-click
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      onDoubleClick();
    } else {
      clickTimeout.current = setTimeout(() => {
        clickTimeout.current = null;
      }, 300);
    }
  };

  return (
    <StaggerItem>
      <motion.div
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 shadow-lift transition-all duration-500 hover:-translate-y-1 hover:shadow-glow cursor-pointer"
        style={{ aspectRatio: '4 / 3' }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={handleClick}
      >
        {/* Image */}
        <Image
          src={item.image}
          alt={`${item.title} thumbnail`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
        />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80 pointer-events-none" />

        {/* Blue glow accent on hover */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
          style={{
            background:
              'radial-gradient(600px circle at 50% 50%, hsl(199 89% 48% / 0.08), transparent 60%)',
          }}
        />

        {/* Hint text — only on hover */}
<div className="absolute top-0 left-0 right-0 p-4 translate-y-[-8px] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-white/60 border border-white/8">
            Double-click to preview
          </span>
        </div>

        {/* Category label — only visible on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/70 backdrop-blur-md px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/90 border border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            {item.category}
          </span>
        </div>

        {/* Subtle border glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1px hsl(199 89% 48% / 0.3)' }}
        />
      </motion.div>
    </StaggerItem>
  );
}

export function DesignVisuals() {
  const [previewItem, setPreviewItem] = React.useState<DesignItem | null>(null);

  return (
    <SectionWrapper id="design" className="relative overflow-hidden">
      <GradientOrb className="left-0 top-1/3 h-80 w-80" color="hsl(var(--mesh-1) / 0.12)" />
      <GradientOrb
        className="right-0 bottom-1/4 h-72 w-72"
        color="hsl(var(--mesh-4) / 0.12)"
      />

      <SectionHeading
        eyebrow="Creative"
        title="Design & Visuals"
        description="Logo design, brand headers, and visual identity work — a curated gallery of creative projects."
      />

      <Stagger
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.08}
      >
        {designItems.map((item) => (
          <DesignCard
            key={item.title}
            item={item}
            onDoubleClick={() => setPreviewItem(item)}
          />
        ))}
      </Stagger>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {previewItem && (
          <Lightbox item={previewItem} onClose={() => setPreviewItem(null)} />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
