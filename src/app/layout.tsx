import type { Metadata } from "next";
import { 
  Geist, 
  Geist_Mono, 
  Anonymous_Pro,
  VT323,
  Source_Code_Pro,
  Fira_Code,
  IBM_Plex_Mono,
  JetBrains_Mono,
  Roboto_Mono,
  Space_Mono
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anonymousPro = Anonymous_Pro({
  variable: "--font-anonymous-pro",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Aeonic Menace Games - Indie Game Studio",
  description: "Aeonic Menace is an indie game studio in Minnesota creating unique board games, video games, and oracle decks. Explore Alien Scum!, Aeonic Tarot, Light the Beacon, and Tar and Feather.",
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
        className={`${geistSans.variable} ${geistMono.variable} ${anonymousPro.variable} ${vt323.variable} ${sourceCodePro.variable} ${firaCode.variable} ${ibmPlexMono.variable} ${jetBrainsMono.variable} ${robotoMono.variable} ${spaceMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
