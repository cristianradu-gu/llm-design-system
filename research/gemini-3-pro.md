This is a strategic choice. For a design system in 2025 intended to be "read" and written by AIs (Cursor, Figma Make, Copilot), you must prioritize **context availability**.

Traditional design systems (distributed as compiled `npm` packages) are "black boxes" to an LLM—the AI cannot see the internal logic to modify it.

For an Energy SaaS (high data density, dashboards, complex forms) built with TypeScript, the best stack uses a **"Headless + Copy-Paste"** architecture.

### The Recommended Tech Stack

| Layer | Technology | Why it's best for AI & Energy |
| --- | --- | --- |
| **Core Framework** | **React** | The absolute highest training volume for LLMs. AIs write better React than Svelte or Vue simply due to dataset size. |
| **Language** | **TypeScript** | Non-negotiable for energy apps. AI acts as a stochastic parrot; TypeScript acts as the "guardrail" to catch hallucinated props or types. |
| **Styling** | **Tailwind CSS** | **Critical Choice.** LLMs are exceptionally good at predicting text tokens. Tailwind strings are easier for AI to generate than writing new CSS classes/files. |
| **Primitives** | **Radix UI** | "Headless" accessible components. It handles the complex accessibility logic (keyboard nav, screen readers) so the AI doesn't have to "invent" it. |
| **Architecture** | **Shadcn/ui** | **The Key Differentiator.** Instead of an npm package, components live in your `/components` folder. The AI can *read* the code, understand the variant implementation, and modify it. |
| **Icons** | **Lucide React** | The standard vector set for this stack; highly consistent and AI-recognized. |

---

### Why this stack wins for AI Workflows

#### 1. The "Copy-Paste" Advantage (Shadcn Architecture)

In a traditional system, you import `<Button />` from `@my-org/design-system`. If you ask Cursor to "add a loading spinner to the button," it often fails because it cannot see the source code inside that package.

With the **Shadcn** approach, the Button component lives in `src/components/ui/button.tsx`.

* **Availability:** When you open a file in Cursor, the AI indexes your local components.
* **Modifiability:** You can tell the AI: *"Modify the Button component to support a 'danger-outline' variant,"* and it can execute that perfectly because the code is local.

#### 2. Optimization for Energy Industry Needs

Energy applications (grid management, asset tracking, consumption dashboards) have specific needs that this stack supports:

* **Data Density (Tables):**
* **Recommendation:** **TanStack Table (React Table)**.
* *Why:* It is "headless" (logic only). You ask the AI to "Build a data grid with sorting, filtering, and row selection using our design system tokens," and it binds TanStack logic to your Tailwind UI perfectly.


* **Visualization (Charts):**
* **Recommendation:** **Recharts** or **Visx**.
* *Why:* Recharts is widely covered in LLM training data. Visx (by Airbnb) is more low-level but excellent if you need custom SVG visualizations for things like pipeline schematics or grid loads.


* **Forms (Complex Inputs):**
* **Recommendation:** **React Hook Form** + **Zod**.
* *Why:* Energy apps have massive forms. Zod schemas allow you to define the *shape* of your data first. You can paste a Zod schema into Cursor and say, *"Generate a form interface for this schema,"* and it will build the UI automatically.



---

### The Workflow: Figma to Code to AI

To make this system "AI-Native," you need to bridge the gap between design and code context.

#### Phase 1: Figma "Make" Preparation

Don't just draw rectangles. Use **Figma Variables** that match your Tailwind config.

* **Name Match:** If Figma uses `blue-500`, your Tailwind config must map `primary` to `blue-500`.
* **Slot Architecture:** Design components in Figma to mimic HTML structures (AutoLayout = Flexbox). This makes the "Figma to Code" translation cleaner.

#### Phase 2: Context Loading (.cursorrules)

This is the "secret sauce." You must create a file in your repo (usually `.cursorrules` or a pinned documentation file) that tells the AI how to use your system.

**Create a file `docs/ai-guidelines.md`:**

```markdown
# AI Design System Guidelines

1. **Styling:** Always use Tailwind CSS classes. Do not create new CSS modules.
2. **Components:** Prefer importing from `@/components/ui`.
3. **Icons:** Use `lucide-react`. imports: `import { IconName } from 'lucide-react'`
4. **Colors:** Use CSS variables defined in `globals.css` (e.g., `bg-primary`, `text-muted-foreground`).
5. **New Components:** If creating a new complex component, build it using Radix UI primitives.

```

#### Phase 3: Documentation as Code

Don't use a separate CMS for docs. Use **Storybook** or simply nice Markdown files in the repo.

* **Why:** If your documentation is code (Markdown/MDX) inside the repo, Cursor/Copilot can read it as context. If it's on a website, the AI can't see it as easily while coding.

### High-Value Next Step

Would you like me to generate a **`.cursorrules`** template tailored for this specific stack (React/Radix/Tailwind) that you can drop into your project root to immediately improve Cursor's code generation accuracy?