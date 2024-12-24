import { getFormattedDate } from "../helpers/formatDate.mjs";

export async function getPrayers(dayOfWeek) {
  const res = await fetch(`https://api.aladhan.com/v1/timingsByCity/${getFormattedDate(dayOfWeek)}?city=Alexandria&country=egypt`);

  if (!res.ok) {
    throw new Error("Could not fetch prayer times");
  }

  const { data } = await res.json();

  return data;
}
