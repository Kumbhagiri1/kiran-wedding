import type { Metadata } from "next";
import "./globals.css";
import { WEDDING_DATA } from "@/config/weddingData";

export const metadata: Metadata = {
  title: "Kumbhagiri Sai Kiran & Gangalla Maheshwari | Royal Wedding Invitation",
  description:
    "With the divine blessings of the Almighty and our elders, you are cordially invited to celebrate the sacred wedding of Kumbhagiri Sai Kiran and Gangalla Maheshwari on 02 December 2026 at Krishna Kalyanamandapam, Madras Road, Kadapa.",
  keywords: [
    "Kumbhagiri Sai Kiran",
    "Gangalla Maheshwari",
    "Telugu Wedding Invitation",
    "Royal Wedding Invitation",
    "Krishna Kalyanamandapam Kadapa",
    "Kumbhagiri Wedding",
  ],
  authors: [{ name: "The Kumbhagiri Family" }],
  creator: "The Kumbhagiri Family",
  openGraph: {
    title: "Kumbhagiri Sai Kiran & Gangalla Maheshwari — A Royal Wedding Celebration",
    description:
      "Cordially inviting you and your family to grace the auspicious wedding ceremony on Wednesday, 02 December 2026 at Krishna Kalyanamandapam, Kadapa.",
    url: "https://kumbhagiriwedding.com",
    siteName: "Kumbhagiri & Gangalla Royal Wedding",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumbhagiri Sai Kiran & Gangalla Maheshwari Wedding Invitation",
    description:
      "Auspicious Wedding Ceremony on 02 December 2026 at Krishna Kalyanamandapam, Kadapa.",
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
