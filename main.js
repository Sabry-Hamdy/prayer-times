import { calcNextPrayer } from "./helpers/calcNextPrayer.mjs";
import { getPrayers } from "./services/apiPrayerTimes.mjs";
import { displayHijriDate } from "./ui/displayHijriDate.mjs";
import { displayPrayerTimes } from "./ui/displayPrayerTimes.mjs";

async function fetchAndStorePrayers() {
  const promises = [];

  for (let i = 1; i <= 4; i++) {
    promises.push(getPrayers(i).then((res) => window.localStorage.setItem(`data-${i}`, JSON.stringify(res))));
  }

  await Promise.all(promises);
}

async function displayPrayers() {
  await fetchAndStorePrayers();

  const dataPerDay = {
    dayOne: JSON.parse(localStorage.getItem("data-1")),
    dayTwo: JSON.parse(localStorage.getItem("data-2")),
    dayThree: JSON.parse(localStorage.getItem("data-3")),
    dayFour: JSON.parse(localStorage.getItem("data-4")),
  };

  displayHijriDate(dataPerDay.dayOne);

  displayPrayerTimes({ data: dataPerDay.dayOne, dayOfWeek: "first-day" });
  displayPrayerTimes({ data: dataPerDay.dayTwo, dayOfWeek: "second-day" });
  displayPrayerTimes({ data: dataPerDay.dayThree, dayOfWeek: "third-day" });
  displayPrayerTimes({ data: dataPerDay.dayFour, dayOfWeek: "fourth-day" });
}

displayPrayers();

// getPrayers(1)
//   .then((res) => {
//     console.log("before fetching");
//     window.localStorage.setItem(`data-${1}`, JSON.stringify(res));

//     for (let i = 2; i <= 4; i++) {
//       getPrayers(i).then((res) => window.localStorage.setItem(`data-${i}`, JSON.stringify(res)));
//     }
//     console.log("after fetching");
//   })
//   .then(() => {
//     const dataPerDay = {
//       dayOne: JSON.parse(localStorage.getItem("data-1")),
//       dayTwo: JSON.parse(localStorage.getItem("data-2")),
//       dayThree: JSON.parse(localStorage.getItem("data-3")),
//       dayFour: JSON.parse(localStorage.getItem("data-4")),
//     };
//     console.log("data recieved from local storage");

//     displayHijriDate(dataPerDay.dayOne);

//     displayPrayerTimes({ data: dataPerDay.dayOne, dayOfWeek: "first-day" });
//     displayPrayerTimes({ data: dataPerDay.dayTwo, dayOfWeek: "second-day" });
//     displayPrayerTimes({ data: dataPerDay.dayThree, dayOfWeek: "third-day" });
//     displayPrayerTimes({ data: dataPerDay.dayFour, dayOfWeek: "fourth-day" });
//   });
// localStorage.clear();
