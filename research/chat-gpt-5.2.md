Below is a stack that’s proven for TypeScript SaaS design systems and is unusually friendly to AI-assisted building (Figma Make, Cursor, copilots, agents) because the “source of truth” is machine-readable (tokens + typed APIs + markdown docs).

Recommended tech stack (opinionated, AI-friendly)

1) Foundations: tokens-first, standards-based

Why: If AIs can reliably read tokens + generate consistent code, you get way better outputs than “guess the CSS.”
	•	Design tokens format: W3C Design Tokens (DTCG) JSON as the canonical format. It’s explicitly designed for interchange between tools and is JSON + JSON Schema friendly.  ￼
	•	In Figma: Use Figma Variables as the designer-facing authoring surface, then export tokens to JSON as part of your pipeline.  ￼
	•	If you use Tokens Studio, it supports switching token formats (including W3C/DTCG).  ￼
	•	There are also plugins that export Figma variables/styles as W3C DTCG tokens.  ￼

Implementation pattern
	•	tokens/ repo folder contains the canonical DTCG JSON
	•	Build step outputs:
	•	CSS variables (:root { --color-... }) for runtime theming
	•	TypeScript token typings for autocomplete + correctness
	•	(Optional) per-platform outputs later (iOS/Android) without changing the source tokens

2) Component layer: React + “headless” primitives + strict TypeScript

Why: You want accessible, composable components with your own styling system—not a pre-styled UI kit you’ll fight forever.
	•	React + TypeScript component library
	•	Radix UI Primitives as the accessibility/behavior foundation (unstyled, accessible primitives you theme yourself).  ￼

Styling approach (pick one; both work well with tokens)
	•	CSS variables + vanilla-extract (great TS ergonomics + build-time CSS)
	•	CSS variables + Tailwind (fast UI iteration; enforce tokens via Tailwind config + CSS vars)

Either way: ensure all colors/spacing/typography resolve to tokens (so AIs have one source of truth).

3) Documentation + playground: Storybook 8 + MDX + interaction tests

Why: Storybook becomes both human docs and an executable spec that AIs can read and run locally/CI.
	•	Storybook 8 for component workshop/docs/testing  ￼
	•	MDX docs for rich, LLM-readable documentation mixed with live examples  ￼
	•	Interaction/component testing using Storybook’s testing workflow (play function + test runner).  ￼

4) Monorepo + publishing: pnpm + Turborepo + Changesets

Why: Smooth versioning, fast CI, easy consumption by your SaaS app(s).
	•	Monorepo: pnpm workspaces + Turborepo
	•	Versioning & releases: Changesets (generates changelogs + handles semver)
	•	Build tooling: tsup (library build) or vite build (also fine)

5) AI availability: make it easy for tools to ingest

You called this out explicitly, so here are the concrete moves that help most:
	•	Ship an /llms.txt and /llms-full.txt alongside your docs site (and/or in the repo) so LLM tools can load the “clean, curated briefing” instead of scraping a noisy site.  ￼
	•	There are guides describing how teams feed these files into tools like Cursor (even if support varies by workflow/tooling).  ￼
	•	OpenAI itself publishes an LLM-friendly llms.txt variant, which is a useful reference for structure.  ￼

What to include in your llms-full.txt (pragmatic)
	•	Token schema + naming conventions (with examples)
	•	Theming rules (light/dark, high-contrast, brand modes)
	•	Component API snippets (props, controlled/uncontrolled patterns)
	•	“Do/Don’t” guidance (energy SaaS specifics like dense tables, charts, alarms/alerts, status colors)
	•	Copy/paste recipes (forms, dialogs, data tables, empty states, error states)

This materially improves Figma Make / Cursor / agent reliability because they can load one file and follow your rules.

⸻

The “best default” architecture (put together)

Repo layout (example)
	•	packages/tokens/ — DTCG JSON + build scripts to CSS vars + TS types  ￼
	•	packages/ui/ — React components built on Radix primitives  ￼
	•	apps/storybook/ — Storybook + MDX docs + interaction tests  ￼
	•	apps/docs/ (optional) — marketing/docs site that publishes /llms.txt + /llms-full.txt  ￼

⸻

Shortlist of alternatives (when to choose them)
	•	If you’re not React: keep tokens the same (DTCG), swap component framework (e.g., Web Components), and keep Storybook if it fits. Tokens stay portable by design.  ￼
	•	If you want “batteries included” styling: consider a pre-styled library, but you’ll usually sacrifice deep product theming and “AI can generate exact style” determinism.

⸻

What I’d do for an energy-industry SaaS specifically
	•	Double-down on accessibility + high-contrast theming, because dashboards, alarms, and dense operational UIs punish inconsistency.
	•	Treat status semantics (normal/warning/critical/maintenance/offline) as tokens, not ad-hoc colors.
	•	Invest early in table, filter, form, and alert patterns in Storybook—those are what AIs will generate constantly.

If you tell me whether your SaaS UI is React (and whether you prefer Tailwind or not), I can turn this into a concrete starter blueprint (package list, repo scaffold, token pipeline, CI steps, and an llms-full.txt outline) you can drop into a repo.