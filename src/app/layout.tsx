import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atharva Patel | Full-Stack Elegance",
  description: "Crafting modern applications with meticulous attention to detail.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      {/* The <body> tag is now correctly styled for dark mode */}
      <body className={`${inter.className} bg-white dark:bg-black transition-colors duration-300`}>
        {children}
      </body>
    </html>
  );
}