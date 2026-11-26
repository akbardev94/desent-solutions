import { ZONE_ITEMS } from "@/lib/catalog"
import { PlacedProp } from "@/components/PlacedProps"

export default function RoomScene({ desk, chair, screens, accessoryIds }) {
  const has = (id) => accessoryIds.includes(id)
  const placed = ZONE_ITEMS.filter((item) => accessoryIds.includes(item.id))
  const onTable = placed.filter((item) => item.id === "coffee" || item.id === "grinder")
  const onFloor = placed.filter((item) => item.id !== "coffee" && item.id !== "grinder")

  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[640px]">
      <div className="absolute inset-x-[4%] bottom-[4%] top-[6%] rounded-[50%] bg-[#e7eaee]" />
      <div className="absolute inset-x-[12%] bottom-[10%] top-[14%] rounded-[50%] border border-[#d7dae0]" />

      <div className="absolute inset-0 flex items-center justify-center pb-6">
        <Setup
          desk={desk}
          chair={chair}
          screens={screens}
          lamp={has("lamp")}
          plant={has("plant")}
          box={has("box")}
          keyboard={has("keyboard")}
          mouse={has("mouse")}
        />
      </div>

      {onTable.length > 0 && <SideTable items={onTable} />}

      {onFloor.length > 0 && (
        <div className="pointer-events-none absolute inset-0">
          {onFloor.map((item) => (
            <div key={item.id} className={`rise absolute ${spot(item.id)}`} title={item.name}>
              <PlacedProp id={item.id} className={propSize(item.id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/** Pixel sizes follow the desk: 300px stands for a 140cm top, so a board and a seat read at real scale. */
function propSize(id) {
  const sizes = {
    beanbag: "h-[124px] w-[164px]",
    shelf: "h-24 w-20",
    surfboard: "h-[360px] w-[100px]",
    motorcycle: "h-[156px] w-[264px]",
  }
  return sizes[id] || "h-20 w-20"
}

function spot(id) {
  const places = {
    beanbag: "left-[0%] bottom-[4%]",
    shelf: "right-[22%] bottom-[30%]",
    surfboard: "right-[2%] bottom-[4%] origin-bottom -rotate-6",
    motorcycle: "right-[1%] bottom-[4%] z-20",
  }
  return places[id] || "bottom-2 left-1/2"
}

/** Coffee machine and grinder sit on a side table, not in mid-air. */
function SideTable({ items }) {
  const has = (id) => items.some((item) => item.id === id)
  return (
    <div className="rise pointer-events-none absolute bottom-[38%] left-[1%] z-10 w-[124px]">
      <div className="flex items-end justify-center">
        {has("coffee") && <PlacedProp id="coffee" className="-mb-3 h-[62px] w-[62px]" />}
        {has("grinder") && <PlacedProp id="grinder" className="-mb-3 h-[52px] w-[52px]" />}
      </div>
      <div className="relative h-3 rounded-[3px] bg-gradient-to-b from-[#f3d7ad] to-[#c9956a] shadow-[0_8px_12px_rgba(40,30,10,0.16)]">
        <div className="absolute inset-x-2 top-px h-px bg-white/55" />
      </div>
      <div className="mx-auto flex w-[76%] justify-between">
        <div className="h-10 w-[5px] rounded-b-sm bg-[#b58356]" />
        <div className="h-10 w-[5px] rounded-b-sm bg-[#b58356]" />
      </div>
    </div>
  )
}

function Setup({ desk, chair, screens, lamp, plant, box, keyboard, mouse }) {
  return (
    <div className="relative w-[400px]">
      <div className="flex items-end justify-center gap-3">
        <div className="flex w-10 shrink-0 justify-center">{plant && <DeskPlant />}</div>
        <div className="w-[250px]">
          <MonitorRow screens={screens} />
        </div>
        <div className="flex w-10 shrink-0 justify-center">{lamp && <DeskLamp />}</div>
      </div>
      <DeskTop desk={desk} keyboard={keyboard} mouse={mouse} />
      <div className="relative">
        <Pedestals desk={desk} />
        {box && (
          <div className="rise absolute -right-1 bottom-1 h-8 w-10 rounded-[3px] border border-[#d0d0d0] bg-white shadow-sm">
            <div className="absolute inset-x-1 top-1/2 border-t border-[#e4e4e4]" />
          </div>
        )}
      </div>
      {chair && (
        <div className="rise relative z-30 -mt-7 flex justify-center">
          <ChairBack chair={chair} />
        </div>
      )}
    </div>
  )
}

function MonitorRow({ screens }) {
  if (!screens.length) return <div className="h-6" />
  const wide = screens.some((screen) => screen.span === 2)
  return (
    <div className="flex items-end justify-center gap-1.5">
      {screens.map((screen) => (
        <Screen key={screen.key} screen={screen} wide={wide} count={screens.length} />
      ))}
    </div>
  )
}

function Screen({ screen, wide, count }) {
  const tone = screen.id === "uhd27" ? "from-[#d7eef0] to-[#7eafba]" : screen.id === "curve34" ? "from-[#e4e1f6] to-[#8ea0c4]" : "from-[#f8e7cc] to-[#e0b27e]"
  const height = wide ? "h-[58px]" : count > 2 ? "h-[52px]" : "h-[62px]"
  return (
    <div className={`rise flex min-w-0 flex-1 flex-col items-center ${wide ? "max-w-[210px]" : ""}`}>
      <div className={`w-full rounded-[3px] border border-[#1c1916] bg-[#1c1916] p-[3px] ${height}`}>
        <div className={`h-full rounded-[2px] bg-gradient-to-b ${tone}`} />
      </div>
      <div className="h-2 w-4 bg-[#d4cfc8]" />
      <div className={`h-1 rounded-full bg-[#bdb6ad] ${wide ? "w-16" : "w-8"}`} />
    </div>
  )
}

function DeskLamp() {
  return (
    <div className="rise flex flex-col items-center">
      <div className="h-6 w-7 rounded-t-full bg-[#fff6e4] shadow-[0_0_14px_3px_rgba(255,210,130,0.9)]" />
      <div className="h-8 w-[3px] bg-[#d5cfc6]" />
      <div className="h-1.5 w-7 rounded-full bg-[#cfc8be]" />
    </div>
  )
}

function DeskTop({ desk, keyboard, mouse }) {
  if (!desk) {
    return <div className="mx-auto mt-2 h-12 w-[300px] rounded-md border-2 border-dashed border-[#c5c5c5] bg-white/50" />
  }
  const electric = desk.id === "electric"
  return (
    <div className={`rise relative z-10 mx-auto mt-1 h-12 w-[300px] rounded-[4px] shadow-[0_8px_16px_rgba(40,30,10,0.12)] ${electric ? "bg-gradient-to-b from-[#f4dcb4] to-[#e2c08a]" : "bg-gradient-to-b from-[#b07a4e] to-[#6e4429]"}`}>
      <div className="absolute inset-x-3 top-1 h-px bg-white/40" />
      {(keyboard || mouse) && (
        <div className="absolute inset-x-0 bottom-1.5 flex items-center justify-center gap-2">
          {keyboard && <div className="h-3.5 w-16 rounded-[2px] border border-white/40 bg-white/80" />}
          {mouse && <div className="h-3.5 w-2.5 rounded-full bg-white/90" />}
        </div>
      )}
    </div>
  )
}

function Pedestals({ desk }) {
  if (!desk) return <div className="h-14" />
  const light = desk.id === "electric"
  return (
    <div className="mx-auto flex w-[280px] justify-between">
      <Pedestal light={light} />
      <Pedestal light={light} />
    </div>
  )
}

function Pedestal({ light }) {
  const line = light ? "border-[#ead9c0]" : "border-[#5a3824]/70"
  return (
    <div className={`flex h-16 w-[38%] flex-col justify-evenly rounded-b-[4px] border px-2 ${light ? "border-[#ead9c0] bg-[#fbf7f1]" : "border-[#5a3824] bg-[#7d5236]"}`}>
      <div className={`h-2.5 rounded-[2px] border ${line}`} />
      <div className={`h-2.5 rounded-[2px] border ${line}`} />
      <div className={`h-2.5 rounded-[2px] border ${line}`} />
    </div>
  )
}

function ChairBack({ chair }) {
  const tone = chair.id === "mesh" ? "bg-[#2c2a28]" : chair.id === "guest" ? "bg-[#d7dbd6]" : "bg-[#d0653a]"
  const seat = chair.id === "mesh" ? "bg-[#1c1916]" : chair.id === "guest" ? "bg-[#c5cac4]" : "bg-[#b5522d]"
  return (
    <div className="flex w-24 flex-col items-center">
      <div className={`h-12 w-14 rounded-t-xl ${tone}`} />
      <div className={`-mt-1 h-2.5 w-20 rounded-full ${seat}`} />
      <div className="mt-1 h-4 w-[3px] bg-[#9a9691]" />
      <div className="h-1 w-10 rounded-full bg-[#7a7672]" />
    </div>
  )
}

function DeskPlant() {
  return (
    <svg width="36" height="48" viewBox="0 0 36 48" aria-hidden="true" className="rise">
      <ellipse cx="18" cy="14" rx="7" ry="10" fill="#2f6b4f" />
      <ellipse cx="11" cy="20" rx="6" ry="8" fill="#1f6b4a" />
      <ellipse cx="26" cy="20" rx="6" ry="8" fill="#3e8f66" />
      <path d="M12 34h12l-2 7H14z" fill="#c96a45" />
    </svg>
  )
}
