import { getFormattedPrayers } from "./getFormattedPrayers.mjs";

export function getNextPrayer(data) {
  const prayerTimings = getFormattedPrayers(data);

  const currentTime = new Date();

  prayerTimings.sort((a, b) => 1 * Number(a.time.split(":").at(0)) - Number(b.time.split(":").at(0)));

  for (const prayer of prayerTimings) {
    const [hours, minutes] = prayer.time.split(":").map(Number);

    if (currentTime.getHours() < hours) {
      return prayer;
    }

    if (currentTime.getHours() === hours && currentTime.getMinutes() < minutes) {
      return prayer;
    }

    // End of day, no prayers left
    if (prayer === prayerTimings.at(5)) {
      return null;
    }
  }
}

function calcNextPrayer(nextPrayer) {
  // Get the current time
  const now = new Date();

  // Parse the Adhan time
  const [adhanHours, adhanMinutes] = nextPrayer.time.split(":").map(Number);

  // Create a Date object for the Adhan time today
  const adhanDate = new Date();
  adhanDate.setHours(adhanHours, adhanMinutes, 0, 0);

  // Calculate the difference in milliseconds
  let difference = adhanDate - now;

  // If the Adhan time has already passed today, calculate for tomorrow
  if (difference < 0) {
    adhanDate.setDate(adhanDate.getDate() + 1);
    difference = adhanDate - now;
  }

  // Convert the difference to hours, minutes, and seconds
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // Return the countdown as a formatted string

  document.getElementById("next-prayer-name").textContent = nextPrayer.name;
  document.getElementById("time-remaining").textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function startCountdown(nextPrayer) {
  // Initial call to set the countdown immediately
  calcNextPrayer(nextPrayer);

  // Set an interval to update the countdown every second
  setInterval(() => {
    calcNextPrayer(nextPrayer);
  }, 1000);
}
