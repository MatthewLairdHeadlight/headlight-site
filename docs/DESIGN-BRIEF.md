# Headlight Mental Healthcare — Creative Design Brief

> **How to use this:** Fill in the bracketed sections, then hand this document to a designer (or use it as the spec for a design review). The more specific you are, the less room there is for anyone — human or AI — to improvise in the wrong direction.

---

## 1. The One-Sentence North Star

> **"Visitors should leave feeling better than when they arrived — like they finally found someone who sees them."**

Every design decision gets tested against this sentence. If an element doesn't serve it, it goes.

## 2. About the Practice

- **Practice:** Headlight Mental Healthcare, PLLC
- **Provider:** Matthew Laird, PMHNP-BC — Board Certified Psychiatric Nurse Practitioner, Certified Autism Specialist (CAS), 20+ years experience
- **Locations:** Phoenix, AZ · Portland, OR · Telehealth in both states
- **Differentiators:** LGBTQ+ affirming care, autism/neurodivergent specialization, NGLCC-certified LGBT Business Enterprise, Benefit Corporation for Good, evidence-based practice
- **Primary conversion goal:** Start Secure Intake (IntakeQ form)
- **Secondary goals:** Phone calls, Psychology Today profile views

## 3. Audience

Who is arriving at this site, and in what state of mind?

- People seeking psychiatric care — often anxious, exhausted, or skeptical after past experiences with providers who didn't listen
- Neurodivergent adults (ADHD/autism) seeking evaluation or a provider who understands their presentation
- LGBTQ+ individuals looking for a provider where they don't have to explain or translate themselves
- [ADD: any other audiences — parents seeking care for young adults? referring providers?]

**Design implication:** Warmth over polish. Trust over flash. Nothing clinical-cold, nothing salesy.

## 4. Reference Sites I Love

List 3–5 sites and note *specifically what* you love about each (the typography? the photography? the pacing? the color?).

1. [URL] — what I love: [ ]
2. [URL] — what I love: [ ]
3. [URL] — what I love: [ ]
4. [URL] — what I love: [ ]
5. [URL] — what I love: [ ]

*Hunting grounds: Alma, Headway, Two Chairs, boutique private-practice sites, and wellness brands whose feeling you want to borrow.*

## 5. Anti-References

Just as important — 2–3 sites (or patterns) that represent what this site must NOT feel like:

1. [URL or pattern] — why: [ ]
2. [URL or pattern] — why: [ ]

*Examples of patterns to consider banning: stock photos of people fake-smiling in therapy, corporate-blue gradients, dense insurance-company layouts, aggressive popups.*

## 6. Photography & Hero Images

The site already has a real photo library. Rank them — which images carry the emotional weight?

**Hero-tier (the images that ARE the brand):**
- [e.g., `assets/images/stock/water-reflection.jpg` — or name your favorites from the personal set]
- [ ]
- [ ]

**Supporting-tier:**
- [ ]

**Retire (don't use):**
- [ ]

Available in the repo:
- Provider photos: `stock/IMG_2735.jpeg`, `stock/matthew-headshot.jpg`, `stock/matthew-alt.jpg`, `stock/matthew-wide.jpg`
- Landscapes/mood: `stock/water-reflection.jpg`, `stock/foggy-landscape.jpg`, `stock/clinic-bg.jpg`, `stock/multnomah.jpg`
- Personal/Ken Burns set: `personal/p01.jpg` … `p24.jpg`
- Badges: IBCCES CAS, NGLCC, Benefit Corp, Equality Chamber, ANA, NPO, AzNPC

## 7. Voice & Feeling (three words)

Pick three words the design should evoke. Circle/keep three, delete the rest, or write your own:

`warm` · `calm` · `grounded` · `hopeful` · `honest` · `human` · `spacious` · `light` · `steady` · `welcoming`

My three: [ ] · [ ] · [ ]

## 8. Current Design System (what exists today)

The site is a 5-page static Vite build with an established token system (`src/css/tokens.css`):

- **Pages:** Home, About, Services, GeneSight, Contact
- **Color:** blue-family palette (blue-50 → blue-800) with semantic aliases
- **Type:** UI font + scale tokens; spacing scale; radius/shadow/transition tokens
- **Components:** page banners with scrim + water-fx canvas, cards, trust bar, affiliation cards, Ken Burns slideshow, CTA strips
- **Constraints:** HIPAA-conscious — intake goes through embedded IntakeQ iframe; no PHI touches this site

**Question for the designer:** evolve this system, or propose a new direction? (Evolving is cheaper and the bones are solid.)

## 9. Scope & Deliverables Requested

Check what you're asking the designer for:

- [ ] **Design review/teardown only** — annotated notes on the live site with specific direction (lowest cost, highest leverage)
- [ ] **Art direction** — color, type, and photography direction as a style guide
- [ ] **Full page mockups** — Figma designs for all 5 pages
- [ ] **Homepage mockup only** — set the direction; remaining pages follow the system

## 10. Budget & Timeline

- Budget range: [ ]
- Desired timeline: [ ]
- Decision-maker: Matthew Laird (sole)

## 11. What Happens With the Designer's Output

Implementation is handled — designer notes/mockups will be translated into precise engineering tasks and executed against the existing codebase. The designer does **not** need to write code, only to provide clear visual direction (annotated screenshots, a Figma file, or a written teardown all work).

---

*Repo: https://github.com/MatthewLairdHeadlight/headlight-site · Live behavior documented in README.md*
