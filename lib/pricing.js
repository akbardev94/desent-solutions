export const DURATIONS = [
  { weeks: 1, label: "1 week", discount: 0 },
  { weeks: 4, label: "4 weeks", discount: 0.08 },
  { weeks: 12, label: "12 weeks", discount: 0.15 },
]

/**
 * Price a set of catalog lines for a rental length.
 * Longer stays take a standing discount so the total is not just weekly × weeks.
 *
 * @param {Array<{ weekly: number, qty: number }>} lines
 * @param {number} weeks
 */
export function priceQuote(lines, weeks) {
  const duration = DURATIONS.find((item) => item.weeks === weeks) ?? DURATIONS[1]
  const weekly = lines.reduce((sum, line) => sum + line.weekly * line.qty, 0)
  const subtotal = weekly * duration.weeks
  const discount = Math.round(subtotal * duration.discount)

  return {
    lines,
    weekly,
    weeks: duration.weeks,
    discountRate: duration.discount,
    discount,
    total: subtotal - discount,
  }
}

/**
 * @param {number} amount
 * @returns {string}
 */
export function formatMoney(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}
