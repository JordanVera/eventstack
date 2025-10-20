'use client';

import { trpc } from '../lib/trpc-client';
import { useState } from 'react';

export function EventsExample() {
  const { data: events, isLoading, error } = trpc.events.getAll.useQuery();
  const createEvent = trpc.events.create.useMutation();
  const utils = trpc.useUtils();
  const [selectedUserId, setSelectedUserId] = useState<number>(1);

  const handleCreateEvent = async () => {
    try {
      await createEvent.mutateAsync({
        title: `Event ${Date.now()}`,
        description: 'A sample event',
        startDate: new Date(),
        endDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours later
        userId: selectedUserId,
      });
      // Refetch events after creating
      utils.events.getAll.invalidate();
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  if (isLoading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Events</h2>
      <div>
        <label>
          User ID:
          <input
            type="number"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(Number(e.target.value))}
          />
        </label>
      </div>
      <button onClick={handleCreateEvent} disabled={createEvent.isPending}>
        {createEvent.isPending ? 'Creating...' : 'Create Event'}
      </button>
      <ul>
        {events?.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> - {event.user.name}
            <br />
            <small>
              {event.startDate.toLocaleString()} - {event.endDate.toLocaleString()}
            </small>
            {event.description && <p>{event.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
