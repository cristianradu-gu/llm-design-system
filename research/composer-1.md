# Design System Tech Stack Research - Composer Discussion

## Initial Request

Research the best tech stack for a design system. The system will be used to power a SaaS web application for the energy industry, written in TypeScript. The design system will be used by AIs (Figma Make, Cursor, others) so availability to LLMs is a big plus.

## Research Summary

### Core Technology Stack Recommendations

#### 1. Frontend Framework
**React + TypeScript**
- Industry standard for SaaS applications
- Strong TypeScript support with excellent type inference
- Component-based architecture aligns with design system principles
- Extensive ecosystem and community support
- LLM-friendly: TypeScript types provide clear contracts for AI tools

#### 2. Component Library Foundation
**Radix UI + shadcn/ui pattern**
- **Radix UI**: Unstyled, accessible primitives (headless components)
  - WCAG compliant out of the box
  - Maximum flexibility for custom styling
  - Well-typed TypeScript APIs
- **shadcn/ui approach**: Copy-paste component pattern
  - Components live in your codebase (not node_modules)
  - Easy to customize and extend
  - LLM-friendly: AI can read and modify component source directly
- **Alternative**: Material-UI or Ant Design if you prefer more opinionated, pre-styled components

#### 3. Styling Solution
**Tailwind CSS** (Recommended for LLM accessibility)
- Explicit class names are more readable by LLMs
- Utility classes provide clear intent (`text-lg`, `bg-primary-500`)
- Design tokens map directly to Tailwind config
- Better performance (no runtime CSS-in-JS overhead)
- Easier for AI to generate correct styling

#### 4. Design Tokens Format
**W3C Design Tokens Format (JSON)**
- Standard JSON structure that LLMs can easily parse
- TypeScript types generated from tokens
- Multi-platform support (CSS variables, iOS, Android)
- Tools: `style-dictionary` or `tokens-studio`
- Structure:
  ```json
  {
    "color": {
      "primary": {
        "500": { "value": "#3b82f6" }
      }
    },
    "spacing": {
      "md": { "value": "1rem" }
    }
  }
  ```

#### 5. Build Tool
**Vite** (for component library) or **Next.js** (if building full app)
- Vite: Fast, modern, excellent TypeScript support
- Next.js: If design system is part of larger application
- Both support TypeScript and modern ES modules

#### 6. Documentation
**Storybook**
- Industry standard for design system documentation
- Interactive component playground
- LLM-friendly: Stories are TypeScript/JavaScript that AI can understand
- Auto-generates component API documentation
- Integrates with design tokens and Figma

#### 7. Package Management
**pnpm** (recommended) or **npm**
- Faster installs and better disk efficiency
- Strict dependency resolution
- Workspace support for monorepos

## LLM Accessibility Features

### TypeScript Type Definitions
- Export comprehensive types for all components
- Use JSDoc comments for component props and APIs
- Generate TypeScript declaration files (`.d.ts`)
- Example:
  ```typescript
  /**
   * Button component for primary actions
   * @param variant - Visual style variant
   * @param size - Size of the button
   */
  export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
  }
  ```

### File Structure
- Clear, predictable component organization
- Co-locate related files (component, styles, tests, stories)
- Example structure:
  ```
  src/
    components/
      Button/
        Button.tsx
        Button.test.tsx
        Button.stories.tsx
        index.ts
    tokens/
      tokens.json
      tokens.ts (generated types)
  ```

### Design Token Accessibility
- JSON format for easy parsing
- TypeScript types auto-generated from tokens
- CSS variables for runtime access
- Clear naming conventions (semantic over presentational)

### Component API Design
- Explicit prop interfaces (no implicit props)
- Clear prop names and descriptions
- Consistent patterns across components
- Polymorphic components where appropriate (`as` prop pattern)

## AI Tool Integration

### Figma Integration
- **Figma Make**: Connect design system library files
- **Model Context Protocol (MCP)**: Enable Cursor/VS Code to access Figma designs
- **Figma Tokens**: Sync design tokens from Figma to code
- Export components as code snippets

### Cursor/LLM Integration
- Well-typed components enable accurate code generation
- JSDoc comments provide context for AI tools
- Clear file structure helps AI navigate codebase
- Design tokens in JSON format are easily parseable

## Recommended Project Structure

