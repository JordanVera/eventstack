# Database Package

This package contains the Prisma database configuration and client for the event-stack project.

## Setup

1. **Configure your MySQL database connection** in `.env`:
   ```
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
   ```

2. **Run database migrations**:
   ```bash
   npm run db:migrate
   ```

3. **Generate Prisma client**:
   ```bash
   npm run db:generate
   ```

## Available Scripts

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Run database seeding

## Usage

Import the Prisma client in your application:

```typescript
import { prisma } from '@repo/database'

// Example usage
const users = await prisma.user.findMany()
```

## Models

Currently defined models:
- `User` - Basic user model with id, email, name, and timestamps

You can add more models in `prisma/schema.prisma` and run migrations to update your database schema.
