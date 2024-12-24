export function formatTime(time) {
  let [hours, minutes] = time.split(":");
  hours = (Number(hours) > 12 ? Number(hours) - 12 : Number(hours)).toString().padStart(2, 0);
  minutes = Number(minutes).toString().padStart(2, 0);

  return [hours, minutes].join(":");
}
