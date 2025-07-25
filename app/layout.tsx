import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Link } from "@heroui/link";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "h-dvh text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "system" }}>
          <div className="relative flex flex-col min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="container mx-auto max-w-7xl px-6 max-md:pb-8 flex-grow flex">
              {process.env.NEXT_PUBLIC_BREAK === "ON" ? (
                <div className="w-full min-h-screen flex flex-col items-center mt-96 ">
                  <h1 className="text-4xl font-bold mb-4">
                    🚧 Maintenance Break
                  </h1>
                  <p className="text-lg text-center text-muted-foreground">
                    The site is currently under maintenance.{" "}
                    <Link
                      href={
                        process.env.NEXT_PUBLIC_TIMETABLE_URL ||
                        "https://www.juit.ac.in/TTC/ODDSEM2025.xls"
                      }
                      className="underline text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Use the official college timetable.
                    </Link>
                  </p>
                </div>
              ) : (
                children
              )}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
