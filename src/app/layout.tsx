import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hush — Talk to someone. Tell no one.",
  description: "Meet someone new in a spontaneous, anonymous conversation. No profiles. No pressure. Just people.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
