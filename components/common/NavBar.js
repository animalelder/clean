"use client";

import { useEffect, useState } from "react";
import logo from "@/public/logo.png";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function NavBar() {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const routes = {
    landing: [
      "/",
      "/founders-bio",
      "/about",
      "/Scholarship",
      "/Scholarship-Application",
      "/individuals",
      "/churches",
    ],
    hideButtons: [
      "/LogIn",
      "/SignUp",
      "/Pricing",
      "/AnotherPathToHide",
      "/Dashboard",
      "/DevLinks",
      "/Foundation",
      "/Settings",
    ],
    default: [],
  };

  const renderButtons = () => {
    if (routes.landing.includes(pathname)) {
      return (
        <Link href="/Pricing">
          <button className="px-4 py-2 bg-white border-2 rounded text-primary-red border-primary-red hover:bg-gray-100 focus:outline-none">
            Start Your Journey
          </button>
        </Link>
      );
    }

    if (routes.hideButtons.includes(pathname)) {
      return null;
    }

    return (
      <>
        <Link href="/LogIn">
          <button className="px-4 py-2 bg-white border-2 rounded text-primary-red border-primary-red hover:bg-gray-100 focus:outline-none">
            Log In
          </button>
        </Link>
        <Link href="/SignUp">
          <button className="px-4 py-2 text-white rounded bg-primary-red hover:bg-red-800 focus:outline-none">
            Sign Up
          </button>
        </Link>
      </>
    );
  };

  const navLinks = (
    <>
      <Link href="/about" className="transition-colors hover:text-gray-600">
        About
      </Link>
      <Link
        href="/individuals"
        className="transition-colors hover:text-gray-600"
      >
        Clean For Individuals
      </Link>
      <Link href="/churches" className="transition-colors hover:text-gray-600">
        Clean For Churches
      </Link>
      <Link
        href="/founders-bio"
        className="transition-colors hover:text-gray-600"
      >
        Founder&apos;s Bio
      </Link>
      <Link
        href="/Scholarship"
        className="transition-colors hover:text-gray-600"
      >
        Scholarship
      </Link>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm backdrop-blur-sm">
      <div className="flex flex-row items-center justify-between p-4 mx-4 text-black md:mx-10">
        {/* Left section: Logo and Text */}
        <div className="flex-1">
          <Link href="/">
            <div className="flex flex-row items-center gap-2">
              <Image
                src={logo || "/placeholder.svg"}
                alt="30 Mighty Men Ministries Logo"
                width={35}
                height={25}
              />
              <div className="hidden sm:block">30 Mighty Men Ministries</div>
            </div>
          </Link>
        </div>

        {/* Center section: Navigation Links (hidden on mobile) */}
        {!isMobile && (
          <div className="flex-row items-center hidden gap-6 md:flex">
            {navLinks}
          </div>
        )}

        {/* Right section: Buttons or Hamburger Menu */}
        <div className="flex flex-row items-center justify-end flex-1 gap-2">
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 text-primary-red focus:outline-none">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col items-center gap-6 mt-10 text-xl">
                  {navLinks}
                  {renderButtons()}
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            renderButtons()
          )}
        </div>
      </div>
    </nav>
  );
}
