// backend/src/index.ts
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

interface MyContext {
  role?: string;
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    // Authentication Context Setup
    context: async ({ req }) => {
      // Simple mock auth: read 'user-role' header
      // In production, you would verify a JWT token here
      const role = req.headers['user-role'] as string || 'EMPLOYEE';
      return { role };
    },
  });
  console.log(`🚀 Backend ready at: ${url}`);
}

startServer();