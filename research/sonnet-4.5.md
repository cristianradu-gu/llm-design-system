# Design System Tech Stack Research - Claude Sonnet 4.5

**Date:** December 31, 2025  
**Context:** Research for a design system to power a SaaS web application for the energy industry, written in TypeScript. The design system will be used by AIs (Figma Make, Cursor, others) so availability to LLMs is a big plus.

---

## Initial Research

### Core Tech Stack Recommendations

#### Core Component Library

**React + TypeScript**
- Most widely adopted and AI tool-friendly
- Strong TypeScript support for type safety
- Excellent LLM training data availability
- Component-based architecture aligns with design system patterns

#### Design Tokens & Theming

**Style Dictionary + CSS Variables**
- Industry standard for design token management
- Outputs tokens in multiple formats (CSS, JSON, TypeScript)
- AI-readable token files make it easy for LLMs to understand your design language
- Works seamlessly with Figma plugins

#### Documentation & Development

**Storybook**
- De facto standard for component documentation
- Interactive component playground
- Generates visual documentation that both humans and AIs can parse
- Supports TypeScript and automatic prop documentation
- MDX format is highly readable by LLMs

#### Build & Packaging

**Vite or Rollup**
- Modern, fast bundling
- Excellent TypeScript support
- ESM and CJS output for maximum compatibility
- Simple configuration that's easy to maintain

#### AI Integration Layer (Critical for AI use case)

**Model Context Protocol (MCP)**
- Open standard developed by Figma specifically for AI-design tool integration
- Allows Cursor and other AI tools to access your design system programmatically
- Connects Figma designs directly to code components

**Design Tokens in JSON**
- Keep tokens in JSON format alongside TypeScript
- Makes them directly consumable by LLMs without compilation
- Enables AI tools to suggest token usage correctly

#### Deployment

**NPM Package + Vercel/Netlify for Storybook hosting**
- Publish components as npm package
- Host interactive Storybook documentation
- Provides public URL for AI tools to reference

#### Additional Tooling

1. **Prettier + ESLint** - Consistent code formatting (LLMs work better with consistent code)
2. **Changesets** - Version management and changelog generation
3. **Turborepo** (if monorepo) - Fast builds and caching
4. **Vitest** - Fast, modern testing framework

### Key Recommendations for AI Accessibility

1. **Comprehensive TypeScript Types** - Export all prop types, making it easy for AI to suggest correct usage
2. **Component Usage Examples** - Include multiple examples in Storybook stories
3. **Semantic Naming** - Use clear, descriptive names for components and props
4. **JSON Schema Export** - Generate JSON schemas from TypeScript types for AI consumption
5. **README per Component** - Markdown documentation is highly LLM-readable

### Suggested Project Structure

```
design-system/
├── packages/
│   ├── tokens/          # Design tokens (JSON + generated TS)
│   ├── components/      # React components
│   └── themes/          # Theme configurations
├── docs/                # Storybook documentation
├── scripts/             # Build & token generation scripts
└── mcp-config/          # Model Context Protocol configuration
```

---

## UI/Styling Solution Recommendations

### Option 1: Radix UI + Tailwind CSS (shadcn/ui approach) ⭐ **RECOMMENDED FOR AI**

**Why this is best for AI tools:**
- **Radix UI**: Unstyled, accessible primitives (headless components)
- **Tailwind CSS**: Utility-first CSS that's highly readable by LLMs
- **shadcn/ui pattern**: Copy-paste components into your codebase (AI can easily read and modify)

**Pros:**
- Maximum customization and control
- AI tools understand Tailwind classes extremely well (tons of training data)
- Components live in your codebase (not node_modules), so AI can read and modify them
- Excellent accessibility out of the box
- No runtime CSS-in-JS overhead
- Perfect for energy industry where you need custom branding

**Stack:**
```
Radix UI (primitives) + Tailwind CSS + shadcn/ui pattern
```

---

### Option 2: Chakra UI ⭐ **BEST DEVELOPER EXPERIENCE**

