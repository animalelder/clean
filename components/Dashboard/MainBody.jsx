import { FaChevronDown, FaRegCalendarAlt } from "react-icons/fa";
import DonateHero from "@/components/Dashboard/DonateHero";
import WeekCard from "@/components/Dashboard/WeekCard";
import intToRoman from "@/lib/intToRoman";

export default function MainBody({ userProgress, userInfo }) {
  const cohortRoman = intToRoman(userInfo.cohort);

  return (
    <div className="relative mx-auto mb-8 mt-24 flex min-h-screen w-full max-w-[1200px] flex-col items-start gap-y-5 space-y-4 pt-12 max-lg:mx-2">
      <div className="flex w-full flex-wrap items-center justify-start gap-2 md:gap-y-5">
        <h1 className="text-3xl font-bold leading-relaxed md:text-4xl">
          Hello, {userInfo.fullName}
        </h1>
        <FaChevronDown size={16} />

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
          CLEAN {cohortRoman}
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
          <FaRegCalendarAlt />
          Group:
          <div className="font-medium leading-snug">Clean {cohortRoman}</div>
          <FaChevronDown size={8} />
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
  );
}
