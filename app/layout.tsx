import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rahul Kumar — Product Builder | AI & SaaS",
  description: "Rahul Kumar is an early-career product builder focused on AI, SaaS, automation and zero-to-one product development.",
  metadataBase: new URL("https://atelierog.github.io"),
  openGraph: { title: "Rahul Kumar — Product Builder | AI & SaaS", description: "Problem-first product thinking, hands-on building and technical execution.", type: "website" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}