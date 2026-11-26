"use client"

import { useState } from "react"
import { DURATIONS, formatMoney } from "@/lib/pricing"

export default function SummaryPanel({ quote, weeks, onWeeks, onRemove, onRent }) {
  const [open, setOpen] = useState(false)
  const hasItems = quote.lines.length > 0

  return (
    <div className="mx-auto mt-1 flex w-full max-w-xs flex-col items-center">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="w-full rounded-2xl border border-[#d4d4d4] bg-white px-6 py-2 text-sm font-semibold"
      >
        Ready to Rent?
      </button>
      <button
        type="button"
        disabled={!hasItems}
        onClick={onRent}
        className="mt-2 w-full rounded-2xl border border-[#d4d4d4] bg-white px-6 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
      >
        Rent Your Setup!
      </button>

      {open && (
        <div className="mt-3 w-full rounded-2xl border border-[#e2e2e2] bg-white px-4 py-3 text-sm">
          {hasItems ? (
            <ul className="space-y-2">
              {quote.lines.map((line) => (
                <li key={`${line.slot}-${line.id}`} className="flex items-center justify-between gap-3">
                  <span>
                    {line.name}
                    {line.qty > 1 ? ` × ${line.qty}` : ""}
                  </span>
                  <button type="button" onClick={() => onRemove(line)} className="text-xs text-ink/50 underline-offset-2 hover:underline">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-ink/60">Pick a chair, a desk, or anything around them.</p>
          )}
        </div>
      )}

      <div className="mt-3 grid w-full grid-cols-3 gap-2" role="radiogroup" aria-label="Rental length">
        {DURATIONS.map((duration) => {
          const selected = weeks === duration.weeks
          return (
            <button
              key={duration.weeks}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onWeeks(duration.weeks)}
              className={`rounded-full border px-2 py-1.5 text-xs font-medium ${selected ? "border-ink bg-ink text-white" : "border-[#d5d5d5] bg-white"}`}
            >
              {duration.label}
            </button>
          )
        })}
      </div>
      <p className="mt-2 font-display text-3xl leading-none">{formatMoney(quote.total)}</p>
    </div>
  )
}
