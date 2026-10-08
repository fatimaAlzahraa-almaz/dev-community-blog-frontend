import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from 'next-themes';
import { AuthInitializer } from "@/features/auth/AuthInitializer";
import Navbar from '@/components/layout/Navbar'
import { QueryProvider } from "@/providers/QueryProvider";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEV Community",
  description: "We're a place where coders share, stay up-to-date, and grow their careers.",
};



export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col light:bg-accent dark:bg-gray-950">
        <ThemeProvider attribute='class' enableSystem defaultTheme="light">
        <QueryProvider >
         <AuthInitializer/>
         <Navbar/>
         {children}
         <Footer/>
         </QueryProvider>
         </ThemeProvider>
         </body>
    </html>
  );
}
