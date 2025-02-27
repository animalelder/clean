import React from "react";
import { SignOutButton } from "@clerk/nextjs";
import { FaChevronDown } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { RxCaretDown, RxHamburgerMenu } from "react-icons/rx";

export default function NavigationBar({ initials, firstName, avatarUrl }) {
  return (
    <nav className="sticky top-0 z-50 w-full flex-auto bg-white">
      <div className="flex h-16 items-center gap-2 self-stretch border-b-2 border-b-[#E3E7ED] bg-white px-2 lg:gap-3">
        <div className="size-7">
          <RxHamburgerMenu size="lg" />
        </div>
        <div className="mx-auto justify-self-auto text-2xl max-sm:hidden">
          30 MMM CLEAN PROGRAM
        </div>
        <div className="ml-auto inline-flex cursor-pointer items-center gap-2 justify-self-end text-primary-red">
          <FaPhoneFlip />
          <span className="text-sm font-medium text-primary-red">
            <SignOutButton />
          </span>
        </div>
        <div className="mr-2 flex h-12 items-center justify-end justify-self-end sm:gap-2 md:min-w-36">
          <div className="relative size-11 rounded-full bg-primaryred">
            <div className="absolute left-2/3 top-2/3 size-5 border-spacing-1 rounded-[52px] border-2 border-white bg-amber-300 p-1">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[9px] text-white">
                {initials}
              </div>
            </div>
          </div>
          <span className="items-center justify-center text-base font-medium leading-relaxed tracking-wide max-sm:hidden">
            {firstName}
          </span>
          <FaChevronDown
            size={16}
            className="text-primary-red"
          />
        </div>
      </div>
    </nav>
  );
}
