"use client";

import React from "react";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import { RxCaretDown, RxHamburgerMenu } from "react-icons/rx";
import { DailySurvey } from "@/components/Home/DailySurvey";

export default function Dashboard() {
  return (
    <SignedIn>
      <div className="relative mx-auto flex min-h-screen flex-col items-center justify-start">
        <NavigationBar />

        {/* Start of the content container */}
        <DailySurvey />
        <div className="relative mx-auto mb-8 mt-8 flex min-h-screen w-full max-w-[1200px] flex-col items-start gap-y-5 space-y-4 pt-12 max-lg:mx-2">
          <div className="flex w-full flex-wrap items-center justify-start gap-2 md:gap-y-5">
            <h1 className="text-3xl font-bold leading-relaxed md:text-4xl">
              Hello, Donovan Anderson
            </h1>
            <UserSelectCaret />

            <h2 className="w-full text-base font-normal text-gray-400">
              Today is{" "}
              <span className="font-semibold text-almost-black">
                Week 1 Day 1: Sanctification
              </span>
            </h2>
          </div>
          <DonateHero />
          {/* The sizes by lines are 22 14 12 and the buttons are 16 */}
          <div className="mr-auto w-full">
            <h4 className="text-3xl font-semibold leading-7 tracking-wider">
              CLEAN XXIII
            </h4>
          </div>
          <div className="inline-flex h-[30px] w-full items-center justify-between px-0.5 py-1.5 sm:px-2">
            <div className="inline-flex justify-evenly gap-1.5 gap-x-0.5 rounded-[40px] bg-gray-200 sm:gap-x-2">
              <span className="rounded-[34px] px-2.5 py-2 text-xs font-light leading-tight tracking-wider text-slate-600 hover:bg-almost-black hover:font-medium hover:text-white">
                All
              </span>
              <span className="rounded-[34px] px-2.5 py-2 text-xs font-light leading-tight tracking-wider text-slate-600 hover:bg-almost-black hover:font-medium hover:text-white">
                In Progress
              </span>
              <span className="rounded-[34px] px-2.5 py-2 text-xs font-light leading-tight tracking-wider text-slate-600 hover:bg-almost-black hover:font-medium hover:text-white max-sm:hidden">
                {" "}
                Upcoming
              </span>
              <span className="rounded-[34px] px-2.5 py-2 text-xs font-light leading-tight tracking-wider text-slate-600 hover:bg-almost-black hover:font-medium hover:text-white">
                Completed
              </span>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 rounded-2xl bg-gray-200 p-2 text-sm font-light">
              <CalendarIcon />
              Group:
              <div className="font-medium leading-snug">Clean XXIII</div>
              <DownCaret />
            </div>
          </div>
          <div className="flex w-full flex-row flex-wrap justify-center gap-3 py-3 md:gap-5">
            <WeekCard
              week={1}
              status={"Completed"}
            />
            <WeekCard
              week={2}
              status={"Completed"}
            />
            <WeekCard
              week={3}
              status={"Completed"}
            />
            <WeekCard
              week={4}
              status={"Completed"}
            />
            <WeekCard
              week={5}
              status={"Completed"}
            />
            <WeekCard
              week={6}
              status={"Completed"}
            />
            <WeekCard
              week={7}
              status={"Completed"}
            />
          </div>
        </div>
      </div>
    </SignedIn>
  );
}

