# Employee Portal POC

A Full Stack Employee Management System built with **Next.js 16**, **Nodejs**, **GraphQL**, **Prisma**, and **SQLite**.

## 🚀 Quick Start Guide

Follow these steps to set up the Backend and Frontend.

---

### 1. Backend Setup (Database & API)

Open a terminal and navigate to the `backend` folder:

```bash
cd backend
npm install
```

Create a file named `.env` inside the `backend` folder and add this line:

```bash
DATABASE_URL="file:./dev.db"
```

Initialize Database: This creates the SQLite database file and generates the Prisma client.

```bash
npx prisma migrate dev --name init
```

Seed the Database (Important): Populate the database with dummy employee data.

```bash
npx ts-node prisma/seed.ts
```

Start the Server:

```bash
npm run dev
```

The Backend will run at http://localhost:4000

### 2. Frontend Setup (UI)

Open a new terminal window and navigate to the `frontend` folder:

```bash
cd frontend
```

Install Dependencies:

```bash
npm install
```

Configure Environment: Create a file named `.env.local` inside the `frontend` folder and add:

```
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

Start the App:

```bash
npm run dev
```

The Frontend will run at http://localhost:3000

## ✅ Features Checklist

- Grid View: 10-column detailed table.
- Tile View: Visual cards with "Bun Button" menu.
- Search & Sort: Real-time filtering and sorting.
- Pagination: Server-side pagination for performance.
- Dashboard: Visual stats at the top.
- Responsive: Works on Mobile and Desktop.

## 🛠 Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS, Shadcn UI, Apollo Client.
- **Backend**: Node.js, Apollo Server (GraphQL), Prisma ORM, SQLite.
