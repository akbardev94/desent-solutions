"use client"

import { useEffect, useId, useRef, useState } from "react"
import { AREAS } from "@/lib/catalog"
import { formatMoney } from "@/lib/pricing"

const EMPTY_FORM = {
  name: "",
  email: "",
  whatsapp: "",
  area: "Canggu",
  date: "",
  note: "",
}

export default function CheckoutSheet({ open, quote, onClose }) {
  const titleId = useId()
  const firstField = useRef(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null)

  useEffect(() => {
    if (!open) return undefined

    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    firstField.current?.focus()

    function onKey(event) {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  if (!open) return null

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function submit(event) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSent({
      reference: `MN-${Date.now().toString().slice(-6)}`,
      name: form.name.trim(),
      area: form.area,
      date: form.date,
      note: form.note.trim(),
      total: quote.total,
      weeks: quote.weeks,
      lines: quote.lines.map((line) => ({
        id: line.id,
        name: line.name,
        qty: line.qty,
      })),
    })
  }

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-ink/40" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="h-full w-full max-w-md overflow-auto bg-[#fffdf9] p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-moss">monis.rent</p>
            <h2 id={titleId} className="mt-1 font-display text-3xl leading-none">
              {sent ? "Request sent" : "Rent this setup"}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-line px-3 py-1 text-sm">
            Close
          </button>
        </div>

        {sent ? (
          <Success sent={sent} onEdit={() => setSent(null)} onClose={onClose} />
        ) : (
          <form className="mt-6" onSubmit={submit} noValidate>
            <ul className="space-y-2 rounded-2xl bg-paper px-4 py-3">
              {quote.lines.map((line) => (
                <li key={`${line.slot}-${line.id}`} className="flex justify-between gap-3 text-sm">
                  <span>
                    {line.name}
                    {line.qty > 1 ? ` × ${line.qty}` : ""}
                  </span>
                  <span className="text-ink/60">{formatMoney(line.weekly * line.qty)}/wk</span>
                </li>
              ))}
              <li className="flex justify-between border-t border-line pt-2 text-sm font-medium">
                <span>
                  {quote.weeks} {quote.weeks === 1 ? "week" : "weeks"}
                </span>
                <span>{formatMoney(quote.total)}</span>
              </li>
            </ul>

            <div className="mt-5 grid gap-3">
              <Field label="Name" error={errors.name}>
                <input
                  ref={firstField}
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  autoComplete="name"
                  className={inputClass}
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                  autoComplete="email"
                  className={inputClass}
                />
              </Field>
              <Field label="WhatsApp" error={errors.whatsapp}>
                <input
                  value={form.whatsapp}
                  onChange={(event) => update("whatsapp", event.target.value)}
                  autoComplete="tel"
                  placeholder="+62"
                  className={inputClass}
                />
              </Field>
              <Field label="Area in Bali" error={errors.area}>
                <select
                  value={form.area}
                  onChange={(event) => update("area", event.target.value)}
                  className={inputClass}
                >
                  {AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Start date" error={errors.date}>
                <input
                  type="date"
                  value={form.date}
                  onChange={(event) => update("date", event.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Villa or note" error={errors.note}>
                <textarea
                  value={form.note}
                  onChange={(event) => update("note", event.target.value)}
                  rows={3}
                  placeholder="Gate code, villa name, floor"
                  className={inputClass}
                />
              </Field>
            </div>

            <button type="submit" className="mt-5 w-full rounded-full bg-clay px-4 py-3 text-sm font-medium text-white">
              Send request · {formatMoney(quote.total)}
            </button>
            <p className="mt-3 text-xs leading-5 text-ink/50">
              No charge yet. monis.rent confirms the villa and the drop-off on WhatsApp.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

function Success({ sent, onEdit, onClose }) {
  return (
    <div className="mt-6">
      <p className="text-sm leading-6 text-ink/75">
        Thanks {sent.name}. We have the {sent.area} drop-off for {sent.date}. monis.rent confirms the villa on WhatsApp.
      </p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Reference {sent.reference}</p>
      <ul className="mt-3 space-y-1 text-sm">
        {sent.lines.map((line) => (
          <li key={line.id}>
            {line.name}
            {line.qty > 1 ? ` × ${line.qty}` : ""}
          </li>
        ))}
      </ul>
      <p className="mt-4 font-display text-4xl leading-none">{formatMoney(sent.total)}</p>
      <p className="mt-1 text-sm text-ink/55">{sent.weeks} {sent.weeks === 1 ? "week" : "weeks"}</p>
      {sent.note && <p className="mt-3 text-sm text-ink/70">Note: {sent.note}</p>}
      <div className="mt-6 flex gap-2">
        <button type="button" onClick={onEdit} className="rounded-full border border-line px-4 py-2 text-sm">
          Edit request
        </button>
        <button type="button" onClick={onClose} className="rounded-full bg-ink px-4 py-2 text-sm text-white">
          Back to the room
        </button>
      </div>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-medium text-ink/60">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-clay">{error}</span>}
    </label>
  )
}

const inputClass = "w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-ink"

function validate(form) {
  const errors = {}
  if (form.name.trim().length < 2) errors.name = "Add your name."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Add a valid email."
  if (form.whatsapp.replace(/\D/g, "").length < 8) errors.whatsapp = "Add a WhatsApp number with the country code."
  if (!form.area) errors.area = "Choose an area in Bali."
  if (!form.date) errors.date = "Choose a start date."
  else if (form.date < todayISO()) errors.date = "Choose today or a later day."
  return errors
}

function todayISO() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${now.getFullYear()}-${month}-${day}`
}
