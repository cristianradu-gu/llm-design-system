# Contributing

This repo is meant to be easy to extend (and easy for LLMs to reason about).

## Add / change a token
1. Edit token sources:
   - Core: `packages/tokens/tokens/core.json`
   - Semantic: `packages/tokens/tokens/semantic.json`
   - Theme overrides: `packages/tokens/themes/dark.json` (and/or `light.json`)
2. Rebuild tokens:
   - `pnpm --filter @acme/tokens build`
3. If you need a Tailwind alias for it, map it in:
   - `packages/tailwind-preset/index.js`

## Add / change a component
1. Create or edit a component in:
   - `packages/ui/src/components/`
2. Export it from:
   - `packages/ui/src/index.ts`
3. Prefer Radix primitives for interactive components (Dialog, DropdownMenu, Tabs, etc.).

## Add / change Storybook docs
1. Add stories in:
   - `apps/storybook/src/**/*.stories.tsx`
2. Run Storybook (after installs/builds):
   - `pnpm storybook`

## Theme rules
- Theme switching uses `data-theme="light|dark"` on the `html` element.
- Tokens emit both theme variable sets; components should rely on semantic utilities like:
  - `bg-bg-canvas`, `bg-bg-surface`, `text-fg`, `text-fg-muted`, `border-border`.


