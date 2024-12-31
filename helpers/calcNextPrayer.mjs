import { getFormattedPrayers } from "./getFormattedPrayers.mjs";

let NEXT_PRAYER = {};

export function getNextPrayer(data) {
  const prayerTimings = getFormattedPrayers(data);

  const currentTime = new Date();

  prayerTimings.sort((a, b) => 1 * Number(a.time.split(":").at(0)) - Number(b.time.split(":").at(0)));

  for (const prayer of prayerTimings) {
    const [hours, minutes] = prayer.time.split(":").map(Number);

    if (currentTime.getHours() < hours) {
      NEXT_PRAYER = prayer;

      return prayer;
    }

    if (currentTime.getHours() === hours && currentTime.getMinutes() < minutes) {
      NEXT_PRAYER = prayer;

      return prayer;
    }

    // End of day, no prayers left
    if (prayer === prayerTimings.at(5)) {
      return null;
    }
  }
}

export function calcNextPrayer() {
  setInterval(() => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const nextPrayerHours = NEXT_PRAYER.time.split(":").map(Number).at(0);
    const nextPrayerMins = NEXT_PRAYER.time.split(":").map(Number).at(1);

    // console.log("-------------------");
    // console.log(hours, minutes);
    // console.log(nextPrayerHours, nextPrayerMins);
    // console.log("-------------------");
    const remainingTime = {
      hours: Math.abs(hours - nextPrayerHours)
        .toString()
        .padStart(2, 0),
      minutes: Math.abs(60 - (60 - nextPrayerMins + minutes) - 1)
        .toString()
        .padStart(2, 0),
      seconds: (60 - seconds).toString().padStart(2, 0),
    };

    // console.log(remainingTime.hours, remainingTime.minutes);

    document.getElementById("next-prayer-name").textContent = NEXT_PRAYER.name;
    document.getElementById("time-remaining").textContent = `${remainingTime.hours}:${remainingTime.minutes}:${remainingTime.seconds}`;
  }, 1000);
}
