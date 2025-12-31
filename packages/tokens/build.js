#!/usr/bin/env node

const StyleDictionary = require('style-dictionary');

const styleDictionary = StyleDictionary.extend('./tokens.config.json');

console.log('Building design tokens...\n');

styleDictionary.buildAllPlatforms();

console.log('\n✅ Design tokens built successfully!');
console.log('📦 Outputs:');
console.log('   - dist/tokens.css (CSS custom properties)');
console.log('   - dist/tokens.ts (TypeScript)');
console.log('   - dist/tokens.d.ts (TypeScript declarations)');
console.log('   - dist/tokens.json (JSON for LLM consumption)');
console.log('   - dist/tailwind.config.js (Tailwind config extension)');

