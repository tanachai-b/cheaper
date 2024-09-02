export function formatNumber(number: number, decimalDigits: number) {
  try {
    return number.toLocaleString("en-US", {
      minimumFractionDigits: decimalDigits,
      maximumFractionDigits: decimalDigits,
    });
  } catch {
    return "~";
  }
}
