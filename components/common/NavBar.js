"use client";

import { useEffect, useState } from "react";
import logo from "@/public/logo.png";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function NavBar() {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const closeSheet = () => setOpen(false);

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
      "/Contact",
      "/donate",
    ],
    default: [],
  };

  const NavLink = ({ href, children, className = "" }) => (
    <Link
      href={href}
      className={`transition-colors hover:text-gray-600 ${className}`}
      onClick={closeSheet}
    >
      {children}
    </Link>
  );

  const AboutDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center transition-colors hover:text-gray-600">
        About <ChevronDown size={16} className="ml-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <NavLink href="/about">About the Program</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink href="/individuals">Clean for Individuals</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink href="/churches">Clean for Churches</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink href="/founders-bio">Founder&apos;s Bio</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink href="/Scholarship">Scholarship</NavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const navLinks = (
    <>
      <NavLink href="/">Home</NavLink>
      <AboutDropdown />
      <NavLink href="/donate">Donate</NavLink>
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
      <div className="flex items-center justify-between p-4 mx-4 text-black md:mx-10">
        {/* Left section: Logo and Text */}
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image
                src={logo || "/placeholder.svg"}
                alt="Thirty Mighty Men Ministries Logo"
                width={35}
                height={35}
              />
              <Image
                src="/images-2/Thirty Mighty Men Ministries - text logo.png"
                alt="Thirty Mighty Men Ministries Logo"
                className="w-auto h-fit max-w-[175px]"
                width={602}
                height={169}
              />
            </div>
          </Link>
        </div>

        {/* Right section: Navigation Links and Buttons */}
        {!isMobile ? (
          <div className="flex items-center gap-6">
            {navLinks}
            {renderButtons()}
          </div>
        ) : (
          <Sheet open={open} onOpenChange={setOpen}>
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
        )}
      </div>
    </nav>
  );
}
