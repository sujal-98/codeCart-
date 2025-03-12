import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header/Header";
import {
  ClerkProvider
} from '@clerk/nextjs'
 

// This export should stay for metadata to work correctly on the server-side
export const metadata: Metadata = {

  title: "CodeCart",
  description:
    "CodeCart is a cutting-edge, full-stack e-commerce platform built with Next.js, designed to provide a seamless shopping experience for both customers and store owners. Leveraging the power of server-side rendering and client-side interactions, CodeCart ensures blazing-fast page loads, optimized SEO, and dynamic, real-time updates.",
};

export default async  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; 
}>) {
  

  
  return (
    <ClerkProvider> 
    <html lang="en" >
      <body className= 'antialiased'>
         
         <div className="min-h-screen flex flex-col">
         
         {/* Pass the theme props to Header */}
         <Header   />
         {children}
         <footer className="footer footer-center p-4 bg-base-300 text-base-content">
           <p>Copyright © 2023 - All right reserved by CodeCart</p>
         </footer>
       </div>
         
      </body>
    </html>
    </ClerkProvider>
  );
}
