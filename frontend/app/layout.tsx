// frontend/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CustomApolloProvider } from "@/lib/apollo-provider";
import { Header } from "@/components/header"; // Import Header

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Employee Portal",
  description: "POC for Employee Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomApolloProvider>
           <Header /> {/* Added Header here */}
           <main className="min-h-screen bg-gray-50">
             {children}
           </main>
        </CustomApolloProvider>
      </body>
    </html>
  );
}