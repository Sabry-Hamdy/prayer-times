export function getFormattedPrayers(data) {
  const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = data.timings;

  const prayerTimings = [
    {
      id: 1,
      time: Fajr,
      nameEn: "Fajr",
      name: "الفجر",
    },
    {
      id: 2,
      time: Sunrise,
      nameEn: "Sunrise",
      name: "الشروق",
    },
    {
      id: 3,
      time: Dhuhr,
      nameEn: "Dhuhr",
      name: "الظهر",
    },
    {
      id: 4,
      time: Asr,
      nameEn: "Asr",
      name: "العصر",
    },
    {
      id: 5,
      time: Maghrib,
      nameEn: "Maghrib",
      name: "المغرب",
    },
    {
      id: 6,
      time: Isha,
      nameEn: "Isha",
      name: "العشاء",
    },
  ];

  return prayerTimings;
}
