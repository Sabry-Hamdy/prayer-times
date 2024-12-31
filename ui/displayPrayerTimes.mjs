import { getNextPrayer, startCountdown } from "../helpers/calcNextPrayer.mjs";
import { formatTime } from "../helpers/formatTime.mjs";
import { getFormattedPrayers } from "../helpers/getFormattedPrayers.mjs";

export function displayPrayerTimes({ data, dayOfWeek }) {
  const prayerTimings = getFormattedPrayers(data);
  const nextPrayer = dayOfWeek === "first-day" || dayOfWeek === "second-day" ? getNextPrayer(data) : null;

  const day = document.getElementById(dayOfWeek);
  day.innerHTML = "";

  const dayName = document.createElement("h3");
  dayName.innerHTML = data.date.hijri.weekday.ar;
  dayName.classList.add("day-name");
  day.appendChild(dayName);

  const hr = document.createElement("hr");
  day.appendChild(hr);

  const ul = document.createElement("ul");
  ul.classList.add("prayer-times");
  day.appendChild(ul);

  // Loop over each prayer in the array and create a li element for that
  prayerTimings.map((prayer) => {
    const li = document.createElement("li");

    const p = document.createElement("p");
    p.classList.add("prayer-name");

    p.innerText = prayer.name;

    const span = document.createElement("span");
    span.classList.add("prayer-time");
    span.innerText = formatTime(prayer.time);

    // If this is the next prayer then put the class .active on the element
    if (nextPrayer?.id === prayer.id && dayOfWeek === "first-day") {
      p.classList.add("active");
      span.classList.add("active");

      startCountdown(nextPrayer);
    }

    if (nextPrayer === null && prayer.id === 1 && dayOfWeek === "second-day") {
      p.classList.add("active");
      span.classList.add("active");

      startCountdown(prayer);
    }

    li.appendChild(p);
    li.appendChild(span);
    ul.appendChild(li);
  });
}
