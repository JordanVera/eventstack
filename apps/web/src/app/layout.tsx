import { TRPCProvider } from '@/lib/trpc-provider';
import SessionProvider from '@/components/SessionProvider';
import Header from '@/components/Header';
import '@/styles/global.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-black text-white">
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
