import { getFormattedPrayers } from "./getFormattedPrayers.mjs";

export function calcNextPrayer(data) {
  const prayerTimings = getFormattedPrayers(data);

  const currentTime = new Date();

  const currentDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());

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
