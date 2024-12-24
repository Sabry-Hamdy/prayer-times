import { calcNextPrayer } from "./helpers/calcNextPrayer.mjs";
import { getPrayers } from "./services/apiPrayerTimes.mjs";
import { displayHijriDate } from "./ui/displayHijriDate.mjs";
import { displayPrayerTimes } from "./ui/displayPrayerTimes.mjs";

for (let i = 1; i <= 4; i++) {
  getPrayers(i).then((res) => window.localStorage.setItem(`data-${i}`, JSON.stringify(res)));
}

const dataPerDay = {
  dayOne: JSON.parse(localStorage?.getItem("data-1")),
  dayTwo: JSON.parse(localStorage?.getItem("data-2")),
  dayThree: JSON.parse(localStorage?.getItem("data-3")),
  dayFour: JSON.parse(localStorage?.getItem("data-4")),
};

displayHijriDate(dataPerDay.dayOne);

displayPrayerTimes({ data: dataPerDay.dayOne, dayOfWeek: "first-day" });
displayPrayerTimes({ data: dataPerDay.dayTwo, dayOfWeek: "second-day" });
displayPrayerTimes({ data: dataPerDay.dayThree, dayOfWeek: "third-day" });
displayPrayerTimes({ data: dataPerDay.dayFour, dayOfWeek: "fourth-day" });

// localStorage.clear();
