// backend/src/resolvers.ts

// --- FIX: Point directly to the index file ---
import { PrismaClient } from './generated/client'; 
// ---------------------------------------------

import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { GraphQLError } from 'graphql';
import path from 'path'; // We might need this for safe path resolving

// Adapter Setup
const adapter = new PrismaBetterSqlite3({
  url: 'file:./dev.db'
});

const prisma = new PrismaClient({ adapter });

// Helper to check Authorization
const requireAdmin = (context: any) => {
  if (context.role !== 'ADMIN') {
    throw new GraphQLError('Forbidden: Admins only', {
      extensions: { code: 'FORBIDDEN' },
    });
  }
};

export const resolvers = {
  Query: {
    getEmployees: async (_: any, args: any) => {
      const { page = 1, limit = 10, filter, sort } = args;
      const skip = (page - 1) * limit;

      const where: any = {};
      if (filter?.nameContains) where.name = { contains: filter.nameContains };
      if (filter?.minAttendance) where.attendance = { gte: filter.minAttendance };

      const orderBy: any = {};
      if (sort?.field) orderBy[sort.field] = sort.direction === 'DESC' ? 'desc' : 'asc';

      const [employees, totalCount] = await Promise.all([
        prisma.employee.findMany({ where, skip, take: limit, orderBy }),
        prisma.employee.count({ where }),
      ]);

      return {
        nodes: employees.map((e) => ({ ...e, subjects: JSON.parse(e.subjects) })),
        totalCount,
        hasNextPage: skip + employees.length < totalCount,
      };
    },

    getEmployee: async (_: any, { id }: { id: string }) => {
      const employee = await prisma.employee.findUnique({ where: { id } });
      if (!employee) return null;
      return { ...employee, subjects: JSON.parse(employee.subjects) };
    },
  },

  Mutation: {
    addEmployee: async (_: any, args: any, context: any) => {
      requireAdmin(context);
      const employee = await prisma.employee.create({
        data: {
          name: args.name,
          age: args.age,
          class: args.class,
          attendance: args.attendance,
          subjects: JSON.stringify(args.subjects),
        },
      });
      return { ...employee, subjects: JSON.parse(employee.subjects) };
    },

    updateEmployee: async (_: any, args: any, context: any) => {
      requireAdmin(context);
      const { id, ...data } = args;
      const employee = await prisma.employee.update({ where: { id }, data });
      return { ...employee, subjects: JSON.parse(employee.subjects) };
    },
  },
};