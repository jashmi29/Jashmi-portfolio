import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta' });

const siteTitle = 'Jashmi KS — Frontend Engineer & Full-Stack Developer';
const siteDescription =
  'Portfolio of Jashmi KS — Frontend Engineer, Full-Stack Developer, UI/UX Designer, and athlete. Crafting premium digital experiences with motion, depth, and intention.';

export const metadata: Metadata = {
  metadataBase: new URL('https://jashmi.dev'),
  title: {
    default: siteTitle,
    template: '%s | Jashmi KS',
  },
  description: siteDescription,
  applicationName: 'Jashmi KS Portfolio',
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#050816' }],
  keywords: [
    'Frontend Engineer',
    'Full-Stack Developer',
    'UI UX Design',
    'Motion Design',
    'Portfolio',
    'React',
    'Next.js',
    'TypeScript',
  ],
  authors: [{ name: 'Jashmi KS' }],
  creator: 'Jashmi KS',
  publisher: 'Jashmi KS',
  alternates: {
    canonical: 'https://jashmi.dev',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: 'website',
    url: 'https://jashmi.dev',
    siteName: 'Jashmi KS Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    creator: '@jashmi29',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} ${plusJakarta.variable}`}>
      <head>
        <meta name="robots" content="index,follow" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`font-body ${inter.className}`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
