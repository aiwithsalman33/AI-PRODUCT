import type { Metadata } from 'next';
import { ToastProvider } from '@/lib/toast-context';
import { ToastContainer } from '@/components/Toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Product Content Automation',
  description: 'Manage and automate AI-generated product content',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}