**Why it's great:**
- Style props-based approach (highly intuitive)
- Built-in theming system with design tokens
- Excellent TypeScript support
- Composable components
- Built-in dark mode

**Pros:**
- Fastest development speed
- Great documentation
- AI-friendly prop-based styling
- Strong community

**Cons:**
- More opinionated than Radix approach
- Harder to achieve fully custom designs

---

### Option 3: MUI (Material-UI) - **ENTERPRISE READY**

**Why consider it:**
- Most comprehensive component library
- Battle-tested in production
- Enterprise-grade features (data grids, date pickers, etc.)
- Strong TypeScript support

**Pros:**
- Huge component library
- Excellent documentation
- Widely used (good for AI training data)
- Professional appearance

**Cons:**
- Material Design look is harder to customize
- Heavier bundle size
- Can feel "Google-y" if not heavily customized

---

### Option 4: Vanilla Extract + Radix UI - **TYPE-SAFE CSS**

**Why it's cutting-edge:**
- Zero-runtime CSS-in-JS
- Type-safe styles
- Excellent for TypeScript-heavy projects

**Pros:**
- Type safety for CSS
- No runtime overhead
- Modern approach
- Great for design tokens

**Cons:**
- Smaller community
- Newer tool (less AI training data)

---

## Final Recommendation

### **Go with: Radix UI + Tailwind CSS + shadcn/ui pattern**

**Here's why this is optimal for AI-powered development:**

1. **LLM Training Data**: Tailwind has extensive representation in AI training datasets
2. **Readable Code**: `className="flex items-center gap-2"` is more LLM-friendly than CSS-in-JS
3. **Copy-Paste Components**: AI can see and understand your entire component implementation
4. **Figma Integration**: Tailwind classes can be auto-generated from Figma designs
5. **Customization**: Energy industry needs custom branding, not Material Design
6. **Accessibility**: Radix handles all ARIA attributes and keyboard navigation
7. **Modern**: This is the direction the industry is moving in 2025

### Complete Stack Recommendation:

```
UI Layer:
├── Radix UI          # Accessible primitives
├── Tailwind CSS      # Utility-first styling
├── shadcn/ui         # Component patterns
├── CVA (class-variance-authority)  # Variant management
└── tailwind-merge    # Conditional class merging

Styling Architecture:
├── Design Tokens     # JSON → Tailwind config
├── Tailwind Config   # Theme definition
└── Component Library # Built on Radix + Tailwind
```

---

## Full Stack Summary

```
Frontend Framework:     React + TypeScript
UI Components:          Radix UI (headless)
Styling:                Tailwind CSS
Component Pattern:      shadcn/ui approach (copy-paste)
Design Tokens:          Style Dictionary → JSON → Tailwind
Documentation:          Storybook + MDX
Build Tool:             Vite
Testing:                Vitest
Version Management:     Changesets
AI Integration:         Model Context Protocol (MCP)
Package Management:     pnpm (monorepo-friendly)
Monorepo Tool:          Turborepo (optional)
Deployment:             NPM registry + Vercel/Netlify
```

---

## Key Differentiators for AI/LLM Accessibility

1. **Tailwind CSS** - Highly represented in AI training data
2. **Component Source in Repo** - AI can read and modify components directly
3. **JSON Design Tokens** - Directly consumable by LLMs
4. **MCP Integration** - Figma ↔ Code bridge for AI tools
5. **TypeScript Throughout** - Type safety aids AI code generation
6. **Storybook + MDX** - Machine-readable documentation
7. **Semantic Naming** - Clear, predictable API for AI suggestions

---

## Next Steps

1. Set up monorepo structure
2. Configure Tailwind with design tokens
3. Set up Radix UI primitives
4. Implement shadcn/ui component pattern
5. Configure Storybook
6. Set up MCP for Figma integration
7. Create initial token system
8. Build first components (Button, Input, etc.)
9. Deploy Storybook documentation
10. Publish to NPM

