import { TRPCProvider } from '@/lib/trpc-provider';
import SessionProvider from '@/components/SessionProvider';
import Header from '@/components/Header';
import '@/styles/global.css';
import { Poppins, Inter } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="bg-black text-white">
        <SessionProvider>
          <TRPCProvider>
            <Header />
            <main className="mx-auto">{children}</main>
          </TRPCProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
