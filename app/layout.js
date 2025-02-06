import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Alexandria } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar";

const alexandria = Alexandria({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "CLEAN: A Thirty Mighty Men Ministries Program",
  description: "CLEAN: A Thirty Mighty Men Ministries Program",
  keywords:
    "Thirty Mighty Men Ministries, CLEAN, Donovan Anderson, 30mmm, 30 Mighty Men,",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          variables: { colorPrimary: "#000000" },
          elements: {
            formButtonPrimary:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            socialButtonsBlockButton:
              "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
            socialButtonsBlockButtonText: "font-semibold",
            formButtonReset:
              "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
            membersPageInviteButton:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            card: "bg-[#fafafa]",
          },
        }}
      >
        <body className={`${alexandria.className} subpixel-antialiased`}>
          <NavBar />
          {children}
          <Footer />
        </body>
      </ClerkProvider>
    </html>
  );
}
