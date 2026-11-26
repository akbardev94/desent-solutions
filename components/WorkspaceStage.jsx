import RoomScene from "@/components/RoomScene"

export default function WorkspaceStage({ className = "", desk, chair, screens, accessoryIds, lines }) {
  const summary = lines.length ? lines.map((line) => (line.qty > 1 ? `${line.name} × ${line.qty}` : line.name)).join(", ") : "Nothing in the workspace yet"

  return (
    <section className={className}>
      <p className="sr-only" aria-live="polite">
        {summary}
      </p>
      <RoomScene desk={desk} chair={chair} screens={screens} accessoryIds={accessoryIds} />
    </section>
  )
}
