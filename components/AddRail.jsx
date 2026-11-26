import { Glyph } from "@/components/Glyphs"
import { slotsUsed, MONITOR_SLOTS } from "@/lib/selection"

export default function AddRail({ className = "", selection, onAddMonitor, onToggle }) {
  const plant = selection.accessoryIds.includes("plant")
  const box = selection.accessoryIds.includes("box")
  const monitorsFull = slotsUsed(selection.monitorCounts) >= MONITOR_SLOTS

  return (
    <div className={`flex flex-row justify-center gap-2 lg:flex-col ${className}`}>
      <RailButton label={"Add\nMonitor!"} glyph="fhd24" disabled={monitorsFull} pressed={slotsUsed(selection.monitorCounts) > 0} onClick={onAddMonitor} />
      <RailButton label={"Add\na Box!"} glyph="box" pressed={box} onClick={() => onToggle("box")} />
      <RailButton label={"Place\na Plant!"} glyph="plant" pressed={plant} onClick={() => onToggle("plant")} />
    </div>
  )
}

function RailButton({ label, glyph, pressed = false, disabled = false, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-[88px] w-[88px] flex-col items-center justify-center gap-1 rounded-xl border px-2 text-center text-[11px] font-semibold leading-tight text-ink disabled:cursor-not-allowed disabled:opacity-40 lg:w-full ${
        pressed ? "border-ink bg-white" : "border-dashed border-[#c8c8c8] bg-white"
      }`}
    >
      <Glyph id={glyph} className="h-7 w-7" />
      <span className="whitespace-pre-line">+ {label}</span>
    </button>
  )
}
