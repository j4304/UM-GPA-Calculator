import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UM GPA Calculator",
  description:
    "Your go-to tool for accurate and instant GPA calculation, powered by the official University of Mindanao grading system. Track your academic progress with ease and confidence.",
  icons: {
    icon: "/UM-GPA.png",
    shortcut: "/UM-GPA.png",
    apple: "/UM-GPA.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-50 bg-background border-b flex-shrink-0">
            <div className="container mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
              <div className="text-2xl font-bold">
                <span className="moving-gradient">UM</span> GPA Calculator
              </div>
              <ModeToggle />
            </div>
          </header>

          <main className="container mx-auto max-w-5xl px-6 py-4 flex-grow">
            {children}
          </main>

          <footer className="border-t bg-background h-12 flex items-center flex-shrink-0">
            <div className="container mx-auto max-w-5xl px-6 text-center text-sm text-muted-foreground w-full">
              <p className="truncate">
                © {new Date().getFullYear()} UM GPA Calculator. Created by{" "}
                <a
                  href="https://cristianjay.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Cristian Jay Cosep
                </a>
              </p>
            </div>
          </footer>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
