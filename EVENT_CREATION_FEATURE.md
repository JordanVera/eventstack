# Event Creation Feature - Posh-Style

This document describes the comprehensive event creation feature built to resemble Posh.vip's event creation flow.

## Overview

The event creation system includes:

- A comprehensive form UI matching Posh's dark theme and layout
- Rich text editing for descriptions
- Ticket management with advanced settings
- Modal dialogs for detailed inputs
- Full database schema support
- tRPC API integration
- Authentication protection

## Database Schema

### Event Model

The `Event` model includes:

- **Basic Info**: title, shortSummary, description
- **Dates**: startDate, endDate, timezone, isRecurringSeries
- **Location**: location, venueName
- **Features**: guestlist, event features, YouTube video, image gallery
- **Settings**: showOnExplore, passwordProtected
- **Relations**: user (creator), tickets (array)

### Ticket Model

The `Ticket` model includes:

- **Basic Info**: name, description, pricing
- **Inventory**: quantity (unlimited or limited)
- **Sales Period**: optional date range for when tickets can be purchased
- **Validity Period**: optional date range for when tickets are valid for entry
- **Purchase Limits**: min/max quantity per transaction

## Components Created

### 1. Rich Text Editor (`/components/ui/rich-text-editor.tsx`)

- Built with Tiptap
- Supports: headings, bold, italic, links, bullet lists
- Toolbar with formatting options
- Dark theme styling

### 2. Date-Time Picker (`/components/ui/date-time-picker.tsx`)

- Date selection with calendar popup
- Time input field
- Uses date-fns for formatting
- Dark theme styling

### 3. Description Modal (`/components/DescriptionModal.tsx`)

- Full-screen modal for rich text editing
- Used for both event description and short summary
- Save/cancel actions

### 4. Ticket Modal (`/components/TicketModal.tsx`)

- Comprehensive ticket creation form
- Includes:
  - Name and pricing (gross/display)
  - Quantity management (unlimited or limited)
  - Rich text description
  - Advanced settings:
    - Limit Sales Period
    - Limit Ticket Validity
    - Limit Purchase Quantity
  - "More settings" toggle for advanced features

### 5. Create Event Page (`/app/events/create/page.tsx`)

- Main event creation form
- Sections:
  - **Tabs**: Sell Tickets / RSVP
  - **Event Name**: Large editable title
  - **Dates**: Start/end with timezone, recurring series option
  - **Event Details**: Description, location, venue name
  - **Tickets**: List of tickets with add/edit functionality
  - **Features**: Guestlist, Event Features, YouTube Video, Image Gallery
  - **Page Settings**: Show on Explore, Password Protection
- Integrates with tRPC for data submission
- Protected by authentication middleware

## API Routes

### tRPC Events Router (`/lib/routers/events.ts`)

Updated with comprehensive event creation:

```typescript
create: {
  input: {
    // All event fields
    // Array of tickets with full settings
  },
  output: Event with tickets and user relations
}
```

Also supports:

- `getAll`: Get all events with tickets
- `getById`: Get single event with details
- `getByUserId`: Get user's events
- `update`: Update event details
- `delete`: Delete event

## Middleware Protection

The `/events/create` route is protected by authentication middleware. Users must be logged in to access the create event page.

## Setup Instructions

### 1. Run Database Migration

```bash
cd packages/database
npx prisma migrate dev --name add_comprehensive_event_fields
npx prisma generate
```

### 2. Start Development Server

```bash
cd apps/web
npm run dev
```

### 3. Access the Page

Navigate to: `http://localhost:3000/events/create`

Note: You must be logged in to access this page.

## Usage

1. **Log in** to your account
2. Navigate to `/events/create`
3. Fill in event details:
   - Event name (required)
   - Optional: Short summary (click button to open modal)
   - Dates and time with timezone
   - Description (click "Add Description" to open rich text editor)
   - Location and venue details
4. Manage tickets:
   - Edit the default ticket or add new tickets
   - Set pricing, quantity, and advanced settings
   - Each ticket can have its own sales/validity periods
5. Toggle optional features:
   - Guestlist
   - Event Features
   - YouTube Video
   - Image Gallery
6. Configure page settings:
   - Show on Explore (public visibility)
   - Password Protection
7. Click "Create Event" to save

## Styling

The entire interface uses:

- **Dark theme** with black background
- **Gray tones** for UI elements (gray-800, gray-900)
- **White text** for primary content
- **Rounded elements** matching Posh's design
- **Shadcn UI components** for consistency
- **Lucide React icons** for visual elements

## Future Enhancements

Potential additions:

- Image upload integration (currently URL-based)
- Recurring event rules (daily, weekly, monthly)
- Ticket analytics dashboard
- Email notifications
- QR code generation for tickets
- Attendee management
- Event duplication
- Draft saving

## Technologies Used

- **Next.js 14** - App Router
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **tRPC** - Type-safe API
- **NextAuth.js** - Authentication
- **Tiptap** - Rich text editing
- **date-fns** - Date manipulation
- **Shadcn UI** - Component library
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hook Form** - Form handling (ready for integration)
- **Zod** - Schema validation

## Notes

- The form currently saves to the database via tRPC mutation
- All fields are properly validated with Zod schemas
- The page is responsive but optimized for desktop (matching Posh)
- Session management ensures only authenticated users can create events
- Tickets are created as nested relations with the event
