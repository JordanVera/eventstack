import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Sample data for seeding
const sampleUsers = [
  { name: 'Jordan Vera', email: 'vera.jojo96@gmail.com', password: '123123' },
  { name: 'John Doe', email: 'john.doe@example.com', password: '123123' },
  { name: 'Jane Smith', email: 'jane.smith@example.com', password: '123123' },
  {
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    password: '123123',
  },
  {
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    password: '123123',
  },
  { name: 'David Brown', email: 'david.brown@example.com', password: '123123' },
  { name: 'Emily Davis', email: 'emily.davis@example.com', password: '123123' },
  {
    name: 'Chris Miller',
    email: 'chris.miller@example.com',
    password: '123123',
  },
  { name: 'Lisa Garcia', email: 'lisa.garcia@example.com', password: '123123' },
  {
    name: 'Tom Anderson',
    email: 'tom.anderson@example.com',
    password: '123123',
  },
  { name: 'Amy Taylor', email: 'amy.taylor@example.com', password: '123123' },
];

const sampleEvents = [
  {
    title: 'Tech Conference 2024',
    shortSummary: 'Annual tech conference with latest innovations',
    description:
      'Annual technology conference featuring the latest innovations in software development, AI, and cloud computing. Join industry leaders for keynotes, workshops, and networking.',
    startDate: new Date('2024-06-15T09:00:00Z'),
    endDate: new Date('2024-06-17T17:00:00Z'),
    timezone: 'GMT -5',
    isRecurringSeries: false,
    location: 'San Francisco Convention Center',
    venueName: 'Moscone Center',
    guestlistEnabled: true,
    eventFeaturesEnabled: true,
    youtubeVideoEnabled: true,
    youtubeVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    flyerImageUrl:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=500&fit=crop',
    imageGalleryEnabled: true,
    imageGalleryUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
    ]),
    showOnExplore: true,
    isPasswordProtected: false,
    eventPassword: null,
  },
  {
    title: 'Music Festival Summer',
    shortSummary: 'Three-day outdoor music festival',
    description:
      'Three-day outdoor music festival featuring indie, rock, and electronic artists. Experience amazing performances under the stars.',
    startDate: new Date('2024-07-20T14:00:00Z'),
    endDate: new Date('2024-07-22T23:00:00Z'),
    timezone: 'GMT -5',
    isRecurringSeries: true,
    location: 'Central Park, New York',
    venueName: 'Central Park Great Lawn',
    guestlistEnabled: true,
    eventFeaturesEnabled: true,
    youtubeVideoEnabled: false,
    youtubeVideoUrl: null,
    flyerImageUrl:
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=500&fit=crop',
    imageGalleryEnabled: true,
    imageGalleryUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
    ]),
    showOnExplore: true,
    isPasswordProtected: false,
    eventPassword: null,
  },
  {
    title: 'React Workshop',
    shortSummary: 'Hands-on React development workshop',
    description:
      'Hands-on workshop covering advanced React patterns, hooks, and performance optimization. Perfect for developers looking to level up their React skills.',
    startDate: new Date('2024-05-10T10:00:00Z'),
    endDate: new Date('2024-05-10T16:00:00Z'),
    timezone: 'GMT -5',
    isRecurringSeries: false,
    location: 'Tech Hub Downtown',
    venueName: 'Innovation Lab',
    guestlistEnabled: false,
    eventFeaturesEnabled: true,
    youtubeVideoEnabled: true,
    youtubeVideoUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0',
    flyerImageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=500&fit=crop',
    imageGalleryEnabled: false,
    imageGalleryUrls: null,
    showOnExplore: true,
    isPasswordProtected: true,
    eventPassword: 'react2024',
  },
  {
    title: 'Startup Meetup',
    shortSummary: 'Networking for entrepreneurs and investors',
    description:
      'Networking event for entrepreneurs, investors, and startup enthusiasts. Connect with like-minded individuals and potential collaborators.',
    startDate: new Date('2024-04-25T18:00:00Z'),
    endDate: new Date('2024-04-25T21:00:00Z'),
    timezone: 'GMT -5',
    isRecurringSeries: true,
    location: 'WeWork Office',
    venueName: 'WeWork Innovation Space',
    guestlistEnabled: true,
    eventFeaturesEnabled: false,
    youtubeVideoEnabled: false,
    youtubeVideoUrl: null,
    flyerImageUrl:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop',
    imageGalleryEnabled: false,
    imageGalleryUrls: null,
    showOnExplore: true,
    isPasswordProtected: false,
    eventPassword: null,
  },
  {
    title: 'Data Science Seminar',
    shortSummary: 'Expert-led ML and data analysis seminar',
    description:
      'Expert-led seminar on machine learning, data visualization, and statistical analysis. Learn from industry professionals.',
    startDate: new Date('2024-08-05T13:00:00Z'),
    endDate: new Date('2024-08-05T17:00:00Z'),
    timezone: 'GMT -5',
    isRecurringSeries: false,
    location: 'University Campus',
    venueName: 'Computer Science Building',
    guestlistEnabled: false,
    eventFeaturesEnabled: true,
    youtubeVideoEnabled: true,
    youtubeVideoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk',
    flyerImageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=500&fit=crop',
    imageGalleryEnabled: true,
    imageGalleryUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    ]),
    showOnExplore: true,
    isPasswordProtected: false,
    eventPassword: null,
  },
  {
    title: 'Design Thinking Workshop',
    shortSummary: 'Interactive UX design workshop',
    description:
      'Interactive workshop on user-centered design methodologies and prototyping. Perfect for designers and product managers.',
    startDate: new Date('2024-06-30T09:30:00Z'),
    endDate: new Date('2024-06-30T15:30:00Z'),
    timezone: 'GMT -5',
    isRecurringSeries: false,
    location: 'Design Studio',
    venueName: 'Creative Hub',
    guestlistEnabled: true,
    eventFeaturesEnabled: true,
    youtubeVideoEnabled: false,
    youtubeVideoUrl: null,
    flyerImageUrl:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=500&fit=crop',
    imageGalleryEnabled: true,
    imageGalleryUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800',
    ]),
    showOnExplore: true,
    isPasswordProtected: false,
    eventPassword: null,
  },
  {
    title: 'Blockchain Conference',
    shortSummary: 'Exploring Web3 and DeFi applications',
    description:
      'Exploring the future of blockchain technology, DeFi, and Web3 applications. Join crypto enthusiasts and developers.',
    startDate: new Date('2024-09-12T08:00:00Z'),
    endDate: new Date('2024-09-13T18:00:00Z'),
    timezone: 'GMT -5',
    isRecurringSeries: false,
    location: 'Crypto Convention Center',
    venueName: 'Blockchain Hub',
    guestlistEnabled: true,
    eventFeaturesEnabled: true,
    youtubeVideoEnabled: true,
    youtubeVideoUrl: 'https://www.youtube.com/watch?v=SSo_EIwHSd4',
    flyerImageUrl:
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=500&fit=crop',
    imageGalleryEnabled: true,
    imageGalleryUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
      'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800',
    ]),
    showOnExplore: true,
    isPasswordProtected: false,
    eventPassword: null,
  },
  {
    title: 'Mobile App Development',
    shortSummary: 'Cross-platform mobile app course',
    description:
      'Comprehensive course on building cross-platform mobile applications. Learn React Native, Flutter, and native development.',
    startDate: new Date('2024-05-20T10:00:00Z'),
    endDate: new Date('2024-05-22T16:00:00Z'),
    timezone: 'GMT -5',
    isRecurringSeries: false,
    location: 'Tech Academy',
    venueName: 'Mobile Development Lab',
    guestlistEnabled: false,
    eventFeaturesEnabled: true,
    youtubeVideoEnabled: true,
    youtubeVideoUrl: 'https://www.youtube.com/watch?v=0-S5a0eXPoc',
    flyerImageUrl:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=500&fit=crop',
    imageGalleryEnabled: false,
    imageGalleryUrls: null,
    showOnExplore: true,
    isPasswordProtected: true,
    eventPassword: 'mobile2024',
  },
  {
    title: 'DevOps Training',
    shortSummary: 'CI/CD and cloud deployment training',
    description:
      'Learn CI/CD pipelines, containerization, and cloud deployment strategies. Hands-on training for DevOps engineers.',
    startDate: new Date('2024-07-08T09:00:00Z'),
    endDate: new Date('2024-07-10T17:00:00Z'),
    timezone: 'GMT -5',
    isRecurringSeries: false,
    location: 'Cloud Computing Center',
    venueName: 'DevOps Lab',
    guestlistEnabled: true,
    eventFeaturesEnabled: true,
    youtubeVideoEnabled: false,
    youtubeVideoUrl: null,
    flyerImageUrl:
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=500&fit=crop',
    imageGalleryEnabled: true,
    imageGalleryUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
    ]),
    showOnExplore: true,
    isPasswordProtected: false,
    eventPassword: null,
  },
  {
    title: 'Product Management Summit',
    shortSummary: 'Industry leaders on product strategy',
    description:
      'Industry leaders discussing product strategy, user research, and market analysis. Essential for product managers.',
    startDate: new Date('2024-08-20T08:30:00Z'),
    endDate: new Date('2024-08-21T17:30:00Z'),
    timezone: 'GMT -5',
    isRecurringSeries: false,
    location: 'Business Center',
    venueName: 'Executive Conference Room',
    guestlistEnabled: true,
    eventFeaturesEnabled: true,
    youtubeVideoEnabled: true,
    youtubeVideoUrl: 'https://www.youtube.com/watch?v=huqFd7O2238',
    flyerImageUrl:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=500&fit=crop',
    imageGalleryEnabled: true,
    imageGalleryUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    ]),
    showOnExplore: true,
    isPasswordProtected: false,
    eventPassword: null,
  },
];

