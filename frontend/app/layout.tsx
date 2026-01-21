import { ReactNode } from 'react';
import './globals.css';

// This is a root layout that will be used by Next.js
// The actual locale-specific layout is in app/[locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
