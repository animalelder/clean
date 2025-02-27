import { FaChevronDown, FaRegCalendarAlt } from "react-icons/fa";
import WeekCard from "./WeekCard";
import WeekCards from "./WeekCards";

export default function CardSection({ userInfo, userProgress, cohortText }) {
  return (
    <>
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
          <div className="font-medium leading-snug">Clean {cohortText}</div>
          <FaChevronDown size={8} />
        </div>
      </div>
      <WeekCards
        userInfo={userInfo}
        userProgress={userProgress}
      />
    </>
  );
}
