import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Syne } from "next/font/google";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { CustomCursor } from "@/components/CustomCursor";
import { TransitionCurtain } from "@/components/TransitionCurtain";
import { Header } from "@/components/Header";
import { ClientEffects } from "@/components/ClientEffects";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Noufan Muthiri — Portfolio & Archive",
  description:
    "Official portfolio and archive of Noufan Muthiri, visualization faculty, digital artist, creative educator, and entrepreneur from Kerala, India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${syne.variable}`}
    >
      <body>
        <NoiseOverlay />
        <CustomCursor />
        <TransitionCurtain />
        <Header />
        <main id="app-content">{children}</main>
        <ClientEffects />
      </body>
    </html>
  );
}
