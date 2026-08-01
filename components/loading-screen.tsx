'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileInfo } from '@/lib/data/profile';

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDone(true);
      onComplete?.();
    }, 1900);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 mesh-bg opacity-60" />
          <div className="relative flex flex-col items-center gap-6">
            {/* Animated monogram */}
            <motion.div
              className="relative flex h-20 w-20 items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl gradient-border"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl glass">
                <span className="font-display text-2xl font-bold text-gradient-primary">
                  {profileInfo.firstName[0]}
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <p className="font-display text-lg font-semibold tracking-tight">
                {profileInfo.name}
              </p>
              <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Portfolio
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="h-[2px] w-40 overflow-hidden rounded-full bg-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary via-chart-2 to-chart-3"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
