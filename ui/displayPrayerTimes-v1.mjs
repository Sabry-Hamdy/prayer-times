export function displayPrayerTimes({ data, dayOfWeek }) {
  const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = data.timings;
  const prayerTimings = [
    {
      time: Fajr,
      name: "الفجر",
    },
    {
      time: Sunrise,
      name: "الشروق",
    },
    {
      time: Dhuhr,
      name: "الظهر",
    },
    {
      time: Asr,
      name: "العصر",
    },
    {
      time: Maghrib,
      name: "المغرب",
    },
    {
      time: Isha,
      name: "العشاء",
    },
  ];

  const day = document.getElementById("day");
  day.innerHTML = data.date.hijri.weekday.ar;

  const ul = document.getElementById("prayer-times");
  ul.innerHTML = "";

  prayerTimings.map((prayer) => {
    const li = document.createElement("li");

    const p = document.createElement("p");
    p.classList.add("prayer-name");
    p.innerText = prayer.name;

    const span = document.createElement("span");
    span.classList.add("prayer-time");
    span.innerText = prayer.time;

    li.appendChild(p);
    li.appendChild(span);
    ul.appendChild(li);
  });
}
