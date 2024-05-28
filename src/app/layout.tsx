import ErrorFallback from "@/components/error-fallback";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { AlertCircle, CircleCheck, Info, Loader2, XCircle } from "lucide-react";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ErrorBoundary } from "react-error-boundary";
import "./globals.css";

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
          {children}
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
