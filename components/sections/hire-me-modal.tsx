'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  Mail,
  FileText,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Code2,
  Palette,
  X,
  Download,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Magnetic } from '@/components/interactive/magnetic';
import { cn } from '@/lib/utils';

export type ResumeType = 'uiux' | 'fullstack';

const RESUME_OPTIONS: {
  type: ResumeType;
  label: string;
  description: string;
  pdf: string;
  icon: typeof Palette;
  accent: string;
}[] = [
  {
    type: 'uiux',
    label: 'UI/UX Resume',
    description: 'Frontend · Design · Product thinking',
    pdf: '/resume/Jashmi_KS_UIUX_Resume.pdf',
    icon: Palette,
    accent: 'from-sky-400/20 to-cyan-400/5 text-sky-400',
  },
  {
    type: 'fullstack',
    label: 'Full-Stack Resume',
    description: 'Frontend · Backend · AI & Security',
    pdf: '/resume/Jashmi_KS_FullStack_Resume.pdf',
    icon: Code2,
    accent: 'from-emerald-400/20 to-teal-400/5 text-emerald-400',
  },
];

type Step = 'menu' | 'email-form';
type Status = 'idle' | 'sending' | 'sent' | 'error';

export function HireMeModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = React.useState<Step>('menu');
  const [selected, setSelected] = React.useState<ResumeType | null>(null);
  const [form, setForm] = React.useState({ name: '', email: '' });
  const [status, setStatus] = React.useState<Status>('idle');
  const [error, setError] = React.useState('');
  const [downloadUrl, setDownloadUrl] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState('');

  React.useEffect(() => {
    if (open) {
      setStep('menu');
      setSelected(null);
      setStatus('idle');
      setError('');
      setDownloadUrl(null);
      setSuccessMessage('');
      setForm({ name: '', email: '' });
    }
  }, [open]);

  const handleOpenResume = (type: ResumeType) => {
    // Log the view interaction BEFORE opening the PDF.
    // Fire-and-forget — analytics must never block or delay the user.
    fetch('/api/analytics/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeType: type }),
      keepalive: true,
    }).catch((err) => {
      console.error('[analytics] view tracking failed:', err);
    });

    const opt = RESUME_OPTIONS.find((o) => o.type === type);
    if (opt) window.open(opt.pdf, '_blank', 'noopener,noreferrer');
  };

  const handleSendByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !selected) return;
    setStatus('sending');
    setError('');
    const opt = RESUME_OPTIONS.find((o) => o.type === selected);
    try {
      const res = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          resumeType: selected,
        }),
      });
      const data = await res.json();
      if (!res.ok && !data.downloadUrl) {
        throw new Error(data.error || 'Failed to process resume request.');
      }
      setDownloadUrl(data.downloadUrl || opt?.pdf || null);
      setSuccessMessage(data.message || 'Resume request received!');
      setStatus('sent');
    } catch (err) {
      console.error('[hire-me] send failed:', err);
      // Even if network fails, provide the fallback direct download
      setDownloadUrl(opt?.pdf || null);
      setStatus('error');
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to reach email service. You can download the resume directly below.'
      );
    }
  };

  const selectedOption = RESUME_OPTIONS.find((o) => o.type === selected);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        hideCloseButton
        className="sm:max-w-md border-0 bg-transparent p-0 shadow-none"
      >
        <div className="relative overflow-hidden rounded-3xl gradient-border glass-strong p-6 shadow-lift sm:p-8">
          <div className="noise-overlay absolute inset-0 rounded-3xl" />

          {/* Ambient glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

          {/* Close */}
          <button
            onClick={() => onOpenChange(false)}
            aria-label="Close hire me dialog"
            className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full glass text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative">
            <AnimatePresence mode="wait">
              {step === 'menu' && (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <DialogHeader
                    icon={<Sparkles className="h-5 w-5" />}
                    title="Hire Me"
                    description="Choose how you'd like to receive my resume."
                  />

                  <div className="mt-6 grid gap-3">
                    {RESUME_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <div
                          key={opt.type}
                          className="relative overflow-hidden rounded-2xl border border-border bg-background/50 p-1"
                        >
                          <div className="grid grid-cols-2 gap-1">
                            {/* View */}
                            <button
                              onClick={() => handleOpenResume(opt.type)}
                              className="group flex flex-col items-center gap-2 rounded-xl px-3 py-4 transition-colors hover:bg-accent/10"
                            >
                              <span
                                className={cn(
                                  'flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br',
                                  opt.accent
                                )}
                              >
                                <Eye className="h-5 w-5" />
                              </span>
                              <span className="text-xs font-semibold">
                                View
                              </span>
                              <span className="text-[10px] leading-tight text-muted-foreground">
                                Open PDF
                              </span>
                            </button>
                            {/* Email */}
                            <button
                              onClick={() => {
                                setSelected(opt.type);
                                setStep('email-form');
                              }}
                              className="group flex flex-col items-center gap-2 rounded-xl px-3 py-4 transition-colors hover:bg-accent/10"
                            >
                              <span
                                className={cn(
                                  'flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br',
                                  opt.accent
                                )}
                              >
                                <Mail className="h-5 w-5" />
                              </span>
                              <span className="text-xs font-semibold">
                                Email
                              </span>
                              <span className="text-[10px] leading-tight text-muted-foreground">
                                Send to inbox
                              </span>
                            </button>
                          </div>
                          <div className="flex items-center gap-2 px-4 pb-3">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="text-sm font-semibold leading-tight">
                                {opt.label}
                              </div>
                              <div className="text-[11px] text-muted-foreground">
                                {opt.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 'email-form' && selectedOption && (
                <motion.div
                  key="email-form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <DialogHeader
                    icon={<Mail className="h-5 w-5" />}
                    title={`Get ${selectedOption.label}`}
                    description="Enter your name and email — you can also download the PDF immediately."
                  />

                  {status === 'sent' ? (
                    <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center">
                      <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                      <div>
                        <p className="font-display text-lg font-semibold text-foreground">
                          {successMessage || 'Resume ready!'}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          Thank you, {form.name.trim()}! You can download the {selectedOption.label} directly below.
                        </p>
                      </div>

                      {downloadUrl && (
                        <a
                          href={downloadUrl}
                          download={downloadUrl.split('/').pop()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.02]"
                        >
                          <Download className="h-4 w-4" />
                          Download PDF Now
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setStatus('idle');
                          setStep('menu');
                        }}
                        className="mt-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Back to options
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSendByEmail}
                      className="relative mt-6 space-y-4"
                    >
                      <div>
                        <label
                          htmlFor="hm-name"
                          className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground"
                        >
                          Name
                        </label>
                        <input
                          id="hm-name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm leading-relaxed outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="hm-email"
                          className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground"
                        >
                          Email
                        </label>
                        <input
                          id="hm-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm leading-relaxed outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                          placeholder="you@example.com"
                        />
                      </div>

                      {status === 'error' && (
                        <div className="space-y-3 rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-xs text-destructive">
                          <p>{error}</p>
                          {downloadUrl && (
                            <a
                              href={downloadUrl}
                              download={downloadUrl.split('/').pop()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 font-semibold text-foreground underline underline-offset-4 hover:text-primary"
                            >
                              <Download className="h-3.5 w-3.5" />
                              Download {selectedOption.label} PDF directly
                            </a>
                          )}
                        </div>
                      )}

                      <Magnetic strength={0.3} className="w-full">
                        <button
                          type="submit"
                          disabled={status === 'sending'}
                          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.02] disabled:opacity-70"
                        >
                          {status === 'sending' ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <FileText className="h-4 w-4" />
                              Send resume
                            </>
                          )}
                        </button>
                      </Magnetic>

                      <button
                        type="button"
                        onClick={() => setStep('menu')}
                        className="flex w-full items-center justify-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back to options
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DialogHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-border glass text-primary">
          {icon}
        </span>
        <div>
          <DialogTitle className="font-display text-xl font-bold tracking-tight">
            {title}
          </DialogTitle>
        </div>
      </div>
      <DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </DialogDescription>
    </>
  );
}

