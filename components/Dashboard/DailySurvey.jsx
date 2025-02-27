"use client";

import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const DailySurvey = ({ userProgress }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button>Daily Survey</Button>
      </SheetTrigger>
      <SheetContent className="z-[51] w-[299px] overflow-clip sm:w-[320px]">
        <SheetHeader>
          <SheetTitle>Daily Survey</SheetTitle>
          <SheetDescription>
            {/* Help us improve our app by answering a few questions. */}
          </SheetDescription>
        </SheetHeader>
        <Image
          src="/survey-placeholder.png"
          alt="Survey"
          width={312}
          height={1488}
          className="object-cover"
        />
        <SheetFooter>
          <SubmitButton>Submit</SubmitButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const Button = ({ children }) => (
  <button className="fixed end-0 right-0 top-1/2 z-[51] m-0 mr-2 origin-right -translate-y-1/2 -rotate-90 items-center justify-center gap-2.5 rounded-[16px_16px_0px_0px] bg-primary-red p-0 px-4 py-2 text-white data-[state=open]:opacity-0">
    {children}
  </button>
);

const SubmitButton = () => {
  return (
    <button
      type="submit"
      className="rounded-[16px] bg-primary-red px-4 py-2 text-white"
    >
      Submit
    </button>
  );
};
