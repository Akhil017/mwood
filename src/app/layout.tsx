import ErrorFallback from "@/components/error-fallback";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { AlertCircle, CircleCheck, Info, Loader2, XCircle } from "lucide-react";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ErrorBoundary } from "react-error-boundary";
import "./globals.css";
import AppHeader from "@/components/app-header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MWood",
  description: "Malayalam movie recommendation app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="bg-[url('/bg.png')] bg-no-repeat bg-cover bg-center h-screen flex items-center justify-center">
            <div className="flex min-h-screen w-full flex-col">
              <AppHeader />
              <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 md:gap-8 max-w-4xl w-full mx-auto p-4 lg:p-0">
                {children}
              </main>
            </div>
          </div>

          <Toaster
            icons={{
              success: <CircleCheck className="text-green-600 " />,
              info: <Info />,
              warning: <AlertCircle className="text-orange-600 " />,
              error: <XCircle className="text-destructive " />,
              loading: <Loader2 />,
            }}
          />
        </ErrorBoundary>
      </body>
    </html>
  );
}
