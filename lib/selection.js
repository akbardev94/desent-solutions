import { CHAIRS, DESKS, EXTRAS, MONITORS } from "@/lib/catalog"

/** The sketch shows three screens across the desk. An ultrawide uses two of them. */
export const MONITOR_SLOTS = 3

export const EMPTY_SELECTION = {
  deskId: null,
  chairId: null,
  monitorCounts: {},
  accessoryIds: [],
  weeks: 4,
}

/**
 * Drop unknown ids so a saved setup cannot reference a product that no longer exists.
 *
 * @param {unknown} value
 */
export function normalizeSelection(value) {
  const source = value && typeof value === "object" ? value : {}
  const deskId = DESKS.some((item) => item.id === source.deskId) ? source.deskId : null
  const chairId = CHAIRS.some((item) => item.id === source.chairId) ? source.chairId : null
  const accessoryIds = Array.isArray(source.accessoryIds)
    ? [...new Set(source.accessoryIds.filter((id) => EXTRAS.some((item) => item.id === id)))]
    : []
  const weeks = [1, 4, 12].includes(source.weeks) ? source.weeks : 4

  return {
    deskId,
    chairId,
    monitorCounts: sanitizeMonitors(source.monitorCounts),
    accessoryIds,
    weeks,
  }
}

/**
 * Clicking the selected desk or chair again clears it.
 *
 * @param {string | null} currentId
 * @param {string} nextId
 */
export function selectSingle(currentId, nextId) {
  return currentId === nextId ? null : nextId
}

/**
 * @param {string[]} ids
 * @param {string} id
 */
export function toggleAccessory(ids, id) {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]
}

/**
 * Latest monitor choice wins when the desk runs out of slots.
 * An ultrawide clears every other screen because it needs the full desk.
 *
 * @param {Record<string, number>} counts
 * @param {string} id
 * @param {number} qty
 */
export function setMonitorQty(counts, id, qty) {
  const monitor = MONITORS.find((item) => item.id === id)
  if (!monitor) return counts

  if (qty <= 0) {
    const next = { ...counts }
    delete next[id]
    return next
  }

  if (monitor.span === 2) {
    const next = { [id]: 1 }
    let used = 2
    for (const [key, count] of Object.entries(counts)) {
      if (key === id) continue
      const item = MONITORS.find((entry) => entry.id === key)
      if (!item || item.span === 2) continue
      const affordable = Math.min(count, MONITOR_SLOTS - used)
      if (affordable > 0) {
        next[key] = affordable
        used += affordable
      }
    }
    return next
  }

  const capped = Math.min(MONITOR_SLOTS, qty)
  const next = { [id]: capped }
  let used = monitor.span * capped

  for (const [key, count] of Object.entries(counts)) {
    if (key === id) continue
    const item = MONITORS.find((entry) => entry.id === key)
    if (!item || item.span === 2) continue
    const span = item.span * count
    if (used + span <= MONITOR_SLOTS) {
      next[key] = count
      used += span
    }
  }

  return next
}

/**
 * Fill the desk from the left: another 24", then a 27", then the ultrawide.
 *
 * @param {Record<string, number>} counts
 */
export function addNextMonitor(counts) {
  if (canAddMonitor(counts, "fhd24")) return setMonitorQty(counts, "fhd24", (counts.fhd24 || 0) + 1)
  if (canAddMonitor(counts, "uhd27")) return setMonitorQty(counts, "uhd27", (counts.uhd27 || 0) + 1)
  if (canAddMonitor(counts, "curve34")) return setMonitorQty(counts, "curve34", 1)
  return counts
}

/**
 * @param {Record<string, number>} counts
 */
export function slotsUsed(counts) {
  return Object.entries(counts).reduce((sum, [id, qty]) => {
    const item = MONITORS.find((entry) => entry.id === id)
    return sum + (item ? item.span * qty : 0)
  }, 0)
}

/**
 * @param {Record<string, number>} counts
 * @param {string} id
 */
export function canAddMonitor(counts, id) {
  const monitor = MONITORS.find((item) => item.id === id)
  if (!monitor) return false

  const current = counts[id] || 0
  // The latest screen wins, including swapping a pair for the ultrawide.
  if (monitor.span === 2) return current === 0

  const withoutWide = Object.fromEntries(
    Object.entries(counts).filter(([key]) => MONITORS.find((item) => item.id === key)?.span !== 2)
  )
  const standardQty = withoutWide[id] || 0
  if (standardQty >= MONITOR_SLOTS) return false

  const others = slotsUsed(withoutWide) - standardQty
  return others + standardQty + 1 <= MONITOR_SLOTS
}

/**
 * One visual screen per unit, in catalog order, so the stage matches the receipt.
 *
 * @param {Record<string, number>} counts
 */
export function flattenMonitors(counts) {
  const screens = []

  for (const monitor of MONITORS) {
    const qty = counts[monitor.id] || 0
    for (let index = 0; index < qty; index += 1) {
      screens.push({ ...monitor, key: `${monitor.id}-${index}` })
    }
  }

  return screens
}

/**
 * @param {ReturnType<typeof normalizeSelection>} selection
 */
export function lineItems(selection) {
  const lines = []
  const desk = DESKS.find((item) => item.id === selection.deskId)
  const chair = CHAIRS.find((item) => item.id === selection.chairId)

  if (desk) lines.push({ ...desk, qty: 1 })
  if (chair) lines.push({ ...chair, qty: 1 })

  for (const monitor of MONITORS) {
    const qty = selection.monitorCounts[monitor.id] || 0
    if (qty > 0) lines.push({ ...monitor, qty })
  }

  for (const accessory of EXTRAS) {
    if (selection.accessoryIds.includes(accessory.id)) lines.push({ ...accessory, qty: 1 })
  }

  return lines
}

function sanitizeMonitors(counts) {
  if (!counts || typeof counts !== "object") return {}

  let used = 0
  const next = {}

  for (const monitor of MONITORS) {
    const raw = Number(counts[monitor.id]) || 0
    if (raw <= 0) continue

    const qty = monitor.span === 2 ? 1 : Math.min(MONITOR_SLOTS, Math.floor(raw))
    const span = monitor.span * qty
    if (monitor.span === 2 && used > 0) continue
    if (used + span > MONITOR_SLOTS) continue

    next[monitor.id] = qty
    used += span
  }

  return next
}
