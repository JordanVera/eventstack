# tRPC API Documentation

This document describes the tRPC API endpoints available in the web application.

## Setup

The tRPC API is configured with:
- Server-side router in `/lib/routers/`
- Client-side configuration in `/lib/trpc-client.ts`
- Next.js API route handler in `/app/api/trpc/[trpc]/route.ts`

## Users API

### `users.getAll`
- **Type**: Query
- **Description**: Get all users with their events
- **Returns**: Array of users with events included

### `users.getById`
- **Type**: Query
- **Input**: `{ id: number }`
- **Description**: Get a specific user by ID
- **Returns**: User with events included

### `users.create`
- **Type**: Mutation
- **Input**: `{ email: string, name?: string }`
- **Description**: Create a new user
- **Returns**: Created user with events included

### `users.update`
- **Type**: Mutation
- **Input**: `{ id: number, email?: string, name?: string }`
- **Description**: Update an existing user
- **Returns**: Updated user with events included

### `users.delete`
- **Type**: Mutation
- **Input**: `{ id: number }`
- **Description**: Delete a user (cascades to their events)
- **Returns**: Deleted user

## Events API

### `events.getAll`
- **Type**: Query
- **Description**: Get all events with their users
- **Returns**: Array of events with user included

### `events.getByUserId`
- **Type**: Query
- **Input**: `{ userId: number }`
- **Description**: Get all events for a specific user
- **Returns**: Array of events with user included

### `events.getById`
- **Type**: Query
- **Input**: `{ id: string }`
- **Description**: Get a specific event by ID
- **Returns**: Event with user included

### `events.create`
- **Type**: Mutation
- **Input**: `{ title: string, description?: string, startDate: Date, endDate: Date, userId: number }`
- **Description**: Create a new event
- **Returns**: Created event with user included

### `events.update`
- **Type**: Mutation
- **Input**: `{ id: string, title?: string, description?: string, startDate?: Date, endDate?: Date, userId?: number }`
- **Description**: Update an existing event
- **Returns**: Updated event with user included

### `events.delete`
- **Type**: Mutation
- **Input**: `{ id: string }`
- **Description**: Delete an event
- **Returns**: Deleted event

## Usage Example

```tsx
import { trpc } from '../lib/trpc-client';

function MyComponent() {
  // Query example
  const { data: users, isLoading } = trpc.users.getAll.useQuery();
  
  // Mutation example
  const createUser = trpc.users.create.useMutation();
  
  const handleCreate = async () => {
    await createUser.mutateAsync({
      email: 'user@example.com',
      name: 'John Doe'
    });
  };
  
  return (
    <div>
      {isLoading ? 'Loading...' : users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={handleCreate}>Create User</button>
    </div>
  );
}
```

## Type Safety

All endpoints are fully typed with TypeScript. The `AppRouter` type is exported from `/lib/routers/index.ts` and provides full type safety for all API calls.
