import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5'; 
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

interface MyContext {
  role?: string;
}

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  // 1. GLOBAL CORS SETUP
  // We apply this to the whole app, not just /graphql
  app.use(cors<cors.CorsRequest>({
    origin: [
      'https://emp-poc-fe.vercel.app', // Production Frontend
      'http://localhost:3000',         // Local Frontend
      'http://localhost:5173',         // Local Vite (if used)
      'https://studio.apollographql.com' // 👈 IMPORTANT: Allows Local Sandbox to work!
    ],
    credentials: true,
  }));

  // 2. ROOT ROUTE HANDLER
  // This fixes the issue where visiting http://localhost:4000/ shows an error
  app.get('/', (req, res) => {
    res.send('Welcome to the Backend! GraphQL is at /graphql');
  });

  // 3. GRAPHQL ROUTE
  app.use(
    '/graphql',
    express.json(), 
    expressMiddleware(server, {
      context: async ({ req }) => {
        const role = req.headers['user-role'] as string || 'EMPLOYEE';
        return { role };
      },
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Backend ready at http://localhost:4000/graphql`);
}

startServer();