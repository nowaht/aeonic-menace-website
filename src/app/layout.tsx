import type { Metadata } from "next";
import { Anonymous_Pro } from "next/font/google";
import "./globals.css";

const anonymousPro = Anonymous_Pro({
  variable: "--font-anonymous-pro",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Aeonic Menace Games - Indie Game Studio",
  description: "Aeonic Menace is an indie game studio in Minnesota creating unique board games, video games, and oracle decks. Explore Alien Scum!, Aeonic Tarot, Light the Beacon, and Tar and Feather.",
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anonymousPro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
