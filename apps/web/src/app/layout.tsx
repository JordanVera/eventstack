import { TRPCProvider } from '@/lib/trpc-provider';
import SessionProvider from '@/components/SessionProvider';
import Header from '@/components/Header';
import '@/styles/global.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
          <TRPCProvider>
            <Header />
            <main className="flex-1">{children}</main>
          </TRPCProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
