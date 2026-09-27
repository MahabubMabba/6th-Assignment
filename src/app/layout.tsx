import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { PlanProvider } from "@/context/PlanProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          <Navbar />
          {children}

          <ToastContainer
            position="top-center"
            autoClose={2000}
          />
        </PlanProvider>
      </body>
    </html>
  );
}