"use client";

import { useEffect, useState } from "react";
import logo from "@/public/logo.png";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
        About {!isMobile && <ChevronDown size={16} className="ml-1" />}
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

  const aboutLinks = [
    { name: "About the Program", href: "/about" },
    { name: "Clean for Individuals", href: "/individuals" },
    { name: "Clean for Churches", href: "/churches" },
    { name: "Founder's Bio", href: "/founders-bio" },
    { name: "Scholarship", href: "/Scholarship" },
  ];

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
          <Button
            variant="outline"
            className="w-full border-primary-red text-primary-red hover:bg-primary-red hover:text-white"
          >
            Start Your Journey
          </Button>
        </NavLink>
      );
    }

    if (routes.hideButtons.includes(pathname)) {
      return null;
    }

    return (
      <>
        <NavLink href="/LogIn">
          <Button
            variant="outline"
            className="w-full border-primary-red text-primary-red hover:bg-primary-red hover:text-white"
          >
            Log In
          </Button>
        </NavLink>
        <NavLink href="/SignUp">
          <Button className="w-full text-white bg-primary-red hover:bg-red-800">
            Sign Up
          </Button>
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
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <NavLink
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Home
                </NavLink>
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-medium">About</h4>
                  {aboutLinks.map((item) => (
                    <NavLink
                      key={item.name}
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <NavLink
                  href="/donate"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Donate
                </NavLink>
                {renderButtons()}
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </nav>
  );
}
