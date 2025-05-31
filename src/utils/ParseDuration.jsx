export const ParseDuration = (duration) => {
  if (typeof duration === "number") {
    return duration;
  }

  if (typeof duration === "string") {
    const trimmed = duration.trim();

    // Jika string hanya berisi angka
    if (/^\d+$/.test(trimmed)) {
      return parseInt(trimmed, 10);
    }

    // Jika string seperti "6 bulan", ambil angka saja
    const match = trimmed.match(/\d+/);
    if (match) {
      return parseInt(match[0], 10);
    }
  }

  return ""; // fallback jika tidak valid
};
