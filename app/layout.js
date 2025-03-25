import "@/app/globals.css";
import { Alexandria } from "next/font/google";
import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar";
import { Toaster } from "@/components/ui/sonner";

const alexandria = Alexandria({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "CLEAN: A Thirty Mighty Men Ministries Program",
  description: "CLEAN: A Thirty Mighty Men Ministries Program",
  keywords:
    "30 Men Ministries, the-carpenters-son, thecleanprogram, Donovan Anderson",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${alexandria.className} antialiased`}>
        <NavBar />
        <main className="mt-20">{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
