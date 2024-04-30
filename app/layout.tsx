import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReduxProvider from "./config/reduxProvidor";
import ReactQueryProvider from "./config/reactQueryProvidor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VetCare",
  description: "You pet is our priority.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ReduxProvider>
          <ReactQueryProvider>
            {children}
            <ToastContainer />
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
