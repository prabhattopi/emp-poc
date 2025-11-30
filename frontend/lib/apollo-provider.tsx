// frontend/src/lib/apollo-provider.tsx
"use client";

// Core logic stays in the main package
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
// React components moved here in v4
import { ApolloProvider } from "@apollo/client/react"; 

const client = new ApolloClient({
  // Use HttpLink to ensure proper connection in Next.js 16 environment
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    
 fetchOptions: {
  credentials: "include", // send cookies on cross-site requests
},

  }),
  
  cache: new InMemoryCache(),
  
});

export function CustomApolloProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}