# LLM Design System

A production-ready design system for SaaS energy industry applications, optimized for LLM accessibility.

## Tech Stack

- **React + TypeScript** - Component library foundation
- **Radix UI** - Accessible, unstyled primitives
- **Tailwind CSS** - Utility-first styling
- **W3C Design Tokens** - Standardized design values
- **Style Dictionary** - Token transformation and distribution
- **Storybook** - Component documentation and testing
- **Model Context Protocol (MCP)** - AI integration with Figma and Cursor
- **llms.txt** - LLM-friendly documentation

## Project Structure

```
llm-design-system/
├── packages/
│   ├── tokens/          # Design tokens (W3C format)
│   └── ui/              # Component library
├── apps/
│   └── docs/            # Storybook app
├── mcp/                 # MCP servers for AI integration
└── .storybook/          # Storybook configuration
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 9.0.0

### Installation

```bash
pnpm install
```

### Development

Start Storybook development server:

```bash
pnpm dev
```

### Build

Build all packages:

```bash
pnpm build
```

Build specific packages:

```bash
pnpm build:tokens  # Build design tokens
pnpm build:ui      # Build component library
```

## Packages

### `@design-system/tokens`

Design tokens in W3C format, transformed via Style Dictionary into CSS variables, TypeScript types, and Tailwind config.

### `@design-system/ui`

React component library built on Radix UI primitives, styled with Tailwind CSS.

## Documentation

- **llms.txt** - Concise LLM-friendly documentation
- **llms-full.txt** - Comprehensive design system documentation
- **Storybook** - Interactive component documentation (run `pnpm dev`)

## License

MIT