```
llm-design-system/
├── packages/
│   ├── tokens/              # Design tokens (JSON + TypeScript)
│   ├── components/          # React components
│   ├── styles/              # Global styles, Tailwind config
│   └── utils/               # Shared utilities
├── apps/
│   └── storybook/           # Storybook documentation
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## Key Decisions Summary

| Category | Recommendation | LLM-Friendly Reason |
|---------|---------------|---------------------|
| Framework | React + TypeScript | Strong typing, clear APIs |
| Components | Radix UI + shadcn/ui | Source code accessible, well-typed |
| Styling | Tailwind CSS | Explicit classes, token-based |
| Tokens | W3C JSON Format | Standard, parseable, typed |
| Docs | Storybook | Code-based, interactive |
| Build | Vite | Fast, modern, TypeScript-native |

## Tailwind CSS: Detailed Pros and Cons Analysis

### Pros

**1. LLM/AI Accessibility**
- Explicit class names (`text-lg`, `bg-primary-500`) are easier for LLMs to parse than CSS-in-JS
- Predictable patterns: AI can generate correct Tailwind classes
- Token-based: design tokens map directly to Tailwind config
- Readable intent: `flex items-center gap-4` is clearer than CSS-in-JS objects

**2. Design System Integration**
- Design tokens integrate directly into `tailwind.config.js`
- Consistent spacing/colors via tokens
- Easy theming with CSS variables
- Component variants via `@apply` or composition

**3. Performance**
- PurgeCSS removes unused styles in production
- Smaller bundle sizes (often 10–50KB gzipped)
- No runtime CSS-in-JS overhead
- Better caching (CSS files cache separately from JS)

**4. Developer Experience**
- Fast iteration without switching files
- Strong IntelliSense support
- Responsive utilities (`md:`, `lg:`)
- Dark mode support (`dark:`)

**5. Maintainability**
- Less custom CSS to maintain
- Consistent spacing/colors via tokens
- Easy to audit (search for class names)
- Good for large teams

### Cons

**1. Verbose Markup**
- Long class strings can clutter JSX
- Example: `<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">`
- Mitigation: Extract to components or use `@apply` in CSS

**2. Learning Curve**
- Large API surface (hundreds of utilities)
- Naming conventions to learn (`rounded-lg` vs `rounded-md`)
- Less intuitive than semantic class names
- Mitigation: Good docs and team training

**3. Design System Constraints**
- Harder to enforce component-level encapsulation
- Risk of inconsistent patterns without discipline
- Less component-scoped styling than CSS-in-JS
- Mitigation: Component abstraction and design tokens

**4. Vendor Lock-in**
- Hard to migrate away from Tailwind
- Classes are framework-specific
- Less portable than standard CSS
- Mitigation: Use `@apply` for critical styles

**5. Limited Dynamic Styling**
- Harder for highly dynamic styles (e.g., color from props)
- Requires template literals or CSS variables
- Less flexible than CSS-in-JS for runtime values
- Example: `style={{ backgroundColor: dynamicColor }}` is cleaner than Tailwind

**6. Build-time Dependency**
- Requires build step (PostCSS)
- Can slow development builds
- More complex setup than plain CSS
- Mitigation: Modern tools (Vite) handle this well

### Comparison to Alternatives

**Tailwind vs CSS-in-JS (Emotion/Styled Components)**

| Aspect | Tailwind | CSS-in-JS |
|--------|----------|-----------|
| LLM readability | High (explicit classes) | Medium (JS objects) |
| Bundle size | Smaller (purged) | Larger (runtime) |
| Component encapsulation | Lower | Higher |
| Dynamic styling | Harder | Easier |
| Performance | Better (no runtime) | Worse (runtime overhead) |
| Type safety | Medium | High (TypeScript) |

**Tailwind vs CSS Modules**

| Aspect | Tailwind | CSS Modules |
|--------|----------|-------------|
| LLM readability | High | Medium |
| Bundle size | Smaller | Larger |
| Learning curve | Steeper | Gentler |
| Portability | Lower | Higher |

### Recommendations for Your Use Case

**Use Tailwind if:**
- LLM accessibility is a priority
- You want token-based design systems
- Performance matters
- Team can adopt the learning curve
- You're building a component library

**Consider alternatives if:**
- You need heavy runtime dynamic styling
- You want maximum component encapsulation
- You prefer traditional CSS separation
- Team prefers CSS-in-JS patterns

### Hybrid Approach (Best of Both Worlds)

You can combine Tailwind with CSS-in-JS for specific cases:

```typescript
// Use Tailwind for most styling
<Button className="px-4 py-2 bg-primary-500">
  
// Use CSS-in-JS for dynamic/complex cases
<Button style={{ backgroundColor: dynamicColor }}>
```

Or use Tailwind with `@apply` for component-level styles:

```css
.btn-primary {
  @apply px-4 py-2 bg-primary-500 text-white rounded-lg;
  /* Add custom styles that don't fit utilities */
}
```

### Verdict

For a design system with LLM accessibility requirements, Tailwind is a strong choice because:
1. Explicit, parseable class names
2. Direct design token integration
3. Better performance
4. Strong ecosystem and tooling

The main trade-offs are verbosity and a learning curve, which can be managed with component abstraction and documentation.

## Next Steps

1. Set up monorepo structure (pnpm workspaces or Turborepo)
2. Initialize design tokens in W3C format
3. Configure Tailwind with design tokens
4. Set up Radix UI primitives
5. Create first component (Button) with full TypeScript types and JSDoc
6. Configure Storybook with TypeScript
7. Set up Figma token sync (if using Figma)
8. Document component patterns and conventions

## Trade-offs Considered

- **Tailwind vs CSS-in-JS**: Chose Tailwind for LLM readability, but CSS-in-JS (Emotion/Styled Components) offers better component encapsulation
- **Radix vs Material-UI**: Chose Radix for flexibility, but Material-UI offers faster initial development
- **Monorepo vs single package**: Monorepo recommended for scalability, but adds complexity

