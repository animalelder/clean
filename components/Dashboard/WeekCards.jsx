import { useDashboardContext } from "@/contexts/dashboard/dashboard-provider";
import WeekCard from "./WeekCard";

export default function WeekCards() {
  const { userProgress, weekStaticInfo } = useDashboardContext();

  const weekNumbers = Object.keys(weekStaticInfo).map(Number);

  const calculateProgress = (weekNum) => {
    const key = `week${weekNum}`;
    const daysCompleted = userProgress.daysCompleted[key];
    return Math.round((daysCompleted / 7) * 100);
  };

  return (
    <div className="flex w-full flex-row flex-wrap justify-center gap-3 py-3 md:gap-5">
      {" "}
      {weekNumbers.map((weekNum) => (
        <WeekCard
          key={weekNum}
          week={weekNum}
          title={weekStaticInfo[weekNum].title}
          status={
            calculateProgress(weekNum) === 100 ? "Completed" : "In Progress"
          }
          progress={`${calculateProgress(weekNum)}%`}
        />
      ))}
    </div>
  );
}
