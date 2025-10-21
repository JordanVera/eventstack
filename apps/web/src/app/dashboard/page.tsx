import { requireAuth } from '@/lib/auth-helpers';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await requireAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/10">
          <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
          <p className="text-gray-300 mb-6">
            Welcome back,{' '}
            <span className="text-blue-400 font-semibold">
              {session.user.name || session.user.email}
            </span>
            !
          </p>

          <div className="bg-white/10 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-3">Your Session Info</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-400">Email:</span> {session.user.email}
              </p>
              <p>
                <span className="text-gray-400">Name:</span> {session.user.name || 'Not set'}
              </p>
              <p>
                <span className="text-gray-400">User ID:</span> {session.user.id}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
