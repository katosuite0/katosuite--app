import './globals.css';
import { type ReactNode } from 'react';

export const metadata = {
  title: {
    template: '%s | KatoSuite',
    default: 'KatoSuite – AI lesson planning for educators'
  },
  description:
    'KatoSuite helps teachers design inclusive, data-driven lessons in minutes with AI-powered planning and automated compliance checks.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