// Sample tickets for events
const sampleTickets = [
  // Tech Conference 2024 tickets
  {
    eventIndex: 0, // Tech Conference 2024
    name: 'Early Bird',
    description: 'Early bird pricing for tech enthusiasts',
    grossPrice: 299.99,
    displayPrice: '$299.99',
    quantity: 100,
    isUnlimited: false,
    limitSalesPeriod: true,
    salesStartDate: new Date('2024-01-01T00:00:00Z'),
    salesEndDate: new Date('2024-03-31T23:59:59Z'),
    limitTicketValidity: false,
    validityStartDate: null,
    validityEndDate: null,
    limitPurchaseQuantity: true,
    minPurchaseQuantity: 1,
    maxPurchaseQuantity: 5,
  },
  {
    eventIndex: 0,
    name: 'Regular Admission',
    description: 'Standard conference admission',
    grossPrice: 399.99,
    displayPrice: '$399.99',
    quantity: 500,
    isUnlimited: false,
    limitSalesPeriod: false,
    salesStartDate: null,
    salesEndDate: null,
    limitTicketValidity: false,
    validityStartDate: null,
    validityEndDate: null,
    limitPurchaseQuantity: true,
    minPurchaseQuantity: 1,
    maxPurchaseQuantity: 10,
  },
  {
    eventIndex: 0,
    name: 'VIP Pass',
    description: 'VIP access with premium amenities',
    grossPrice: 799.99,
    displayPrice: '$799.99',
    quantity: 50,
    isUnlimited: false,
    limitSalesPeriod: false,
    salesStartDate: null,
    salesEndDate: null,
    limitTicketValidity: false,
    validityStartDate: null,
    validityEndDate: null,
    limitPurchaseQuantity: true,
    minPurchaseQuantity: 1,
    maxPurchaseQuantity: 2,
  },

  // Music Festival Summer tickets
  {
    eventIndex: 1,
    name: 'General Admission',
    description: 'Access to all festival areas',
    grossPrice: 149.99,
    displayPrice: '$149.99',
    quantity: 2000,
    isUnlimited: false,
    limitSalesPeriod: true,
    salesStartDate: new Date('2024-02-01T00:00:00Z'),
    salesEndDate: new Date('2024-07-15T23:59:59Z'),
    limitTicketValidity: true,
    validityStartDate: new Date('2024-07-20T14:00:00Z'),
    validityEndDate: new Date('2024-07-22T23:00:00Z'),
    limitPurchaseQuantity: true,
    minPurchaseQuantity: 1,
    maxPurchaseQuantity: 8,
  },
  {
    eventIndex: 1,
    name: 'VIP Experience',
    description: 'Premium viewing areas and amenities',
    grossPrice: 299.99,
    displayPrice: '$299.99',
    quantity: 200,
    isUnlimited: false,
    limitSalesPeriod: true,
    salesStartDate: new Date('2024-02-01T00:00:00Z'),
    salesEndDate: new Date('2024-07-15T23:59:59Z'),
    limitTicketValidity: true,
    validityStartDate: new Date('2024-07-20T14:00:00Z'),
    validityEndDate: new Date('2024-07-22T23:00:00Z'),
    limitPurchaseQuantity: true,
    minPurchaseQuantity: 1,
    maxPurchaseQuantity: 4,
  },

  // React Workshop tickets
  {
    eventIndex: 2,
    name: 'Workshop Access',
    description: 'Full day React workshop with materials',
    grossPrice: 199.99,
    displayPrice: '$199.99',
    quantity: 30,
    isUnlimited: false,
    limitSalesPeriod: true,
    salesStartDate: new Date('2024-01-15T00:00:00Z'),
    salesEndDate: new Date('2024-05-05T23:59:59Z'),
    limitTicketValidity: true,
    validityStartDate: new Date('2024-05-10T10:00:00Z'),
    validityEndDate: new Date('2024-05-10T16:00:00Z'),
    limitPurchaseQuantity: true,
    minPurchaseQuantity: 1,
    maxPurchaseQuantity: 1,
  },

  // Startup Meetup tickets
  {
    eventIndex: 3,
    name: 'Free Admission',
    description: 'Complimentary networking event',
    grossPrice: 0,
    displayPrice: 'Free',
    quantity: null,
    isUnlimited: true,
    limitSalesPeriod: false,
    salesStartDate: null,
    salesEndDate: null,
    limitTicketValidity: false,
    validityStartDate: null,
    validityEndDate: null,
    limitPurchaseQuantity: false,
    minPurchaseQuantity: null,
    maxPurchaseQuantity: null,
  },

  // Data Science Seminar tickets
  {
    eventIndex: 4,
    name: 'Student Rate',
    description: 'Discounted rate for students',
    grossPrice: 49.99,
    displayPrice: '$49.99',
    quantity: 50,
    isUnlimited: false,
    limitSalesPeriod: true,
    salesStartDate: new Date('2024-01-01T00:00:00Z'),
    salesEndDate: new Date('2024-08-01T23:59:59Z'),
    limitTicketValidity: true,
    validityStartDate: new Date('2024-08-05T13:00:00Z'),
    validityEndDate: new Date('2024-08-05T17:00:00Z'),
    limitPurchaseQuantity: true,
    minPurchaseQuantity: 1,
    maxPurchaseQuantity: 1,
  },
  {
    eventIndex: 4,
    name: 'Professional Rate',
    description: 'Standard rate for professionals',
    grossPrice: 99.99,
    displayPrice: '$99.99',
    quantity: 100,
    isUnlimited: false,
    limitSalesPeriod: true,
    salesStartDate: new Date('2024-01-01T00:00:00Z'),
    salesEndDate: new Date('2024-08-01T23:59:59Z'),
    limitTicketValidity: true,
    validityStartDate: new Date('2024-08-05T13:00:00Z'),
    validityEndDate: new Date('2024-08-05T17:00:00Z'),
    limitPurchaseQuantity: true,
    minPurchaseQuantity: 1,
    maxPurchaseQuantity: 3,
  },

  // Design Thinking Workshop tickets
  {
    eventIndex: 5,
    name: 'Workshop Pass',
    description: 'Interactive design workshop access',
    grossPrice: 179.99,
    displayPrice: '$179.99',
    quantity: 25,
    isUnlimited: false,
    limitSalesPeriod: true,
    salesStartDate: new Date('2024-02-01T00:00:00Z'),
    salesEndDate: new Date('2024-06-25T23:59:59Z'),
    limitTicketValidity: true,
    validityStartDate: new Date('2024-06-30T09:30:00Z'),
    validityEndDate: new Date('2024-06-30T15:30:00Z'),
    limitPurchaseQuantity: true,
    minPurchaseQuantity: 1,
    maxPurchaseQuantity: 2,
  },

  // Blockchain Conference tickets
  {
    eventIndex: 6,
    name: 'Conference Pass',
    description: 'Two-day blockchain conference access',
    grossPrice: 499.99,
    displayPrice: '$499.99',
    quantity: 300,
    isUnlimited: false,
    limitSalesPeriod: true,
    salesStartDate: new Date('2024-01-01T00:00:00Z'),
    salesEndDate: new Date('2024-09-10T23:59:59Z'),
    limitTicketValidity: true,
    validityStartDate: new Date('2024-09-12T08:00:00Z'),
    validityEndDate: new Date('2024-09-13T18:00:00Z'),
    limitPurchaseQuantity: true,
    minPurchaseQuantity: 1,
    maxPurchaseQuantity: 5,
  },
  {
    eventIndex: 6,
    name: 'Developer Track',
    description: 'Technical sessions for developers',
    grossPrice: 399.99,
    displayPrice: '$399.99',
    quantity: 150,
    isUnlimited: false,
    limitSalesPeriod: true,
    salesStartDate: new Date('2024-01-01T00:00:00Z'),
    salesEndDate: new Date('2024-09-10T23:59:59Z'),
    limitTicketValidity: true,
    validityStartDate: new Date('2024-09-12T08:00:00Z'),
    validityEndDate: new Date('2024-09-13T18:00:00Z'),
    limitPurchaseQuantity: true,
    minPurchaseQuantity: 1,
    maxPurchaseQuantity: 3,
  },

  // Mobile App Development tickets
  {
    eventIndex: 7,
    name: 'Course Access',
    description: 'Three-day mobile development course',
    grossPrice: 899.99,
    displayPrice: '$899.99',
    quantity: 20,
    isUnlimited: false,
    limitSalesPeriod: true,
    salesStartDate: new Date('2024-01-01T00:00:00Z'),
    salesEndDate: new Date('2024-05-15T23:59:59Z'),
    limitTicketValidity: true,
    validityStartDate: new Date('2024-05-20T10:00:00Z'),
    validityEndDate: new Date('2024-05-22T16:00:00Z'),
    limitPurchaseQuantity: true,
    minPurchaseQuantity: 1,
    maxPurchaseQuantity: 1,
  },

  // DevOps Training tickets
  {
    eventIndex: 8,
    name: 'Training Pass',
    description: 'Three-day DevOps training program',
    grossPrice: 1299.99,
    displayPrice: '$1,299.99',
    quantity: 15,
    isUnlimited: false,
    limitSalesPeriod: true,
    salesStartDate: new Date('2024-01-01T00:00:00Z'),
    salesEndDate: new Date('2024-07-01T23:59:59Z'),
    limitTicketValidity: true,
    validityStartDate: new Date('2024-07-08T09:00:00Z'),
    validityEndDate: new Date('2024-07-10T17:00:00Z'),
    limitPurchaseQuantity: true,
    minPurchaseQuantity: 1,
    maxPurchaseQuantity: 1,
  },

  // Product Management Summit tickets
  {
    eventIndex: 9,
    name: 'Summit Pass',
    description: 'Two-day product management summit',
    grossPrice: 699.99,
    displayPrice: '$699.99',
    quantity: 200,
    isUnlimited: false,
    limitSalesPeriod: true,
    salesStartDate: new Date('2024-01-01T00:00:00Z'),
    salesEndDate: new Date('2024-08-15T23:59:59Z'),
    limitTicketValidity: true,
    validityStartDate: new Date('2024-08-20T08:30:00Z'),
    validityEndDate: new Date('2024-08-21T17:30:00Z'),
    limitPurchaseQuantity: true,
    minPurchaseQuantity: 1,
    maxPurchaseQuantity: 3,
  },
  {
    eventIndex: 9,
    name: 'Executive Pass',
    description: 'Premium access with exclusive sessions',
    grossPrice: 1299.99,
    displayPrice: '$1,299.99',
    quantity: 50,
    isUnlimited: false,
    limitSalesPeriod: true,
    salesStartDate: new Date('2024-01-01T00:00:00Z'),
    salesEndDate: new Date('2024-08-15T23:59:59Z'),
    limitTicketValidity: true,
    validityStartDate: new Date('2024-08-20T08:30:00Z'),
    validityEndDate: new Date('2024-08-21T17:30:00Z'),
    limitPurchaseQuantity: true,
    minPurchaseQuantity: 1,
    maxPurchaseQuantity: 2,
  },
];

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.ticket.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();
  console.log('🗑️  Cleared existing data');

  // Create users
  const users: any[] = [];
  for (const userData of sampleUsers) {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
    users.push(user);
  }
  console.log(`👥 Created ${users.length} users`);

  // Create events
  const events: any[] = [];
  for (let i = 0; i < sampleEvents.length; i++) {
    const eventData = sampleEvents[i];
    const randomUser = users[Math.floor(Math.random() * users.length)];

    const event = await prisma.event.create({
      data: {
        ...eventData,
        userId: randomUser.id,
      },
    });
    events.push(event);
  }
  console.log(`🎉 Created ${events.length} events`);

  // Create tickets
  const tickets: any[] = [];
  for (const ticketData of sampleTickets) {
    const event = events[ticketData.eventIndex];
    const { eventIndex, ...ticketFields } = ticketData;

    const ticket = await prisma.ticket.create({
      data: {
        ...ticketFields,
        eventId: event.id,
      },
    });
    tickets.push(ticket);
  }
  console.log(`🎫 Created ${tickets.length} tickets`);

  console.log('✅ Database seeding completed!');
  console.log(`📊 Total users: ${users.length}`);
  console.log(`📊 Total events: ${events.length}`);
  console.log(`📊 Total tickets: ${tickets.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
