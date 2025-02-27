import WeekCard from "./WeekCard";

export default function WeekCards({ userInfo, userProgress }) {
  // TO DO: find a way to create an array with the DaysCompleted for each day divided by 7
  // const progress = daysCompleted.week1 through daysCompleted.week7 / 7 rounded to a whole number percentage

  return (
    <div className="flex w-full flex-row flex-wrap justify-center gap-3 py-3 md:gap-5">
      <WeekCard
        week={1}
        title={""}
        status={"Completed"}
        progress={""}
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
  );
}
