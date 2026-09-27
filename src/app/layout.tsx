import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      <body className="flex min-h-screen flex-col">
        <PlanProvider>
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />

          <ToastContainer
            position="top-center"
            autoClose={2000}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="dark"
          />
        </PlanProvider>
      </body>
    </html>
  );
}