export function formatDate(date: Date | string | number | undefined, opts: Intl.DateTimeFormatOptions = {}) {
  if (!date) return "";

  try {
    return new Intl.DateTimeFormat("en-US", {
      month: opts.month ?? "long",
      day: opts.day ?? "numeric",
      year: opts.year ?? "numeric",
      ...opts,
    }).format(new Date(date));
  } catch (_err) {
    return "";
  }
}

export function formatDateTimeUTC(date: Date | string | number | undefined, opts: Intl.DateTimeFormatOptions = {}) {
  if (!date) return "";

  try {
    const dateObj = new Date(date);

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "UTC",
    });

    const timeFormatter = new Intl.DateTimeFormat("en-US", {
      hour: opts.hour ?? "2-digit",
      minute: opts.minute ?? "2-digit",
      second: opts.second ?? "2-digit",
      hour12: opts.hour12 ?? false,
      timeZone: "UTC",
    });

    // Format date as YYYY-MM-DD
    const [month, day, year] = dateFormatter.format(dateObj).split("/");
    const formattedDate = `${year}-${month}-${day}`;

    return `${formattedDate}  ${timeFormatter.format(dateObj)}`;
  } catch (_err) {
    return "";
  }
}
