let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth() + 1;
let currentDay = date.getDate() - 1;
let currentHours = date.getHours();
let currentMinutes = date.getMinutes();
let currentSeconds = date.getSeconds();
let currentFullMinutes = currentHours * 60 + currentMinutes;
let secondDay = currentDay + 1;
let thirdDay = currentDay + 2;
let fourthDay = currentDay + 3;
let currentDayText = document.getElementById("first-day-parent");
let secondDayText = document.getElementById("second-day-parent");
let thirdDayText = document.getElementById("third-day-parent");
let fourthDayText = document.getElementById("fourth-day-parent");
let dayCounter = 0;
let cycleFinished = false;
let nextPrayer = undefined;
let nextPrayerEn;
let nextPrayerFullMinutes;
let nextPrayerMinutes;
let nextPrayerHours;
let remainingHours;
let remainingMinutes;
let remainingSeconds;
let timeId;

const city = document.getElementById("egypt-capitals");
const prayersAr = {
  Fajr: "الفجر",
  Sunrise: "الشروق",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};

// Running for the selected value in the select element
runRequests();

// Add event listener for the location selected
city.addEventListener("change", (event) => {
  let cityName = event.target.value;
  dayCounter = 0;
  cycleFinished = false;
  nextPrayer = undefined;
  clearInterval(timeId);
  runRequests(cityName);
});

// Get General Prayers Info
function getInfo(day, cityName) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.aladhan.com/v1/calendarByCity/${currentYear}/${currentMonth}?city=${cityName}&country=egypt&method=5`)
      .then((response) => {
        // Assigning Day and Date Info
        let gregorianDate = response.data.data[day].date.readable;
        let hijriYear = response.data.data[day].date.hijri.year;
        let hijriMonth = response.data.data[day].date.hijri.month.ar;
        let hijriDay = response.data.data[day].date.hijri.weekday.ar;
        let hijriDayNumber = response.data.data[day].date.hijri.day;
        let formattedHijriDate = [hijriDayNumber, hijriMonth, hijriYear].join(" ");

        getPrayersInfo(response, day, hijriDay);

        // Print the Date if it's not
        if (cycleFinished === false) {
          printDate(formattedHijriDate);
          cycleFinished = true;
        }

        resolve();
      })
      .catch((error) => {
        console.error(error.message);
        reject();
      });
  });
}

// Print out Date to the Screen
function printDate(hijriDate) {
  document.getElementById("current-date").innerHTML = hijriDate;
}

// Get the info of the prayers of each day of the four days
function getPrayersInfo(response, day, hijriDay) {
  // Assigning Prayers Info
  let prayerTimes = response.data.data[day].timings;
  let prayers = Object.keys(prayerTimes);
  const timeRegex = /\d{2}:\d{2}/;
  let prayerNames = [];
  let prayerNamesAr = [];

  // Pushing Names of Prayers to an Array
  for (let i = 0; i < 7; i++) {
    prayerNames.push(prayers[i]);
  }
  // Removing Sunset from the Array
  let indexOfSunset = prayerNames.indexOf("Sunset");
  prayerNames.splice(indexOfSunset, 1);

  let prayersNameAndTime = new Object();
  for (let prayer of prayerNames) {
    prayersNameAndTime[prayersAr[prayer]] = prayerTimes[prayer].match(timeRegex).toString();
    prayerNamesAr.push(prayersAr[prayer]);
    if (checkNextPrayer(prayersNameAndTime, prayersAr[prayer]) === true) {
      if (cycleFinished === false) {
        nextPrayer = prayersAr[prayer];
        nextPrayerEn = prayer;
        document.getElementById("next-prayer-name").innerHTML = nextPrayer;
        timeId = setInterval(remainingTime, 1000);
      }
    }
  }

  // Print Prayers Arabic names and their Times for each Day
  printDays(hijriDay, prayersNameAndTime, prayerNamesAr, nextPrayerEn, prayerNames);
}

// Print prayer times for each day
function printDays(hijriDay, prayersNameAndTime, prayerNamesAr, nextPrayerEn, prayerNamesEn) {
  let days = document.getElementsByClassName("day");
  let ul = document.createElement("ul");

  days[dayCounter].innerHTML = "";

  days[dayCounter].innerHTML += `
          <h3 class="day-name">${hijriDay}</h3>
          <hr />
          `;
  days[dayCounter].appendChild(ul);

  for (let i = 0; i < prayerNamesAr.length; i++) {
    let li = document.createElement("li");
    let p = document.createElement("p");
    let span = document.createElement("span");
    let pText = document.createTextNode(prayerNamesAr[i]);
    let spanText = document.createTextNode(prayersNameAndTime[prayerNamesAr[i]]);
    p.className = "prayer-name";
    if (cycleFinished === false) {
      if (prayerNamesEn[i] === nextPrayerEn) {
        p.classList.add("active");
      }
    }
    span.className = "prayer-time";

    ul.appendChild(li);
    li.appendChild(p);
    li.appendChild(span);
    p.appendChild(pText);
    span.appendChild(spanText);
  }

  dayCounter++;
}

function runRequests(cityName = city.value) {
  getInfo(currentDay, cityName).then(() => {
    getInfo(secondDay, cityName).then(() => {
      getInfo(thirdDay, cityName).finally(() => {
        getInfo(fourthDay, cityName);
      });
    });
  });
}

function checkNextPrayer(prayersNameAndTime, prayer) {
  if (nextPrayer === undefined) {
    let hoursAndMinutes = prayersNameAndTime[prayer].split(":");
    let hours = Number(hoursAndMinutes[0]);
    let minutes = Number(hoursAndMinutes[1]);
    nextPrayerFullMinutes = hours * 60 + minutes;

    if (currentFullMinutes - nextPrayerFullMinutes < 0) {
      nextPrayer = prayer;
      nextPrayerMinutes = minutes;
      nextPrayerHours = hours;
      return true;
    }
  }
}

function remainingTime() {
  // Check for the new seconds, minutes and hours each second
  currentSeconds = new Date().getSeconds();
  currentMinutes = new Date().getMinutes();
  currentHours = new Date().getHours();

  remainingHours = subtractFromBiggerNum(nextPrayerHours, currentHours);
  remainingMinutes = subtractFromBiggerNum(nextPrayerMinutes, currentMinutes);
  document.getElementById("time-remaining").innerHTML = remainingHours + ":" + remainingMinutes + ":" + (60 - currentSeconds);
}

function subtractFromBiggerNum(num1, num2) {
  if (num1 > num2) {
    return num1 - num2;
  } else {
    return num2 - num1;
  }
}
