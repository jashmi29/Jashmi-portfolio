'use client';

import * as React from 'react';
import { LoadingScreen } from '@/components/loading-screen';
import { Navbar } from '@/components/navbar';
import { AmbientLight } from '@/components/interactive/ambient';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Projects } from '@/components/sections/projects';
import { Sports } from '@/components/sections/sports';
import { DesignVisuals } from '@/components/sections/design-visuals';
import { Certificates } from '@/components/sections/certificates';
import { Journey } from '@/components/sections/journey';
import { Leadership } from '@/components/sections/leadership';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  return (
    <>
      <LoadingScreen />

      {/* Global noise texture overlay */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[2]" />

      {/* Cursor-reactive ambient lighting */}
      <AmbientLight />

      <Navbar />

      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Sports />
        <DesignVisuals />
        <Certificates />
        <Journey />
        <Leadership />
        <Contact />
      </main>
    </>
  );
}
