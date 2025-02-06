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
  const [open, setOpen] = useState(false); // Added state for Sheet
  const pathname = usePathname();

  const closeSheet = () => setOpen(false); // Added function to close Sheet

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
      "/payment",
    ],
    default: [],
  };

  const NavLink = (
    { href, children }, // Added NavLink component
  ) => (
    <Link
      href={href}
      className="transition-colors hover:text-gray-600"
      onClick={closeSheet}
    >
      {children}
    </Link>
  );

  const navLinks = (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/individuals">Clean For Individuals</NavLink>
      <NavLink href="/churches">Clean For Churches</NavLink>
      <NavLink href="/founders-bio">Founder&apos;s Bio</NavLink>
      <NavLink href="/Scholarship">Scholarship</NavLink>
    </>
  );

  const renderButtons = () => {
    if (routes.landing.includes(pathname)) {
      return (
        <NavLink href="/Pricing">
          <button className="px-4 py-2 bg-white border-2 rounded text-primary-red border-primary-red hover:bg-gray-100 focus:outline-none">
            Start Your Journey
          </button>
        </NavLink>
      );
    }

    if (routes.hideButtons.includes(pathname)) {
      return null;
    }

    return (
      <>
        <NavLink href="/LogIn">
          <button className="px-4 py-2 bg-white border-2 rounded text-primary-red border-primary-red hover:bg-gray-100 focus:outline-none">
            Log In
          </button>
        </NavLink>
        <NavLink href="/SignUp">
          <button className="px-4 py-2 text-white rounded bg-primary-red hover:bg-red-800 focus:outline-none">
            Sign Up
          </button>
        </NavLink>
      </>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm backdrop-blur-sm">
      <div className="flex flex-row items-center justify-between p-4 mx-4 text-black md:mx-10">
        {/* Left section: Logo and Text */}
        <div className="flex-1">
          <Link href="/">
            <div className="flex flex-row items-center gap-2">
              <Image
                src={logo || "/placeholder.svg"}
                alt="Thirty Mighty Men Ministries Logo"
                width={35}
                height={25}
              />
              <div>
                <Image
                  src={
                    "/images-2/Thirty Mighty Men Ministries - text logo.png" ||
                    "/placeholder.svg"
                  }
                  alt="Thirty Mighty Men Ministries Logo"
                  width={175}
                  height={125}
                />
              </div>
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
            <Sheet open={open} onOpenChange={setOpen}>
              {" "}
              {/* Updated Sheet component */}
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
