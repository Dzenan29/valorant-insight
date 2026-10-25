import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
export const metadata: Metadata = { title: "Valorant Insight | Performance intelligence", description: "Independent VALORANT performance analytics prototype. Explore matches, timing, consistency and agent performance." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}<nav className="global-legal-nav" aria-label="Legal and product links"><Link href="/about">About</Link><Link href="/riot-review">Riot review</Link><Link href="/connect">Connection demo</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav></body></html>; }
