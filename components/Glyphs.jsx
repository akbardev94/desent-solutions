/** Line icons that follow the workspace sketch. */
export function Glyph({ id, className = "h-11 w-11" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {draw(id)}
    </svg>
  )
}

function draw(id) {
  if (id === "mesh" || id === "task" || id === "guest") return <ChairGlyph variant={id} />
  if (id === "electric" || id === "mechanical") return <DeskGlyph dark={id === "mechanical"} />
  if (id === "fhd24" || id === "uhd27" || id === "curve34") return <MonitorGlyph wide={id === "curve34"} />
  if (id === "lamp") return <LampGlyph />
  if (id === "plant") return <PlantGlyph />
  if (id === "keyboard") return <KeyboardGlyph />
  if (id === "mouse") return <MouseGlyph />
  if (id === "box" || id === "shelf") return <BoxGlyph />
  if (id === "coffee") return <CoffeeGlyph />
  if (id === "grinder") return <GrinderGlyph />
  if (id === "surfboard") return <SurfGlyph />
  if (id === "motorcycle") return <MotoGlyph />
  if (id === "beanbag") return <BeanGlyph />
  return null
}

function ChairGlyph({ variant }) {
  const back = variant === "guest" ? "M24 12h16v16H24z" : "M18 10h28v18H18z"
  return (
    <>
      <path d={back} />
      {variant === "mesh" && <path d="M22 16h20M22 21h20" />}
      <path d="M14 28h36v6H14z" />
      <path d="M32 34v8" />
      <path d="M18 46h28" />
      <circle cx="18" cy="48" r="2" />
      <circle cx="32" cy="48" r="2" />
      <circle cx="46" cy="48" r="2" />
    </>
  )
}

function DeskGlyph({ dark }) {
  return (
    <>
      <path d="M8 24h48v8H8z" />
      <path d="M14 32v16M50 32v16" />
      <path d="M10 48h12M42 48h12" />
      {dark && <path d="M40 27h8" />}
    </>
  )
}

function MonitorGlyph({ wide }) {
  return (
    <>
      <rect x={wide ? 6 : 12} y="12" width={wide ? 52 : 40} height="28" rx="2" />
      <path d="M32 40v8M24 48h16" />
    </>
  )
}

function LampGlyph() {
  return (
    <>
      <path d="M18 50h28" />
      <path d="M32 50V30" />
      <path d="M32 30h16" />
      <path d="M44 18c6 4 6 12 0 14H40c-2-4-2-10 4-14z" />
    </>
  )
}

function PlantGlyph() {
  return (
    <>
      <path d="M32 56V34" />
      <ellipse cx="24" cy="28" rx="8" ry="12" />
      <ellipse cx="38" cy="26" rx="8" ry="12" />
      <path d="M22 56h20l-3 6H25z" />
    </>
  )
}

function KeyboardGlyph() {
  return (
    <>
      <rect x="8" y="24" width="48" height="18" rx="2" />
      <path d="M14 30h4M22 30h4M30 30h4M38 30h4M46 30h4M18 36h28" />
    </>
  )
}

function MouseGlyph() {
  return (
    <>
      <rect x="24" y="12" width="16" height="28" rx="8" />
      <path d="M32 12v10" />
    </>
  )
}

function BoxGlyph() {
  return (
    <>
      <path d="M10 24h44v26H10z" />
      <path d="M10 32h44M32 24v26" />
    </>
  )
}

function CoffeeGlyph() {
  return (
    <>
      <path d="M16 26h28v16H16z" />
      <path d="M44 30h6a6 6 0 0 1 0 12h-6" />
      <path d="M22 50h20M24 18c2 3 2 3 0 6M32 16c2 3 2 3 0 6M40 18c2 3 2 3 0 6" />
    </>
  )
}

function GrinderGlyph() {
  return (
    <>
      <path d="M22 14h20v12H22z" />
      <path d="M18 26h28v20H18z" />
      <path d="M26 34h12" />
    </>
  )
}

function SurfGlyph() {
  return <path d="M20 50c8-28 16-28 24-6-10 4-16 2-24 6z" />
}

function MotoGlyph() {
  return (
    <>
      <circle cx="18" cy="44" r="8" />
      <circle cx="46" cy="44" r="8" />
      <path d="M18 44h12l6-12h10l4 12" />
    </>
  )
}

function BeanGlyph() {
  return <path d="M14 40c0-12 10-20 18-20s18 8 18 20-8 12-18 12-18 0-18-12z" />
}
