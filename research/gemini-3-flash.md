# Design System Tech Stack Research - Gemini 3 Flash

## User Query
Research the best tech stack for a design system. The system will be used to power a SaaS web application for the energy industry, written in TypeScript. The design system will be used by AIs (Figma Make, Cursor, others) so availability to LLMs is a big plus.

## Assistant Response
To build a world-class design system for a TypeScript-powered SaaS application in the energy industry—with a specific focus on AI readiness (Figma Make, Cursor, etc.)—I recommend the following "AI-Native" tech stack.

### 1. The Core Architecture: "Shadcn-style" (Open Source Components)
Rather than building an opaque, versioned NPM library, use a **component distribution pattern** (similar to [shadcn/ui](https://ui.shadcn.com/)).

*   **Tech**: React + TypeScript + Radix UI (Primitives).
*   **Why for Energy**: The energy industry requires high-density data and strict accessibility (A11y). Radix provides the "headless" logic (keyboard nav, ARIA labels) while you control the styling.
*   **Why for AI**: LLMs like Cursor and Figma Make work best when they can **read the source code**. By having the component source code directly in your repository (instead of hidden in `node_modules`), AI agents can understand the implementation details and generate new UI patterns that perfectly match your existing logic.

### 2. The Styling & Tokens: Semantic Utility
*   **Styling**: **Tailwind CSS**. 
    *   *AI Benefit*: Tailwind utility classes are highly semantic and searchable. AI models have been trained extensively on Tailwind, making them much better at generating UI using utility classes than custom CSS-in-JS.
*   **Tokens**: **Style Dictionary** (W3C Design Token Standard).
    *   *AI Benefit*: Store your design tokens (colors, spacing, typography) in a standard JSON format. You can then provide this JSON file to an LLM context, allowing it to "know" your brand rules programmatically.
*   **Figma Integration**: **Figma Variables** + **Token Studio**. This allows a bi-directional sync between Figma designs and your TypeScript code.

### 3. AI-Specific Integration (The "Killer Feature")
To make your design system truly available to LLMs, you should implement the **Model Context Protocol (MCP)**.

*   **Custom MCP Server**: Build a small MCP server for your design system. This allows Cursor to:
    *   List all available components.
    *   Read the documentation for a specific component.
    *   Search for design tokens (e.g., "What is our primary brand color for alerts?").
*   **`llms.txt`**: Add an `llms.txt` file to your documentation root. This is a new convention for providing a condensed, LLM-friendly version of your docs that AIs can ingest quickly without crawling HTML.

### 4. Domain-Specific Features (Energy Industry)
Energy apps often deal with telemetry, maps, and high-density dashboards. Your system should include:

*   **Density Tokens**: A `compact` vs. `comfortable` spacing toggle to handle data-heavy telemetry screens.
*   **Data Visualization Primitives**: Instead of just buttons/inputs, include standardized wrappers for **TanStack Table** (grids) and **Recharts/Visx** (energy production curves) to ensure consistent data display.
*   **High-Contrast Mode**: A first-class theme for field workers using devices in direct sunlight.

### Summary Stack Recommendation

| Layer | Tool |
| :--- | :--- |
| **Framework** | React 19 + TypeScript |
| **Primitives** | Radix UI (Accessible, Headless) |
| **Styling** | Tailwind CSS |
| **Components** | Custom "Shadcn-style" (Source code in repo) |
| **Tokens** | Style Dictionary (JSON-based) |
| **Docs** | Storybook (MDX) + `llms.txt` |
| **AI Sync** | Model Context Protocol (MCP) + Figma Variables |
| **Data Vis** | TanStack Table + Visx |

---

## User Query
We're just discussing the tech stack for now, no build needed.
You recommended Tailwind. What are the pros/cons of using it?

## Assistant Response
Tailwind CSS is currently the industry standard for building modern design systems, but it represents a specific philosophy (utility-first) that comes with distinct trade-offs.

### **The Pros**

#### **1. AI & LLM Friendliness (The "Big Plus")**
*   **Semantic Training Data**: LLMs (like Cursor or GPT-4o) have seen millions of lines of Tailwind code. They are "fluent" in Tailwind.
*   **Zero-Context Styling**: Because the styles are in the HTML, the AI doesn't have to "jump" between files to understand how a component looks.
*   **Standardization**: AI works best with standard patterns. Tailwind provides a rigid, predictable vocabulary.

#### **2. High Performance & Bundle Size**
*   **Constant CSS Size**: Tailwind’s CSS bundle plateaus because it reuses the same utility classes.
*   **JIT (Just-In-Time)**: It only generates the CSS you actually use.

#### **3. Developer Velocity & Consistency**
*   **No Context Switching**: Developers don't have to spend time naming classes or switching between `.tsx` and `.css` files.
*   **Enforced Design Tokens**: By configuring `tailwind.config.ts`, you force the entire team (and the AI) to use only approved tokens.

#### **4. Deep TypeScript Integration**
*   Using tools like **Class Variance Authority (CVA)**, you can create type-safe component variants.

### **The Cons**

#### **1. The "Ugly Markup" Problem**
*   **Readability**: Long strings of classes can be overwhelming for human eyes.
*   **Maintenance**: If you don't use a component-based framework (like React), updating a style across multiple places is difficult.

#### **2. Initial Learning Curve**
*   Developers need to learn the Tailwind "shorthand."

#### **3. Abstraction Fatigue**
*   Constant debate about *when* to move styles from a component into a reusable utility.

#### **4. Configuration Complexity**
*   Robust `tailwind.config.ts` for complex industry needs (high-contrast, density) requires upfront architectural effort.

### **The "Energy Industry" Verdict**

| Factor | Tailwind Performance |
| :--- | :--- |
| **Data Density** | **High.** Easy toggling between "Compact" and "Standard" views. |
| **Maintenance** | **High.** Prevents "Append-only CSS" problem. |
| **AI Integration** | **Exceptional.** Currently the #1 reason to use it for AI-assisted development. |

