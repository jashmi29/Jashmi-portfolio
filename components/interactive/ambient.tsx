'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Cursor-reactive ambient light that follows the pointer.
 * Render once near the top of the page; it listens globally.
 */
export function AmbientLight({ className }: { className?: string }) {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 120, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 120, damping: 30, mass: 0.5 });

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className={cn(
        'pointer-events-none fixed left-0 top-0 z-[1] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[100px]',
        className
      )}
    >
      <div className="h-full w-full rounded-full bg-primary/20" />
    </motion.div>
  );
}

/**
 * Floating decorative particles. Lightweight — uses CSS transforms.
 */
export function Particles({ count = 18, className }: { count?: number; className?: string }) {
  const [items, setItems] = React.useState<
    Array<{ id: number; left: number; top: number; size: number; delay: number; duration: number; opacity: number }>
  >([]);

  React.useEffect(() => {
    setItems(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 8,
        opacity: 0.15 + Math.random() * 0.35,
      }))
    );
  }, [count]);

  if (items.length === 0) return null;

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {items.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary/40"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{ y: [0, -30, 0], x: [0, 12, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/**
 * A subtle mesh-gradient orb that drifts slowly. Used for section ambiance.
 */
export function GradientOrb({
  className,
  color = 'hsl(var(--mesh-1) / 0.25)',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <motion.div
      aria-hidden
      className={cn('pointer-events-none absolute rounded-full blur-[80px]', className)}
      style={{ background: color }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}
