'use client';

import { trpc } from '@/lib/trpc-client';

export function UsersExample() {
  const { data: users, isLoading, error } = trpc.users.getAll.useQuery();
  const createUser = trpc.users.create.useMutation();
  const utils = trpc.useUtils();

  const handleCreateUser = async () => {
    try {
      await createUser.mutateAsync({
        email: `user${Date.now()}@example.com`,
        name: `User ${Date.now()}`,
      });
      // Refetch users after creating
      utils.users.getAll.invalidate();
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Users</h2>
      <button onClick={handleCreateUser} disabled={createUser.isPending}>
        {createUser.isPending ? 'Creating...' : 'Create User'}
      </button>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}) - {user.events.length} events
          </li>
        ))}
      </ul>
    </div>
  );
}
