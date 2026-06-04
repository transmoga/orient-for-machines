# Photos

Drop real images here and reference them from the pages. Every image slot on the site
is a `.ph-box` placeholder with a commented-out `<img>` showing the expected filename —
just uncomment it and add the file here.

To swap a placeholder for a real photo, replace the contents of its `.ph-box` with:

```html
<img src="photos/your-file.jpg" alt="Describe the image" />
```

The image will cover the frame automatically (`object-fit: cover`), keeping the rounded
corners and aspect ratio. No CSS changes needed.

## Art direction

Match the site's calm, editorial tone:

- **Warm, muted palette** — cream/paper, warm neutrals, soft clay and slate. Avoid bright,
  oversaturated stock.
- **Candid over posed** — real working moments beat stiff corporate stock.
- **Negative space** — images sit behind captions; leave room, avoid busy compositions.
- **Consistent grade** — pick a single warm grade so the set feels intentional.

## Slots & recommended sizes

| Slot | File (suggested) | Aspect | Export size |
|------|------------------|--------|-------------|
| Use cases — hero band | `hero.jpg` | 16:6.4 (~2.5:1) | 1920 × 768 |
| Use cases — Humans lead | `humans-working.jpg` | 16:6.4 | 1600 × 640 |
| Use cases — Machines lead | `machines.jpg` | 16:6.4 | 1600 × 640 |
| Use cases — human-moment portrait | `portrait.jpg` | 4:5 | 800 × 1000 |
| Where Orient fits best — tiles (×12) | `fit-*.jpg` | 3:2 | 600 × 400 |

Export JPGs at ~80% quality (or WebP). Keep each file well under ~300 KB where possible.

## Unsplash search ideas — "Where Orient fits best" tiles

Twelve tiles, 3:2. Aim for warm, quiet, human/architectural shots over literal "tech" clichés.
Good general modifiers to append: `minimal`, `warm tones`, `natural light`, `candid`, `muted`.

| Tile | Search ideas |
|------|--------------|
| AI companies | `ai research lab`, `machine learning team`, `server room warm light`, `engineers whiteboard` |
| Software companies | `software team working`, `code on screen close up`, `developers collaborating`, `modern office quiet` |
| Consulting firms | `consulting meeting`, `strategy workshop table`, `professionals discussion daylight`, `notebook charts` |
| Strategy teams | `strategy session whiteboard`, `planning meeting sticky notes`, `team reviewing documents`, `chess close up` |
| Research-heavy organisations | `research library`, `scientist reading papers`, `archive documents`, `study desk natural light` |
| Product-led companies | `product design studio`, `ux wireframes desk`, `prototyping workshop`, `team sketching product` |
| Deep tech | `engineering lab`, `hardware prototype`, `clean room technology`, `microscope warm light` |
| Enterprise sales organisations | `business handshake daylight`, `sales meeting table`, `presentation to clients`, `coffee meeting professionals` |
| Boards & leadership teams | `boardroom warm`, `executives meeting`, `roundtable discussion`, `leadership conversation window light` |
| High-growth companies | `startup office candid`, `busy team energy`, `growth chart wall`, `open plan office daylight` |
| Teams deploying internal agents | `human and screen interface`, `person working with laptop dark`, `automation dashboard`, `operations control room` |
| Organisations in strategic change | `transformation workshop`, `team in transition meeting`, `open road horizon`, `architecture under construction warm` |

Tip: for a cohesive set, prefer one Unsplash photographer or collection, or pick all images
in a similar warm grade and crop them to 3:2.
