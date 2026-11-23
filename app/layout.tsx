import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://atelierog.co.in"),
  title: "Atelier OG | Technology That Moves Business Forward",
  description: "Atelier OG is an independent technology studio helping businesses improve design, data, digital experiences and everyday operations through practical technology.",
  openGraph: {
    title: "Atelier OG | Technology That Moves Business Forward",
    description: "Thoughtful digital experiences, practical business tools and automation built around real business needs.",
    url: "https://atelierog.co.in",
    siteName: "Atelier OG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atelier OG | Technology That Moves Business Forward",
    description: "Design, digital tools, data and business automation.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
