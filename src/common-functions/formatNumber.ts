export function formatNumber(number: number, decimalDigits: number) {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: decimalDigits,
    maximumFractionDigits: decimalDigits,
  });
}
