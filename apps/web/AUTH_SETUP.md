# Authentication Setup

This application uses **NextAuth.js v5 (beta)** for authentication with credentials-based login.

## Features

- ✅ **Login** and **Signup** pages with sleek UI
- ✅ **Credentials-based authentication** (email/password)
- ✅ **Prisma database adapter** for user storage
- ✅ **bcryptjs** for password hashing
- ✅ **Session management** with JWT strategy
- ✅ **Protected routes** via middleware
- ✅ **User status in Header** with sign out functionality

## Pages

- `/login` - Login page
- `/signup` - Signup page

## API Routes

- `/api/auth/[...nextauth]` - NextAuth handler
- `/api/auth/signup` - User registration endpoint

## Configuration

### Environment Variables

**REQUIRED:** Create a `.env.local` file in `/apps/web/` directory:

```env
# Database - Update with your MySQL credentials
DATABASE_URL="mysql://user:password@localhost:3306/event_stack"

# NextAuth Configuration (REQUIRED)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

**Quick Setup Command:**

```bash
cd apps/web
echo 'DATABASE_URL="mysql://user:password@localhost:3306/event_stack"' > .env.local
echo 'NEXTAUTH_URL="http://localhost:3000"' >> .env.local
echo "NEXTAUTH_SECRET=\"$(openssl rand -base64 32)\"" >> .env.local
```

Or manually generate a secure secret:

```bash
openssl rand -base64 32
```

### Database Schema

The following models are set up in Prisma:

- `User` - User accounts with email/password
- `Account` - OAuth accounts (for future OAuth providers)
- `Session` - User sessions
- `VerificationToken` - Email verification tokens

**Important Note about the Account Model:**

When using **credentials-based authentication** (email/password), only the `User` model is created in the database. The `Account` model is **only used for OAuth providers** (Google, GitHub, etc.). This is expected behavior - if you don't see an `Account` record when signing up with email/password, that's completely normal! The `Account` table will only be populated when you add OAuth providers in the future.

## Usage

### Protecting Routes

Edit `/apps/web/src/middleware.ts` to protect specific routes:

```typescript
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/login', req.url));
  }
});
```

### Getting Session Data

```typescript
import { useSession } from "next-auth/react";

function Component() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Not authenticated</div>;

  return <div>Welcome {session.user.name}!</div>;
}
```

### Server-Side Session

```typescript
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <div>Protected content</div>;
}
```

## How It Works

1. **Signup**: Users register with name, email, and password. Password is hashed with bcryptjs before storage.
2. **Login**: Credentials are verified against the database, and a JWT session is created.
3. **Session**: JWT tokens are stored in HTTP-only cookies for security.
4. **Sign Out**: Session is cleared and user is redirected.

## Extending Authentication

### Adding OAuth Providers

To add Google, GitHub, or other OAuth providers:

```typescript
// In /apps/web/src/lib/auth.ts
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      /* ... */
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
});
```

## Security Notes

- Passwords are hashed using bcryptjs (10 salt rounds)
- Sessions use JWT strategy with HTTP-only cookies
- NEXTAUTH_SECRET is required in production
- Use HTTPS in production for secure cookies
