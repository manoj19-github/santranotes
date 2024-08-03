import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { ConvexClientProvider } from "@/components/providers/ConvexProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Santra Notes",
  description: "Maintain your daily tasks",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/my-notes.png",
        href: "/my-notes.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/my-notesDark.png",
        href: "/my-notesDark.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="SantraNotesThemes"
          >
            <div className="overflow-y-auto w-[98.9vw] overflow-x-hidden">
              {children}
            </div>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
