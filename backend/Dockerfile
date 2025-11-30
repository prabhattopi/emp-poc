# Use lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (optimizes cache)
COPY package*.json ./

# Install dependencies (including devDependencies for ts-node and prisma)
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client (Required before running)
# We provide a dummy DATABASE_URL here because Prisma 7 requires it to be present 
# during generation for validation, even if we overwrite it at runtime.
RUN DATABASE_URL="file:./build-dummy.db" npx prisma generate

# Expose the API port
EXPOSE 4000

# THE MAGIC LINE:
# 1. Pushes the schema to the DB (creates the file if using SQLite)
# 2. Seeds the database with dummy data
# 3. Starts the server
CMD npx prisma db push && npx ts-node prisma/seed.ts && npx ts-node src/index.ts