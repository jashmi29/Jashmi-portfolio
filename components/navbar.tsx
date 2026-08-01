'use client';

import * as React from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/interactive/theme-toggle';
import { Magnetic } from '@/components/interactive/magnetic';
import {
  useActiveSection,
  useScrollDirection,
  useScrollProgress,
} from '@/hooks/use-scroll';
import { profileInfo } from '@/lib/data/profile';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'sports', label: 'Sports' },
  { id: 'design', label: 'Design' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'journey', label: 'Journey' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'contact', label: 'Contact' },
];

const SECTION_IDS = NAV_ITEMS.map((n) => n.id);

export function Navbar() {
  const active = useActiveSection(SECTION_IDS);
  const { hidden } = useScrollDirection(100);
  const progress = useScrollProgress();
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary via-chart-2 to-chart-3"
        style={{ scaleX: progressX }}
      />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: hidden && !mobileOpen ? -120 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-3 z-50 flex justify-center px-4"
      >
        <div
          className={cn(
            'relative flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-500',
            scrolled ? 'glass-strong shadow-lift' : 'glass'
          )}
        >
          {/* Brand */}
          <button
            onClick={() => handleNav('home')}
            className="group mr-1 flex items-center gap-2 rounded-full px-3 py-1.5"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 font-display text-sm font-bold text-primary transition-transform group-hover:scale-110">
              {profileInfo.firstName[0]}
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
              {profileInfo.name}
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-sm font-medium leading-none transition-colors',
                    isActive
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mx-1 hidden h-6 w-px bg-border lg:block" />

          <ThemeToggle className="shrink-0" />

          <Magnetic strength={0.4} className="hidden sm:block">
            <button
              onClick={() => handleNav('contact')}
              className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold leading-none text-background transition-transform hover:scale-[1.03]"
            >
              Let’s talk
            </button>
          </Magnetic>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full glass lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-4 top-20 rounded-3xl glass-strong p-4 shadow-lift"
            >
              <div className="grid grid-cols-2 gap-2">
                {NAV_ITEMS.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleNav(item.id)}
                    className={cn(
                      'rounded-2xl px-4 py-3 text-left text-sm font-medium leading-snug transition-colors',
                      active === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'glass hover:bg-accent/10'
                    )}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
