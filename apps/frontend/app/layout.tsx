import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Narratica - Craft Your Worlds',
  description:
    'A storytelling platform for worldbuilders, writers, and creatives to bring their narratives to life.',
  keywords: [
    'writing',
    'storytelling',
    'worldbuilding',
    'fantasy',
    'sci-fi',
    'authors',
    'creative writing',
    'novels',
    'interactive fiction',
    'lore',
  ],
  applicationName: 'Narratica',
  creator: 'Braxton Jones',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Narratica - Craft Your Worlds',
    description:
      'A storytelling platform for worldbuilders, writers, and creatives to bring their narratives to life.',
    type: 'website',
    url: 'https://narratica.app',
    images: [
      {
        url: 'https://narratica.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Narratica - Craft Your Worlds',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Narratica - Craft Your Worlds',
    description:
      'A storytelling platform for worldbuilders, writers, and creatives to bring their narratives to life.',
    images: ['https://narratica.app/og-image.png'],
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} antialiased flex flex-col h-dvh overflow-x-hidden`}>
        <Toaster position="bottom-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
