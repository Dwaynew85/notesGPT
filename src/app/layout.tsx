import type { Metadata } from "next";
import "@/app/styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Notes GPT",
  description: "Let your notes come to life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen w-full flex-col">
            <Header />
            <main className="bg-popover flex flex-1 flex-col px-4 pt-10 xl:px-8">{children}</main>
            <Toaster richColors />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
