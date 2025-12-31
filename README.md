# llm-design-system

Design system scaffold for a SaaS web application (energy industry), optimized for **LLM readability** and **accessibility**:

- React + TypeScript
- Radix UI primitives
- W3C Design Tokens compiled via Style Dictionary
- Tailwind CSS + shadcn/ui copy-paste component pattern
- Storybook documentation
- MCP + `llms.txt` for AI integration

## Repo layout
- `packages/tokens`: Design tokens (W3C-ish JSON) + Style Dictionary build outputs (CSS vars, optional TS exports)
- `packages/tailwind-preset`: Shared Tailwind preset wired to CSS variables
- `packages/ui`: React component library (Radix-based wrappers, Tailwind styling)
- `apps/storybook`: Storybook site consuming `@acme/ui` + `@acme/tokens`

## Quick start (after installing deps)
```bash
pnpm install
pnpm build
pnpm storybook
```

