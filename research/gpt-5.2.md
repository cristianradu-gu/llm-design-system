### Thread: Tech stack for an AI-friendly TypeScript design system (SaaS, energy industry)

---

### Recommendation (best default stack for your constraints)
For a TypeScript SaaS design system that must be **reliable (enterprise/energy)** and **easy for AIs to consume**, the best “default” stack is:

- **Monorepo**: `pnpm` workspaces + `turborepo`
- **Tokens-first foundation**: **CSS Variables** as the runtime contract + **Design Tokens JSON** as the source of truth
- **Component layer**: **React + TypeScript** component library built on **accessible primitives** (Radix or React Aria)
- **Styling**: **vanilla-extract** (build-time CSS-in-TS) *or* “CSS Modules + CSS variables” (simpler)
- **Docs/Playground**: **Storybook** as the canonical, searchable component & token reference
- **Build & release**: `tsup` (library bundling) + **Changesets** (versioning/changelogs) + npm registry (private or public)
- **Quality gates**: `vitest` + Testing Library + `playwright` + `axe-core`

This combo is “LLM-friendly” because it produces **machine-readable artifacts** (tokens JSON, typed props, predictable CSS vars) plus **human-readable docs** (Storybook/MDX) that AI agents can index and cite.

---

### Why this stack works especially well for “used by AIs”
- **Stable contracts**:
  - **Tokens**: JSON tokens + CSS variables = AIs can safely change values without breaking APIs.
  - **Components**: TypeScript props are a perfect “schema” for LLMs.
- **Discoverability**:
  - Storybook becomes the “API reference + examples” that LLMs can follow.
- **Low ambiguity**:
  - Avoid heavy runtime styling magic; build-time + CSS vars tends to be more predictable for agents.

---

### Key tech choices (and when to pick the alternative)
- **Primitives**
  - **Radix UI**: Great default for SaaS dashboards (unstyled, accessible baseline, fast to assemble).
  - **React Aria**: Pick if you want an even more “accessibility-first by construction” approach and are comfortable composing more yourself.
- **Styling**
  - **vanilla-extract**: Best if you want typed themes/recipes and scalable theming without runtime cost.
  - **Tailwind**: Fine if your team already standardizes on it, but keep **design tokens + CSS vars** as the source of truth.
- **Docs**
  - **Storybook**: Best for interactive props, a11y addons, and a “component workbench”.
  - **Docusaurus**: Add only if you need lots of long-form docs beyond component docs (or embed Storybook inside).

---

### “LLM availability” checklist (what actually moves the needle)
- **Publish a single canonical reference** in-repo:
  - `packages/tokens/**` JSON + generated CSS variables
  - `packages/components/**` typed components with JSDoc on props
  - `apps/storybook/**` with usage examples and do/don’t guidance
- **Generate an LLM-friendly manifest**:
  - `design-system.manifest.json` containing: component names, import paths, prop summaries, token categories, theming model, supported variants
- **Provide “recipes” explicitly**:
  - “How to add a component”, “How to add a token”, “How to theme”, “Accessibility requirements”
- **(Big plus) Expose via MCP for editors/agents**:
  - A small internal **MCP server** that can answer: “list components”, “get component docs”, “search tokens”, “show examples”.

---

### Suggested package layout (practical + scalable)
- `packages/tokens` — source tokens (JSON), transforms, outputs (CSS vars, TS types)
- `packages/icons` — SVGs + React components (with naming conventions)
- `packages/components` — React components (built on primitives), themes, utilities
- `packages/eslint-config` / `packages/tsconfig` — consistent tooling
- `apps/storybook` — docs + interactive sandbox
- `apps/playground` (optional) — real-ish app shell for “integration realism” tests

---

### Primitives (what they are + best options)
**Primitives** are low-level, unstyled building blocks (Dialog, Popover, Select, Tabs, Tooltip, Menu, etc.) that handle the hard parts: keyboard nav, focus management, ARIA, layering/portals, typeahead, dismiss behaviors. Your design system then “skins” them consistently.

