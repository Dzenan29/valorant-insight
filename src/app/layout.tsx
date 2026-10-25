import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Valorant Insight | Performance intelligence", description: "Independent VALORANT performance analytics prototype. Explore matches, timing, consistency and agent performance." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
