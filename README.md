# desent-solutions

At Desent, we're not just programmers who execute tasks like robots. We're creatives, builders, and entrepreneurs. We think about the product, the user, the design — not just the code.

## Workspace designer for monis.rent

A freelancer landing in Bali should be able to assemble a desk, see it, and ask for it. This is that screen: one room, a short catalog, and a rental request.

### Approach

The sketch is the layout. A catalog of chairs, desks, and accessories sits on the left. The desk itself is built on a round platform: screens across the top, a lamp and a plant at the sides, the chair in front. Dashed buttons add another monitor, a box, or a plant. Under the platform are the rental actions, then four zones from the drawing — coffee, outdoor gear, a relax corner, and garage storage. Each zone tile is a real rental line.

Three screens fit across the desk. An ultrawide takes two of those slots and can keep one smaller screen beside it. Longer stays take a standing discount so the total is not just weekly × weeks.

The setup is stored in `localStorage`, so a refresh keeps the room.

### Tech

- Next.js (App Router) and React
- Tailwind CSS
- Client state in a single setup object. No extra state library.
- Deploy target: Vercel

Weekly prices follow the public monis.rent ranges. They are prototype rates, not a live catalog.

### Run

```bash
pnpm install
pnpm dev
```

The dev server listens on port 4010.

### What I would do with more time

- Read live stock and prices from monis.rent instead of the local catalog.
- Persist the request and send the WhatsApp / email confirmation.
- Share a link to a saved room.
- Offer desk sizes and finish colors once the slot scene is doing its job.