#### Best default for a React SaaS design system: **Radix Primitives**
- **Why it fits SaaS**: strong coverage for “dashboard UI” patterns (menus, popovers, dialogs, dropdowns), good ergonomics, large adoption.
- **How you use it**: wrap each primitive into your branded component (`<Select />`, `<Modal />`), expose a small, consistent API, and keep Radix-specific parts internal.
- **Key gotcha**: Radix is “accessible baseline”, but you still own final UX (error messaging semantics, labels, density, disabled states, etc.).

#### Strong alternative: **React Aria**
- **Why pick it**: extremely accessibility-focused; hook-driven so you control markup and styling completely (good for strict design requirements).
- **Tradeoff**: more composition work; you’ll build more structure yourself (but you also get more control and fewer “library opinions”).

#### “No primitives” (build from scratch)
- **When it makes sense**: only if your component set is tiny or you have deep a11y expertise/time.
- **Reality**: focus management + keyboard interactions + edge cases are where most homegrown DSs bleed time and bugs.

#### Practical advice
- **Pick one primitives stack and commit** early—mixing Radix + headless + custom per-component quickly leads to inconsistent behavior.
- **Write wrappers that hide the primitive**: your public API should be stable even if you swap the primitive later.
- **Add a11y regression tests** around wrappers (keyboard flows + axe checks).

---

### Styling (best options + how they affect theming and AI use)
Design-system styling has 3 hard requirements:
- **Themeability** (light/dark/high-contrast, tenant theming)
- **Override strategy** (how product teams customize safely)
- **Predictability** (SSR/CSR consistency, fewer runtime surprises)

#### Best default for a component library: **CSS variables + (build-time) CSS**
Make **CSS variables** the runtime contract: `--color-bg`, `--space-2`, `--radius-md`, etc. Then implement component styles in a method that compiles to CSS.

That gives you:
- **Fast theming**: swap variables on a root element
- **Stable interface for AIs**: LLMs can adjust tokens/variables without rewriting component internals
- **Fewer runtime bugs**: no style injection order surprises

---

### Styling option A (strong DS choice): **vanilla-extract**
- **What it is**: CSS-in-TS that compiles to real CSS at build time (no runtime styling library).
- **Why it’s good for design systems**:
  - Great for **typed themes** and centralized token usage
  - Encourages consistent patterns (variants/recipes)
  - Very predictable output for SSR + component libraries
- **Tradeoffs**:
  - Some tooling learning curve
  - Build integration complexity vs plain CSS modules

**Use vanilla-extract if** you want a “library-grade” DS with strong theming and long-term maintainability.

---

### Styling option B (simplest + very reliable): **CSS Modules + CSS variables**
- **Why it’s good**:
  - Minimal tooling complexity
  - Very predictable, easy to debug
  - Great performance characteristics
- **Tradeoff**: you lose some “typed styling ergonomics” and variant systems can be more manual.

**Use CSS Modules if** you want maximum simplicity and don’t need advanced typed theming ergonomics.

---

### Styling option C (common but riskier in DS libs): **runtime CSS-in-JS (Emotion/styled-components)**
- **Pros**: dynamic styling is easy, huge ecosystem.
- **Cons for a design system**:
  - SSR/hydration and injection order pitfalls
  - Performance overhead in large apps
  - Harder for AIs to make “safe changes” without understanding runtime behavior

**Use runtime CSS-in-JS only if** your org already standardizes on it and you have patterns/tests to control the pitfalls.

---

### What I’d pick for your case (energy SaaS + TS + AI-friendly)
- **Primitives**: **Radix** (default) unless you have unusually strict a11y/custom markup requirements → then **React Aria**.
- **Styling**: **CSS variables + vanilla-extract** for the DS core. If you want lowest friction: **CSS Modules + CSS variables**.

---

### Two quick questions (to narrow the “best” choice)
- **Do you need strong tenant theming** (per-customer branding) or just light/dark/high-contrast?
- **Are you optimizing for “product teams can override styles”** (high customization) or “design system controls everything” (low customization)?

