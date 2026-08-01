'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ArrowUp,
  Loader2,
  AlertCircle,
  Briefcase,
  Building2,
  Tag,
} from 'lucide-react';
import { SectionWrapper } from '@/components/section-heading';
import { Reveal, TextReveal } from '@/components/interactive/reveal';
import { Magnetic } from '@/components/interactive/magnetic';
import { GradientOrb, Particles } from '@/components/interactive/ambient';
import { contactInfo, profileInfo } from '@/lib/data/profile';
import { HireMeModal } from '@/components/sections/hire-me-modal';
import { cn } from '@/lib/utils';

const SOCIAL_ICONS = { github: Github, linkedin: Linkedin, mail: Mail } as const;

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  const [status, setStatus] = React.useState<Status>('idle');
  const [error, setError] = React.useState('');
  const [hireMeOpen, setHireMeOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    company: '',
    role: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          role: form.role.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message.');
      setStatus('sent');
      setForm({
        name: '',
        email: '',
        company: '',
        role: '',
        subject: '',
        message: '',
      });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('[contact] submit failed:', err);
      setStatus('error');
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <SectionWrapper id="contact" className="relative overflow-hidden">
      {/* Dramatic lighting */}
      <GradientOrb className="left-1/4 top-0 h-96 w-96" color="hsl(var(--mesh-1) / 0.2)" />
      <GradientOrb className="right-1/4 bottom-0 h-96 w-96" color="hsl(var(--mesh-3) / 0.18)" />
      <Particles count={16} />

      <div className="relative grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        {/* Left: oversized typography + info */}
        <div className="flex flex-col gap-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Available for work
            </span>
          </Reveal>

          <h2 className="max-w-3xl font-display text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-[5rem]">
            <TextReveal text="Let's build" />
            <br />
            <span className="text-gradient-primary">
              <TextReveal text="something" delay={0.15} />
            </span>{' '}
            <TextReveal text="alive." delay={0.3} />
          </h2>

          <Reveal delay={0.2}>
            <p className="max-w-lg text-lg leading-[1.8] text-muted-foreground">
              I’m open to internships, freelance frontend work, and collaborations on
              products that care about craft. If that sounds like you, the form works —
              or reach me directly.
            </p>
          </Reveal>

          {/* Contact details */}
          <Reveal delay={0.3}>
            <div className="space-y-4">
              <a
                href={`mailto:${contactInfo.email}`}
                className="group flex items-center gap-3 text-sm font-medium leading-relaxed transition-colors hover:text-primary"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl glass">
                  <Mail className="h-4 w-4" />
                </span>
                {contactInfo.email}
              </a>
              <div className="flex items-center gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl glass">
                  <MapPin className="h-4 w-4" />
                </span>
                {contactInfo.location}
              </div>
            </div>
          </Reveal>

          {/* Hire Me — premium modal trigger */}
          <Reveal delay={0.35}>
            <div className="space-y-3">
              <Magnetic strength={0.4}>
                <button
                  onClick={() => setHireMeOpen(true)}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent px-6 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_-6px_hsl(var(--primary))]"
                >
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute -inset-x-8 -top-1/2 h-32 w-5 -translate-x-20 rotate-12 bg-white/10 transition-transform duration-500 group-hover:translate-x-40" />
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/30">
                    <Briefcase className="h-4 w-4" />
                  </span>
                  <span className="relative flex flex-col items-start">
                    <span className="text-base font-bold">Hire Me</span>
                    <span className="text-xs font-normal text-muted-foreground/80">
                      View or get my resume
                    </span>
                  </span>
                </button>
              </Magnetic>
              <p className="pl-1 text-xs leading-relaxed text-muted-foreground/60">
                Choose a UI/UX or Full-Stack resume — view it now or have it emailed to you.
              </p>
            </div>
          </Reveal>

          {/* Socials */}
          <Reveal delay={0.4}>
            <div className="flex gap-3">
              {contactInfo.socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon as keyof typeof SOCIAL_ICONS] ?? Mail;
                return (
                  <Magnetic key={s.label} strength={0.4}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl glass text-muted-foreground transition-all hover:scale-110 hover:text-primary"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </Magnetic>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Right: contact form */}
        <Reveal delay={0.2}>
          <div className="relative rounded-3xl gradient-border glass-strong p-6 shadow-lift sm:p-8">
            <div className="noise-overlay absolute inset-0 rounded-3xl" />
            <form onSubmit={handleSubmit} className="relative space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm leading-relaxed outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm leading-relaxed outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="company" className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    <Building2 className="h-3 w-3" /> Company <span className="font-normal normal-case text-muted-foreground/60">(optional)</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm leading-relaxed outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Acme Inc."
                  />
                </div>
                <div>
                  <label htmlFor="role" className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    <Briefcase className="h-3 w-3" /> Role <span className="font-normal normal-case text-muted-foreground/60">(optional)</span>
                  </label>
                  <input
                    id="role"
                    type="text"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm leading-relaxed outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Hiring Manager"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  <Tag className="h-3 w-3" /> Subject <span className="font-normal normal-case text-muted-foreground/60">(optional)</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm leading-relaxed outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Internship opportunity"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3 text-sm leading-relaxed outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell me about your project..."
                />
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Magnetic strength={0.3}>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.02] disabled:opacity-70"
                >
                  <AnimatePresence mode="wait">
                    {status === 'idle' && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2"
                      >
                        Send message <Send className="h-4 w-4" />
                      </motion.span>
                    )}
                    {status === 'sending' && (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </motion.span>
                    )}
                    {status === 'sent' && (
                      <motion.span
                        key="sent"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4" /> Message sent!
                      </motion.span>
                    )}
                    {status === 'error' && (
                      <motion.span
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-destructive"
                      >
                        <AlertCircle className="h-4 w-4" /> Try again
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </Magnetic>
            </form>
          </div>
        </Reveal>
      </div>

      {/* Hire Me modal */}
      <HireMeModal open={hireMeOpen} onOpenChange={setHireMeOpen} />

      {/* Elegant finishing transition */}
      <Reveal delay={0.2}>
        <div className="mt-24 flex flex-col items-center gap-6 border-t border-border pt-12 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full glass transition-transform group-hover:-translate-y-1">
              <ArrowUp className="h-5 w-5" />
            </span>
            <span className="text-xs uppercase tracking-[0.2em]">Back to top</span>
          </button>
          <p className="font-display text-sm leading-relaxed text-muted-foreground">
            {profileInfo.name} · Crafted with intention · {new Date().getFullYear()}
          </p>
        </div>
      </Reveal>
    </SectionWrapper>
  );
}

