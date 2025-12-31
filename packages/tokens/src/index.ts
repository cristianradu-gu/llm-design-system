/**
 * Design Tokens Package
 * 
 * Exports design tokens in various formats for consumption by:
 * - CSS (custom properties)
 * - TypeScript/JavaScript
 * - Tailwind CSS
 * - LLM tools
 */

// Re-export tokens from build output
export * from '../dist/tokens';

// Export token values as JSON for LLM consumption
export { default as tokens } from '../dist/tokens.json';

