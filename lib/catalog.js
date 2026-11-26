/**
 * Prototype catalog for the workspace designer.
 * Weekly rates follow the public monis.rent ranges (furniture from $3,
 * monitors from $5, accessories from $0.50). They are not a live inventory feed.
 */

export const DESKS = [
  {
    id: "electric",
    slot: "desk",
    name: "Electric Lift Desk",
    spec: "70–118 cm · quiet motor · 140×70",
    weekly: 11,
    blurb: "Stand for calls, sit for deep work.",
  },
  {
    id: "mechanical",
    slot: "desk",
    name: "Crank Adjustable Desk",
    spec: "70–120 cm · no power needed · 120×70",
    weekly: 6,
    blurb: "A solid desk for a shorter stay.",
  },
]

export const CHAIRS = [
  {
    id: "mesh",
    slot: "chair",
    name: "Aero Mesh Chair",
    spec: "4D arms · headrest · lumbar",
    weekly: 8,
    blurb: "All-day support in the Bali heat.",
  },
  {
    id: "task",
    slot: "chair",
    name: "Lite Task Chair",
    spec: "Breathable seat · simple height lift",
    weekly: 4,
    blurb: "Enough chair for a few focused weeks.",
  },
  {
    id: "guest",
    slot: "chair",
    name: "Guest Chair",
    spec: "Compact seat · no arms",
    weekly: 3,
    blurb: "A third seat for a pair working together.",
  },
]

export const MONITORS = [
  {
    id: "fhd24",
    slot: "monitor",
    name: '24" Full HD',
    spec: "1080p · 100 Hz · IPS",
    weekly: 5,
    span: 1,
  },
  {
    id: "uhd27",
    slot: "monitor",
    name: '27" 4K',
    spec: "3840×2160 · USB-C",
    weekly: 9,
    span: 1,
  },
  {
    id: "curve34",
    slot: "monitor",
    name: '34" Curved',
    spec: "Ultrawide · 180 Hz · uses two slots",
    weekly: 12,
    span: 2,
  },
]

export const ACCESSORIES = [
  {
    id: "lamp",
    slot: "accessory",
    name: "Smart LED Lamp",
    spec: "Warm to cool · dimmable",
    weekly: 2,
  },
  {
    id: "plant",
    slot: "accessory",
    name: "Floor Plant",
    spec: "A little green beside the window",
    weekly: 1,
  },
  {
    id: "keyboard",
    slot: "accessory",
    name: "Mechanical Keyboard",
    spec: "Quiet enough for a villa",
    weekly: 2,
  },
  {
    id: "mouse",
    slot: "accessory",
    name: "Silent Mouse",
    spec: "Light and wireless",
    weekly: 1,
  },
  {
    id: "box",
    slot: "accessory",
    name: "Storage Box",
    spec: "Sits beside the desk",
    weekly: 1,
  },
]

/** Bottom zones from the workspace sketch. Each tile is its own weekly rental. */
export const ZONE_ITEMS = [
  { id: "coffee", zone: "coffee", slot: "accessory", name: "Coffee Machine", action: "Add Coffee Machine", weekly: 5 },
  { id: "grinder", zone: "coffee", slot: "accessory", name: "Coffee Grinder", action: "Add Grinder", weekly: 2 },
  { id: "surfboard", zone: "outdoor", slot: "accessory", name: "Surfboard", action: "Add Surfboard", weekly: 6 },
  { id: "motorcycle", zone: "outdoor", slot: "accessory", name: "Motorcycle", action: "Add Motorcycle", weekly: 22 },
  { id: "beanbag", zone: "relax", slot: "accessory", name: "Bean Bag", action: "Add Bean Bag", weekly: 3 },
  { id: "shelf", zone: "garage", slot: "accessory", name: "Tool Shelf", action: "Add Tool Shelf", weekly: 3 },
]

export const ZONES = [
  { id: "coffee", name: "Coffee Station" },
  { id: "outdoor", name: "Outdoor Gear" },
  { id: "relax", name: "Relax Zone" },
  { id: "garage", name: "Garage Space" },
].map((zone) => ({
  ...zone,
  items: ZONE_ITEMS.filter((item) => item.zone === zone.id),
}))

export const EXTRAS = [...ACCESSORIES, ...ZONE_ITEMS]

export const PRESETS = [
  {
    id: "coder",
    name: "Focus coder",
    detail: "Lift desk, mesh chair, 27\" 4K",
    deskId: "electric",
    chairId: "mesh",
    monitorCounts: { uhd27: 1 },
    accessoryIds: ["lamp", "keyboard", "mouse"],
  },
  {
    id: "dual",
    name: "Dual screen",
    detail: "Two displays on the lift desk",
    deskId: "electric",
    chairId: "mesh",
    monitorCounts: { fhd24: 1, uhd27: 1 },
    accessoryIds: ["keyboard", "mouse", "plant"],
  },
  {
    id: "light",
    name: "Light week",
    detail: "Crank desk, simple chair, lamp",
    deskId: "mechanical",
    chairId: "task",
    monitorCounts: {},
    accessoryIds: ["lamp", "plant"],
  },
]

export const AREAS = ["Canggu", "Seminyak", "Ubud", "Uluwatu", "Sanur", "Denpasar", "Jimbaran"]

export const GROUPS = {
  desk: DESKS,
  chair: CHAIRS,
  monitor: MONITORS,
  accessory: ACCESSORIES,
}
