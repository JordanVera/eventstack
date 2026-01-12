#!/bin/bash
cd "$(dirname "$0")"
export DATABASE_URL="mysql://root:Gcm9jg=gk3b8@localhost:3306/event_stack"
npx prisma@5.7.1 studio --schema=prisma/schema.prisma
