import { PrismaClient } from '../src/generated/client'; 
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3';

const db = new Database('dev.db');
const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.employee.deleteMany(); // Clear old data
  
  const subjectsList = ["Math", "Physics", "Chemistry", "Biology", "CS", "English"];
  
  for (let i = 1; i <= 20; i++) {
    await prisma.employee.create({
      data: {
        name: `Employee ${i}`,
        age: 20 + Math.floor(Math.random() * 40),
        class: ["Engineering", "HR", "Sales", "Marketing"][Math.floor(Math.random() * 4)],
        attendance: parseFloat((70 + Math.random() * 30).toFixed(1)),
        subjects: JSON.stringify([
            subjectsList[Math.floor(Math.random() * subjectsList.length)],
            subjectsList[Math.floor(Math.random() * subjectsList.length)]
        ]),
      }
    });
  }
}

main()
  .then(() => console.log("Seeding complete!"))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());