export function formatMDY(dateString: string) {
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

export function getFormattedDate() {
  const date = new Date();

  return date.toLocaleDateString("en-US", {
    timeZone: "Asia/Manila",
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function getTodayDate() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(new Date());
}

 
export function getTodayDateSQL() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}
