"use client"

import { useState } from "react"
import { Glyph } from "@/components/Glyphs"
import { ACCESSORIES, CHAIRS, DESKS, MONITORS } from "@/lib/catalog"
import { formatMoney } from "@/lib/pricing"
import { canAddMonitor } from "@/lib/selection"

const TABS = [
  { id: "chair", label: "Chairs" },
  { id: "desk", label: "Desks" },
  { id: "accessory", label: "Accessories" },
]

export default function Catalog({ className = "", selection, onDesk, onChair, onAccessory, onMonitorQty }) {
  const [category, setCategory] = useState("chair")
  const products = category === "desk" ? DESKS : category === "chair" ? CHAIRS : [...MONITORS, ...ACCESSORIES]

  return (
    <aside className={`rounded-2xl border border-[#d7d7d7] bg-white p-3 ${className}`}>
      <div className="flex gap-1" role="tablist" aria-label="Catalog">
        {TABS.map((tab) => {
          const selected = category === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setCategory(tab.id)}
              className={`min-w-0 flex-1 whitespace-nowrap rounded-lg border px-1 py-1.5 text-[11px] font-semibold ${
                selected ? "border-ink bg-ink text-white" : "border-[#d7d7d7] bg-white text-ink"
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {products.map((product) => {
          const qty = product.slot === "monitor" ? selection.monitorCounts[product.id] || 0 : 0
          const selected =
            (product.slot === "desk" && selection.deskId === product.id) ||
            (product.slot === "chair" && selection.chairId === product.id) ||
            (product.slot === "accessory" && selection.accessoryIds.includes(product.id)) ||
            qty > 0
          const canAdd = product.slot !== "monitor" || qty > 0 || canAddMonitor(selection.monitorCounts, product.id)

          return (
            <button
              key={product.id}
              type="button"
              disabled={!canAdd && qty === 0}
              aria-pressed={selected}
              title={`${product.name} · ${formatMoney(product.weekly)}/week`}
              onClick={() => choose(product, qty, onDesk, onChair, onAccessory, onMonitorQty)}
              className={`flex aspect-square flex-col items-center justify-center rounded-xl border text-ink disabled:opacity-40 ${
                selected ? "border-ink bg-[#f7f7f7]" : "border-dashed border-[#c8c8c8] bg-white"
              }`}
            >
              <Glyph id={product.id} />
              {qty > 1 && <span className="text-[10px] font-semibold">×{qty}</span>}
            </button>
          )
        })}
      </div>
    </aside>
  )
}

function choose(product, qty, onDesk, onChair, onAccessory, onMonitorQty) {
  if (product.slot === "desk") onDesk(product.id)
  if (product.slot === "chair") onChair(product.id)
  if (product.slot === "accessory") onAccessory(product.id)
  if (product.slot === "monitor") onMonitorQty(product.id, qty > 0 ? 0 : 1)
}
