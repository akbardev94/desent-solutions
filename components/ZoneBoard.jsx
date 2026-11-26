import { Glyph } from "@/components/Glyphs"
import { PlacedProp } from "@/components/PlacedProps"
import { ZONES } from "@/lib/catalog"

export default function ZoneBoard({ accessoryIds, onToggle }) {
  return (
    <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="More of the setup">
      {ZONES.map((zone) => (
        <div key={zone.id} className="rounded-2xl border border-[#d5d5d5] bg-white px-3 py-3">
          <h2 className="mx-auto w-fit rounded-full border border-[#d0d0d0] bg-white px-4 py-1 text-sm font-semibold">{zone.name}</h2>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {zone.items.map((item) => {
              const selected = accessoryIds.includes(item.id)
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onToggle(item.id)}
                  className={`flex h-[108px] w-[112px] flex-col items-center justify-center gap-1 rounded-xl border px-2 text-center text-[11px] font-medium leading-4 text-ink ${
                    selected ? "border-ink bg-[#f7f4ef]" : "border-dashed border-[#d0d0d0] bg-white"
                  }`}
                >
                  {selected ? <PlacedProp id={item.id} className="h-12 w-12" /> : <Glyph id={item.id} className="h-8 w-8" />}
                  <span>{selected ? item.name : `+ ${item.action}`}</span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}
