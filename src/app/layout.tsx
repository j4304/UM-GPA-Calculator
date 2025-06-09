import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Analytics } from "@vercel/analytics/next";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO metadata
export const metadata: Metadata = {
  title: "UM GPA Calculator",
  description:
    "Your go-to tool for accurate and instant GPA calculation, powered by the official University of Mindanao grading system. Track your academic progress with ease and confidence.",
  icons: {
    icon: "/umgpa-icon.png",
    shortcut: "/umgpa-icon.png",
    apple: "/umgpa-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://umgpa.vercel.app" />
        <meta name="robots" content="index, follow" />

        {/* Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "UM GPA Calculator",
              url: "https://umgpa.vercel.app",
              description:
                "Calculate your GPA easily with the UM GPA Calculator — accurate, fast and tailored for University of Mindanao students.",
              applicationCategory: "EducationApplication",
              creator: {
                "@type": "Person",
                name: "Cristian Jay Cosep",
                url: "https://cristianjay.me",
              },
            }),
          }}
        />
      </Head>

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
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <span className="moving-gradient">UM</span> GPA Calculator
                <span className="text-[10px] text-white bg-moving-gradient px-1.5 py-0.5 rounded uppercase">
                  Beta
                </span>
              </h1>
              <ModeToggle />
            </div>
          </header>

          <main className="container mx-auto max-w-5xl px-4 py-4 flex-grow">
            {children}
          </main>

          <footer className="border-t bg-background h-12 flex items-center flex-shrink-0">
            <div className="container mx-auto max-w-5xl px-6 text-center text-sm text-muted-foreground w-full">
              <p className="truncate">
                © {new Date().getFullYear()} UM GPA Calculator Created by{" "}
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
