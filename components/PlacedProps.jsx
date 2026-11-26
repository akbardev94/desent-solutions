/** Floor objects. Surfboard and bean bag use their own frame so they can be long or wide. */
const FRAME = {
  surfboard: "0 0 72 260",
  beanbag: "0 0 150 116",
  motorcycle: "0 0 220 130",
}

export function PlacedProp({ id, className = "h-16 w-16" }) {
  return (
    <svg viewBox={FRAME[id] || "0 0 80 80"} className={className} aria-hidden="true">
      {draw(id)}
    </svg>
  )
}

function draw(id) {
  if (id === "coffee") return <CoffeeMachine />
  if (id === "grinder") return <Grinder />
  if (id === "surfboard") return <Surfboard />
  if (id === "motorcycle") return <Motorcycle />
  if (id === "beanbag") return <BeanBag />
  if (id === "shelf") return <ToolShelf />
  return null
}

function CoffeeMachine() {
  return (
    <>
      <ellipse cx="40" cy="70" rx="26" ry="5" fill="#000" opacity="0.12" />
      <rect x="16" y="28" width="42" height="34" rx="4" fill="#4a342c" />
      <rect x="16" y="28" width="42" height="8" rx="4" fill="#6b4b3e" />
      <rect x="22" y="40" width="14" height="10" rx="2" fill="#1c1916" />
      <rect x="24" y="42" width="10" height="6" rx="1" fill="#8ec8e6" opacity="0.7" />
      <path d="M58 36h8a7 7 0 0 1 0 14h-8" fill="#6b4b3e" />
      <rect x="30" y="56" width="16" height="4" rx="1" fill="#2c211c" />
      <path d="M28 18c3 4 3 6 0 10M38 14c3 4 3 6 0 10" stroke="#d9d3cb" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="34" y="62" width="10" height="6" rx="1" fill="#f4efe6" />
    </>
  )
}

function Grinder() {
  return (
    <>
      <ellipse cx="40" cy="70" rx="18" ry="4" fill="#000" opacity="0.12" />
      <path d="M28 16h24l-4 14H32z" fill="#ece7e0" />
      <rect x="24" y="30" width="32" height="32" rx="4" fill="#3a3a3a" />
      <circle cx="40" cy="46" r="7" fill="#1c1916" />
      <circle cx="40" cy="46" r="3" fill="#cfc8be" />
      <rect x="36" y="58" width="8" height="6" rx="1" fill="#2a2a2a" />
    </>
  )
}

function Surfboard() {
  return (
    <>
      <ellipse cx="36" cy="250" rx="26" ry="6" fill="#000" opacity="0.16" />
      <path
        d="M36 8c16 14 26 62 28 112 2 52-4 100-16 124-4 8-20 8-24 0C10 220 4 172 6 120 8 70 20 22 36 8z"
        fill="#2aa3b5"
      />
      <path
        d="M36 8c12 16 20 60 21 110 1 46-4 90-12 114l-9 18V8z"
        fill="#176f7e"
        opacity="0.35"
      />
      <path d="M36 22v210" stroke="#f7f3ea" strokeWidth="2" fill="none" />
      <ellipse cx="36" cy="148" rx="7" ry="16" fill="#f7f3ea" opacity="0.28" />
      <path d="M28 228h16" stroke="#176f7e" strokeWidth="3" strokeLinecap="round" />
    </>
  )
}

function Motorcycle() {
  return (
    <>
      <ellipse cx="110" cy="118" rx="92" ry="8" fill="#000" opacity="0.16" />
      <circle cx="48" cy="92" r="26" fill="#1c1916" />
      <circle cx="168" cy="92" r="26" fill="#1c1916" />
      <circle cx="48" cy="92" r="11" fill="#d9d3cb" />
      <circle cx="168" cy="92" r="11" fill="#d9d3cb" />
      <circle cx="48" cy="92" r="4" fill="#1c1916" />
      <circle cx="168" cy="92" r="4" fill="#1c1916" />
      <path d="M150 78c8-16 22-20 34-14" stroke="#c4542c" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M36 78c18-28 48-34 74-28l18 16 36-2c16 0 28 10 30 22l-8 14H58c-14 0-24-8-22-22z" fill="#e06a3a" />
      <path d="M58 62c16-16 40-18 56-6l-8 14-34 4z" fill="#1c1916" />
      <path d="M146 64l22-28" stroke="#2c2c2c" strokeWidth="5" fill="none" strokeLinecap="round" />
      <rect x="158" y="30" width="28" height="7" rx="3" fill="#2c2c2c" />
      <circle cx="186" cy="74" r="7" fill="#f6e2a8" />
      <path d="M70 96h78" stroke="#a34424" strokeWidth="4" strokeLinecap="round" />
    </>
  )
}

function BeanBag() {
  return (
    <>
      <ellipse cx="75" cy="106" rx="62" ry="8" fill="#000" opacity="0.16" />
      <path
        d="M14 64c0-30 24-48 61-48s61 20 61 50-22 42-61 42S14 96 14 64z"
        fill="#e07a4c"
      />
      <path d="M34 58c16-16 52-18 82-2" stroke="#f6c2a4" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M32 74c18 12 52 12 86-2" stroke="#c45a32" strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  )
}

function ToolShelf() {
  return (
    <>
      <ellipse cx="40" cy="70" rx="22" ry="4" fill="#000" opacity="0.12" />
      <rect x="22" y="14" width="5" height="52" fill="#8a6a45" />
      <rect x="53" y="14" width="5" height="52" fill="#8a6a45" />
      <rect x="20" y="18" width="40" height="6" rx="1" fill="#d7b98a" />
      <rect x="20" y="36" width="40" height="6" rx="1" fill="#d7b98a" />
      <rect x="20" y="54" width="40" height="6" rx="1" fill="#d7b98a" />
      <rect x="30" y="22" width="3" height="12" fill="#5c6b73" />
      <rect x="40" y="40" width="10" height="4" rx="1" fill="#c4542c" />
    </>
  )
}
