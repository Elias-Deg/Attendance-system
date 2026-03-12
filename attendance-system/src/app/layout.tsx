import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MockAppProvider } from "@/mock/store";
import { AppShell } from "@/components/layout/AppShell";
import { I18nProvider } from "@/i18n/I18nProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Attendance Management System",
  description: "Military training camp attendance (frontend demo)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <MockAppProvider>
            <AppShell>{children}</AppShell>
          </MockAppProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
