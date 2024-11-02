'use client';

import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '@/components/Welcome/Welcome';
import { Header } from '@/components/Header/Header';

export default function HomePage() {
  return (
    <>
      <Header />
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
