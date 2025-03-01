export const initialUserInfo = {
  initials: "DA",
  avatarUrl: "",
  firstName: "Donovan",
  fullName: "Donovan Anderson",
  cohort: 23,
  cohortRoman: "XIII",
};

export const initialUserProgress = {
  currentWeek: "1",
  currentDay: "1",
  startDate: new Date(),
  previousDay: null,
  currentDayTitle: "Sanctification",
  daysCompleted: {
    totalDays: 0,
    week1: 0,
    week2: 0,
    week3: 0,
    week4: 0,
    week5: 0,
    week6: 0,
    week7: 0,
  },
};

export const initialWeekStaticInfo = {
  1: {
    title: "Introduction",
  },
  2: {
    title: "Soul Ties",
  },
  3: {
    title: "Generational Curses",
  },
  4: {
    title: "The Tools",
  },
  5: {
    title: "Exit Interview",
  },
};

export const surveyQuestions = [
  { id: 1, question: "I felt God's presence in my day today", type: "likert" },
  {
    id: 2,
    question: "I was able to apply today's devotional to my life",
    type: "likert",
  },
  { id: 3, question: "I felt peace throughout my day", type: "likert" },
  { id: 4, question: "I was able to resist temptation today", type: "likert" },
  {
    id: 5,
    question: "I spent quality time in prayer and scripture",
    type: "likert",
  },
];

// Updated daily surveys structure that tracks responses for each day
export const initialDailySurveys = {
  week1: {
    day1: {
      title: "Sanctification",
      completed: false,
      responses: {}, // This will store the answers keyed by question ID
    },
    day2: {
      title: "Faith Foundation",
      completed: false,
      responses: {},
    },
    // Add entries for days 3-7 following the same pattern
  },
  // Add entries for weeks 2-7 following the same pattern
};
