# Design Brief: Forestheals

**Tagline:** From forest to homes | **Category:** Luxury Eco Ayurvedic eCommerce | **Aesthetic:** Premium minimal natural

## Direction

Elevated wellness platform blending forest heritage with luxury restraint. Forest green primary conveys trust & nature; cream secondary adds warmth & approachability. Glassmorphism cards with soft shadows create depth without excess. Clean white space mirrors forest canopy breathing. Smooth motion library animations orchestrate micro-interactions. Design feels like a premium brand you'd find in high-end wellness destinations.

## Color Palette

| Token | OKLCH | Visual | Usage |
|-------|-------|--------|-------|
| Primary | `0.28 0.12 151` | Deep forest green | CTAs, headers, accents |
| Secondary | `0.89 0.14 100` | Warm cream | Highlights, secondary CTAs |
| Accent | `0.65 0.18 40` | Earthy rust-orange | Links, badges, calls-to-action |
| Background | `0.99 0 0` | Pure white | Page base |
| Card | `0.985 0.01 0` | Off-white | Product cards, panels |
| Foreground | `0.2 0.02 180` | Deep slate | Body text, primary copy |
| Muted | `0.93 0.02 100` | Soft beige | Disabled states, tertiary |
| Border | `0.91 0.02 100` | Pale cream | Dividers, subtle outlines |

**Dark Mode:** Primary → `0.52 0.15 151` (lifted forest), Secondary → `0.78 0.12 100` (golden cream), Foreground → `0.92 0.02 100`, Background → `0.12 0.01 180` (deep charcoal).

## Typography

| Role | Font | Scale | Usage |
|------|------|-------|-------|
| Display | Plus Jakarta Sans 700 | 3xl–4xl | Hero titles, section headers |
| Body | Plus Jakarta Sans 400 | base–lg | Copy, descriptions, UI text |
| Mono | Geist Mono 400 | sm | Code, prices, timestamps |

**Hierarchy:** Headings at 700 weight, bodies at 400, mono for functional data. Leading: 1.5 for body (readability), 1.2 for headings (compact luxury).

## Structural Zones

| Zone | Treatment | Rationale |
|------|-----------|-----------|
| Header/Nav | `bg-card` with `border-b border-border` | Subtle elevation, anchors navigation |
| Hero | `bg-gradient-eco` (green→rust gradient) with large typography | Emotional impact, tagline prominence |
| Product Grid | `bg-background` cards with `glass-card` effect + `shadow-soft` | Showcase products without visual noise |
| CTA Sections | `bg-secondary/5` (cream tint) with `glass-card` overlays | Guides user flow, warm invitation |
| Footer | `bg-muted/20` with `border-t border-border` | Grounds page, delineates content |
| Sidebar (Dashboard) | `bg-card` with `border-r border-border` | Persistent navigation anchor |

## Component Patterns

- **Buttons:** Primary (forest bg, cream text, `shadow-soft` on hover), Secondary (cream bg, forest text), Tertiary (text-only, accent underline).
- **Cards:** Glassmorphism (`glass-card` utility), rounded-lg, `shadow-soft`, hover: `shadow-elevated` + scale-105 via motion.
- **Forms:** Inputs with `bg-input` (pale), `border-border`, focus: `ring ring-primary`, placeholder in muted.
- **Product Showcases:** Grid (lg:3-col, md:2-col, sm:1-col), cards with image + title + price (accent color), rating stars (gold).
- **Modals:** Backdrop blur, centered card with `glass-card`, smooth entrance via `animate-fade-in`.

## Motion & Interaction

- **Entrance:** `animate-fade-in` (0.4s) + `animate-slide-up` (0.5s) for cards on page load.
- **Hover:** `shadow-soft` → `shadow-elevated`, subtle scale (1.02) via Tailwind group, smooth `transition-smooth`.
- **Scroll:** Lazy-load cards trigger `animate-slide-up` on viewport entry (motion library observer).
- **Loading:** `animate-float` pulsing for spinners, shimmer gradient for skeleton.
- **Carousels:** Smooth slide transitions (motion library slide orchestration).

## Spacing & Rhythm

- **Base unit:** 0.25rem (4px) grid. Margins/padding in multiples: `px-4`, `py-6`, `gap-8`.
- **Breathing:** Large white space between sections (py-12–16), nested padding within cards (p-6).
- **Density:** Product grids tight (gap-4), info sections looser (gap-6).

## Signature Detail

**Glassmorphic Product Cards:** Semi-transparent backdrop blur with subtle cream border creates ethereal premium feel — like seeing products through forest mist. On hover, elevation shadow emphasizes layering. Combines modern tech aesthetic with nature metaphor.

## Anti-Patterns

- No solid background fills on cards — always use `glass-card`.
- No dark/muted text on primary backgrounds — always ensure ≥0.45 OKLCH lightness difference.
- No animations without motion library orchestration — avoid ad-hoc framer-motion.
- No arbitrary colors — all via semantic tokens.

## About Page Design

**Content Structure:**
- Hero: Gradient forest green to cream, centered tagline "From forest to homes", with soft abstract background orbs
- Brand Story: `bg-muted/30`, centered narrative text, motion entrance
- Vision Section: Deep forest gradient card with cream text, cause-focused pillars (no money goals), abstract forest emoji accent
- Mission Flowchart: 6-step horizontal timeline (Forest Sourcing → Formulation → Manufacturing → Distribution → Community → ₹10,000 Cr Impact), step cards with hover elevation, final step highlighted in primary color
- Team: Three cards (glassmorphic) with avatars (initials in circular badges), bio text, professional roles
  - **CEO & Founder:** Prateek Raj Kumawat
  - **Co-Founder (Marketing & CRM):** Anya
  - **CFO:** Arjun AI Agent
- Eco Practices: `bg-background`, numbered list with Leaf icon accents
- Charity & Impact: `bg-muted/30`, Heart icon, CTA linking to B2B partnership
- Contact: `bg-background`, three cards (Mail, Phone, MapPin) with Beawar HQ address (NOT Jaipur)

**Mobile Responsive:** All sections stack single-column on mobile with maintained spacing and visual hierarchy.

## Constraints

- Mobile-first responsive (sm: 640px, md: 768px, lg: 1024px).
- Light mode primary, dark mode optional but supported via `.dark` class toggle.
- Accessibility: WCAG AA minimum (4.5:1 contrast, keyboard navigation, focus rings).
- No emoji or decorative icons — use lucide-react for functional UI icons only.