const NavigationBar = () => {
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
          {/* <LuPhone /> */}
          <span className="text-sm font-medium text-primary-red">
            <SignOutButton />
          </span>
        </div>
        <div className="mr-2 flex h-12 items-center justify-end justify-self-end sm:gap-2 md:min-w-36">
          <div className="relative size-11 rounded-full bg-primaryred">
            <div className="absolute left-2/3 top-2/3 size-5 border-spacing-1 rounded-[52px] border-2 border-white bg-amber-300 p-1">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[9px] text-white">
                DA
              </div>
            </div>
          </div>
          <span className="text-base font-medium leading-relaxed tracking-wide max-sm:hidden">
            Donovan
          </span>
          <div className="size-7 cursor-pointer text-primary-red hover:drop-shadow-xl">
            <RxCaretDown
              size="lg"
              className="group"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

const UserSelectCaret = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      className="cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 11.25L15 18.75L22.5 11.25"
        stroke="#13171B"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const CalendarIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.66699 1.66699V4.16699"
        stroke="#516078"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.333 1.66699V4.16699"
        stroke="#516078"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.91699 7.5752H17.0837"
        stroke="#516078"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 7.08366V14.167C17.5 16.667 16.25 18.3337 13.3333 18.3337H6.66667C3.75 18.3337 2.5 16.667 2.5 14.167V7.08366C2.5 4.58366 3.75 2.91699 6.66667 2.91699H13.3333C16.25 2.91699 17.5 4.58366 17.5 7.08366Z"
        stroke="#516078"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0791 11.4167H13.0866"
        stroke="#516078"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0791 13.9167H13.0866"
        stroke="#516078"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99607 11.4167H10.0036"
        stroke="#516078"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99607 13.9167H10.0036"
        stroke="#516078"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.91209 11.4167H6.91957"
        stroke="#516078"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.91209 13.9167H6.91957"
        stroke="#516078"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const DownCaret = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="#516078"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const WeekCard = ({ week, status }) => {
  return (
    <div className="h-[290px] w-[320px] flex-col items-center justify-center rounded-3xl bg-lesson-card bg-top bg-no-repeat shadow-lg">
      <div className="h-[158px] w-full" />
      <div className="flex h-[132px] w-full items-center justify-center rounded-bl-3xl rounded-br-3xl">
        <div className="flex h-[86px] w-[280px] flex-col justify-evenly gap-y-2">
          <div className="inline-flex w-full items-start justify-between self-stretch">
            <div className="text-[10px] font-medium uppercase leading-[14px] tracking-wide text-slate-500">
              Week {week}
            </div>
            <div className="inline-flex h-[18px] w-[69px] items-center justify-center gap-2.5 rounded-2xl bg-lime-500/20 px-1.5 py-px">
              <div className="text-[8px] font-medium uppercase leading-none text-lime-500">
                {status}
              </div>
            </div>
          </div>
          <div className="text-base font-medium capitalize leading-relaxed text-zinc-900">
            Foundation
          </div>
          <div className="relative h-1.5 w-[279.02px]">
            <div className="absolute left-0 top-0 h-1.5 w-[279.02px] rounded-[52px] bg-gray-200 opacity-60" />
            <div className="absolute left-0 top-0 inline-flex h-1.5 w-[279.01px] items-start justify-start gap-0.5 rounded-[52px]">
              <div className="h-1.5 w-[38.43px] rounded-[52px] bg-lime-500" />
              <div className="h-1.5 w-[38.43px] rounded-[52px] bg-lime-500" />
              <div className="h-1.5 w-[38.43px] rounded-[52px] bg-lime-500" />
              <div className="h-1.5 w-[38.43px] rounded-[52px] bg-lime-500" />
              <div className="h-1.5 w-[38.43px] rounded-[52px] bg-lime-500" />
              <div className="h-1.5 w-[38.43px] rounded-[52px] bg-lime-500" />
              <div className="h-1.5 w-[38.43px] rounded-[52px] bg-lime-500" />
            </div>
          </div>
          <div className="mt-2 inline-flex w-full items-start justify-between self-stretch">
            <div className="text-xs font-medium capitalize leading-[18px] text-slate-500">
              Progress
            </div>
            <div className="text-xs font-bold capitalize leading-[18px] text-zinc-900">
              100%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// The mobile version of the DonateHero is a MESS
// TODO: Fix the mobile version of the DonateHero
const DonateHero = () => {
  return (
    <>
      <div className="relative mx-auto h-80 w-[90%] max-w-[1000px] justify-self-center rounded-3xl bg-primaryred-900 bg-donate-mobile bg-top bg-no-repeat max-md:max-w-[340px] md:h-60 md:bg-donate-desktop md:bg-right">
        <div className="ml-3 mt-3 flex h-[270px] w-[330px] flex-col items-center justify-start max-md:mt-[120px] max-md:hidden max-md:flex-wrap md:h-[210px] md:w-[300px] md:items-start md:justify-between">
          <h3 className="text-[28px] font-bold tracking-wide text-white">
            Donate
          </h3>
          <div className="text-sm font-light text-white">
            Donation. God loves a donor.
          </div>
          <div className="inline-flex items-center justify-start gap-4 gap-x-2 justify-self-end rounded-[34px] bg-off-white/10">
            <div className="inline-flex h-[26px] flex-col items-center justify-center gap-1.5 rounded-[34px] bg-black px-2 py-1">
              <div className="px-1 text-xs font-medium leading-tight text-white">
                One time
              </div>
            </div>
            <div className="inline-flex h-[26px] flex-col items-start justify-center gap-1.5 px-0.5">
              <div className="px-1 text-xs font-normal leading-tight text-white">
                Monthly
              </div>
            </div>
          </div>
          <div className="flex h-12 w-[600px] flex-wrap items-start justify-start gap-3.5 overflow-hidden">
            <div className="inline-flex items-center justify-start gap-3">
              <div className="flex h-12 w-[90px] items-center justify-center gap-2.5 rounded-[40px] border bg-[#865852] px-[31px] py-2 max-md:hidden">
                <div className="text-base font-normal leading-relaxed text-white">
                  $50
                </div>
              </div>
              <div className="flex h-12 w-[90px] items-center justify-center gap-2.5 rounded-[40px] border bg-white px-[31px] py-[11px]">
                <div className="text-base font-medium leading-relaxed text-zinc-900">
                  $100
                </div>
              </div>
              <div className="flex w-[90px] items-center justify-center gap-2.5 self-stretch rounded-[40px] border bg-[#865852] px-[31px] py-2 max-md:hidden">
                <div className="text-base font-normal leading-relaxed text-white">
                  $200
                </div>
              </div>
              <div className="flex h-12 w-[90px] items-center justify-center gap-2.5 rounded-[40px] border bg-[#865852] px-[31px] py-2 max-md:hidden">
                <div className="text-base font-normal leading-relaxed text-white">
                  Custom
                </div>
              </div>
              <div className="flex w-[152px] items-center justify-center gap-2.5 self-stretch rounded-[40px] bg-red-700 px-6 py-[11px]">
                <div className="text-center text-base font-bold leading-relaxed text-white">
                  Donate
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
