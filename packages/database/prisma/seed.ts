import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Sample data for seeding
const sampleUsers = [
  { name: 'John Doe', email: 'john.doe@example.com' },
  { name: 'Jane Smith', email: 'jane.smith@example.com' },
  { name: 'Mike Johnson', email: 'mike.johnson@example.com' },
  { name: 'Sarah Wilson', email: 'sarah.wilson@example.com' },
  { name: 'David Brown', email: 'david.brown@example.com' },
  { name: 'Emily Davis', email: 'emily.davis@example.com' },
  { name: 'Chris Miller', email: 'chris.miller@example.com' },
  { name: 'Lisa Garcia', email: 'lisa.garcia@example.com' },
  { name: 'Tom Anderson', email: 'tom.anderson@example.com' },
  { name: 'Amy Taylor', email: 'amy.taylor@example.com' }
]

const sampleEvents = [
  {
    title: 'Tech Conference 2024',
    description: 'Annual technology conference featuring the latest innovations in software development, AI, and cloud computing.',
    startDate: new Date('2024-06-15T09:00:00Z'),
    endDate: new Date('2024-06-17T17:00:00Z')
  },
  {
    title: 'Music Festival Summer',
    description: 'Three-day outdoor music festival featuring indie, rock, and electronic artists.',
    startDate: new Date('2024-07-20T14:00:00Z'),
    endDate: new Date('2024-07-22T23:00:00Z')
  },
  {
    title: 'React Workshop',
    description: 'Hands-on workshop covering advanced React patterns, hooks, and performance optimization.',
    startDate: new Date('2024-05-10T10:00:00Z'),
    endDate: new Date('2024-05-10T16:00:00Z')
  },
  {
    title: 'Startup Meetup',
    description: 'Networking event for entrepreneurs, investors, and startup enthusiasts.',
    startDate: new Date('2024-04-25T18:00:00Z'),
    endDate: new Date('2024-04-25T21:00:00Z')
  },
  {
    title: 'Data Science Seminar',
    description: 'Expert-led seminar on machine learning, data visualization, and statistical analysis.',
    startDate: new Date('2024-08-05T13:00:00Z'),
    endDate: new Date('2024-08-05T17:00:00Z')
  },
  {
    title: 'Design Thinking Workshop',
    description: 'Interactive workshop on user-centered design methodologies and prototyping.',
    startDate: new Date('2024-06-30T09:30:00Z'),
    endDate: new Date('2024-06-30T15:30:00Z')
  },
  {
    title: 'Blockchain Conference',
    description: 'Exploring the future of blockchain technology, DeFi, and Web3 applications.',
    startDate: new Date('2024-09-12T08:00:00Z'),
    endDate: new Date('2024-09-13T18:00:00Z')
  },
  {
    title: 'Mobile App Development',
    description: 'Comprehensive course on building cross-platform mobile applications.',
    startDate: new Date('2024-05-20T10:00:00Z'),
    endDate: new Date('2024-05-22T16:00:00Z')
  },
  {
    title: 'DevOps Training',
    description: 'Learn CI/CD pipelines, containerization, and cloud deployment strategies.',
    startDate: new Date('2024-07-08T09:00:00Z'),
    endDate: new Date('2024-07-10T17:00:00Z')
  },
  {
    title: 'Product Management Summit',
    description: 'Industry leaders discussing product strategy, user research, and market analysis.',
    startDate: new Date('2024-08-20T08:30:00Z'),
    endDate: new Date('2024-08-21T17:30:00Z')
  }
]

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data
  await prisma.event.deleteMany()
  await prisma.user.deleteMany()
  console.log('🗑️  Cleared existing data')

  // Create users
  const users = []
  for (const userData of sampleUsers) {
    const user = await prisma.user.create({
      data: userData,
    })
    users.push(user)
  }
  console.log(`👥 Created ${users.length} users`)

  // Create events
  const events = []
  for (let i = 0; i < sampleEvents.length; i++) {
    const eventData = sampleEvents[i]
    const randomUser = users[Math.floor(Math.random() * users.length)]
    
    const event = await prisma.event.create({
      data: {
        ...eventData,
        userId: randomUser.id,
      },
    })
    events.push(event)
  }
  console.log(`🎉 Created ${events.length} events`)

  console.log('✅ Database seeding completed!')
  console.log(`📊 Total users: ${users.length}`)
  console.log(`📊 Total events: ${events.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
