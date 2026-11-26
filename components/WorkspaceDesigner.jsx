"use client"

import { useEffect, useMemo, useState } from "react"
import AddRail from "@/components/AddRail"
import Catalog from "@/components/Catalog"
import CheckoutSheet from "@/components/CheckoutSheet"
import SummaryPanel from "@/components/SummaryPanel"
import WorkspaceStage from "@/components/WorkspaceStage"
import ZoneBoard from "@/components/ZoneBoard"
import { CHAIRS, DESKS } from "@/lib/catalog"
import { formatMoney, priceQuote } from "@/lib/pricing"
import {
  EMPTY_SELECTION,
  addNextMonitor,
  flattenMonitors,
  lineItems,
  normalizeSelection,
  selectSingle,
  setMonitorQty,
  toggleAccessory,
} from "@/lib/selection"

const STORAGE_KEY = "monis-workspace"

export default function WorkspaceDesigner() {
  const [selection, setSelection] = useState(EMPTY_SELECTION)
  const [hydrated, setHydrated] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const lines = useMemo(() => lineItems(selection), [selection])
  const quote = useMemo(() => priceQuote(lines, selection.weeks), [lines, selection.weeks])
  const desk = DESKS.find((item) => item.id === selection.deskId) ?? null
  const chair = CHAIRS.find((item) => item.id === selection.chairId) ?? null
  const screens = flattenMonitors(selection.monitorCounts)

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        setSelection(normalizeSelection(JSON.parse(raw)))
      } catch {
        // A damaged saved setup should not block the page. Start empty.
      }
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selection))
  }, [hydrated, selection])

  function patch(partial) {
    setSelection((current) => ({ ...current, ...partial }))
  }

  function toggle(id) {
    patch({ accessoryIds: toggleAccessory(selection.accessoryIds, id) })
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1180px] px-4 pb-24 pt-6 lg:pb-10">
      <header className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Design Your Workspace!</h1>
        <p className="mt-1 text-sm text-ink/55">— Create Your Perfect Setup! —</p>
      </header>

      <div className="mt-8 grid items-center gap-6 lg:grid-cols-[250px_minmax(0,1fr)_124px]">
        <Catalog
          className="order-4 lg:order-1"
          selection={selection}
          onDesk={(id) => patch({ deskId: selectSingle(selection.deskId, id) })}
          onChair={(id) => patch({ chairId: selectSingle(selection.chairId, id) })}
          onAccessory={toggle}
          onMonitorQty={(id, qty) => patch({ monitorCounts: setMonitorQty(selection.monitorCounts, id, qty) })}
        />
        <div className="order-1 lg:order-2">
          <WorkspaceStage desk={desk} chair={chair} screens={screens} accessoryIds={selection.accessoryIds} lines={lines} />
          <SummaryPanel
            quote={quote}
            weeks={selection.weeks}
            onWeeks={(weeks) => patch({ weeks })}
            onRemove={(line) => removeLine(selection, line, patch)}
            onRent={() => setCheckoutOpen(true)}
          />
        </div>
        <AddRail
          className="order-2 lg:order-3"
          selection={selection}
          onAddMonitor={() => patch({ monitorCounts: addNextMonitor(selection.monitorCounts) })}
          onToggle={toggle}
        />
      </div>

      <ZoneBoard accessoryIds={selection.accessoryIds} onToggle={toggle} />

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#e4e4e4] bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          <p className="font-display text-2xl leading-none">{formatMoney(quote.total)}</p>
          <button
            type="button"
            disabled={quote.weekly === 0}
            onClick={() => setCheckoutOpen(true)}
            className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-ink/20"
          >
            Rent Your Setup!
          </button>
        </div>
      </div>

      <CheckoutSheet open={checkoutOpen} quote={quote} onClose={() => setCheckoutOpen(false)} />
    </div>
  )
}

function removeLine(selection, line, patch) {
  if (line.slot === "desk") patch({ deskId: null })
  if (line.slot === "chair") patch({ chairId: null })
  if (line.slot === "accessory") {
    patch({ accessoryIds: selection.accessoryIds.filter((id) => id !== line.id) })
  }
  if (line.slot === "monitor") {
    patch({ monitorCounts: setMonitorQty(selection.monitorCounts, line.id, line.qty - 1) })
  }
}
