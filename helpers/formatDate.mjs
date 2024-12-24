// Returns a DD-MM-YYYY date
export function getFormattedDate(dayOfWeek = 0) {
  const date = new Date();
  date.setDate(date.getDate() + (dayOfWeek - 1));

  const day = date.getDate().toString().padStart(2, 0);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
