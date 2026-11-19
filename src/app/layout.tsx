import type { Metadata } from "next";
import "./globals.css";
import { WEDDING_DATA } from "@/config/weddingData";

const SITE_URL = "https://tempered-skyblue-squid-71.hostingersite.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Kumbhagiri Sai Kiran & Gangalla Maheswari | Royal Wedding Invitation",
  description:
    "With the divine blessings of the Almighty and our elders, you are cordially invited to celebrate the sacred wedding festivities of Kumbhagiri Sai Kiran and Gangalla Maheswari on 01 & 02 December 2026 at Krishna Kalyanamandapam, Madras Road, Kadapa.",
  keywords: [
    "Kumbhagiri Sai Kiran",
    "Gangalla Maheswari",
    "Telugu Wedding Invitation",
    "Royal Wedding Invitation",
    "Krishna Kalyanamandapam Kadapa",
    "Kumbhagiri Wedding",
  ],
  authors: [{ name: "The Kumbhagiri & Gangalla Families" }],
  creator: "The Kumbhagiri & Gangalla Families",
  openGraph: {
    title: "Kumbhagiri Sai Kiran & Gangalla Maheswari — A Royal Wedding Celebration",
    description:
      "Cordially inviting you and your family to grace the auspicious Haldi & Music Ceremony (01 Dec) and Sacred Wedding Ceremony (02 Dec) at Krishna Kalyanamandapam, Kadapa.",
    url: SITE_URL,
    siteName: "Kumbhagiri & Gangalla Royal Wedding",
    images: [
      {
        url: `${SITE_URL}/images/og-couple.jpg`,
        width: 1200,
        height: 630,
        alt: "Kumbhagiri Sai Kiran & Gangalla Maheswari Royal Wedding Invitation",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumbhagiri Sai Kiran & Gangalla Maheswari Wedding Invitation",
    description:
      "Auspicious Two-Day Wedding Celebrations on 01 & 02 December 2026 at Krishna Kalyanamandapam, Kadapa.",
    images: [`${SITE_URL}/images/og-couple.jpg`],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[#2A0B14] text-cream-ivory min-h-screen">
        {children}
      </body>
    </html>
  );
}
