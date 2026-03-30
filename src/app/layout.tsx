import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
 
export const metadata: Metadata = {
  title: "LLM Reliability Lab",
  description: "Evaluate and analyze LLM reliability in medical question answering",
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grid-bg min-h-screen">
        <Navbar />
        <main className="pt-14">{children}</main>
      </body>
    </html>
  );
}