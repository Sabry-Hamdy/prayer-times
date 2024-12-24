export function displayHijriDate({ date = {} }) {
  const day = date.hijri.day;
  const month = date.hijri.month.ar;
  const year = date.hijri.year;

  const dateSpan = document.getElementById("hijri-date");
  const daySpan = document.createElement("span");
  const monthSpan = document.createElement("span");
  monthSpan.classList.add("month");
  const yearSpan = document.createElement("span");

  daySpan.innerText = day;
  monthSpan.innerText = month;
  yearSpan.innerText = year;

  dateSpan.innerHTML = "";
  dateSpan.appendChild(daySpan);
  dateSpan.appendChild(monthSpan);
  dateSpan.appendChild(yearSpan);
}
