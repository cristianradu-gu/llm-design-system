# MCP (Model Context Protocol) setup

This repo is designed to work well with AI tools in Cursor using MCP servers (e.g. Figma).

## What we keep in-repo
- An **example** MCP config: `.cursor/mcp.json.example`
- Documentation on how tokens/components map across design and code.

We do **not** commit secrets (tokens/keys). Use environment variables.

## Recommended flow (Figma → code)
1. Figma variables / tokens
2. Export/sync into W3C-ish token JSON
3. Commit into:
   - `packages/tokens/tokens/*.json` (core + semantic)
   - `packages/tokens/themes/*.json` (theme overrides)
4. Rebuild tokens:
   - `pnpm --filter @acme/tokens build`
5. Consume in Storybook + UI:
   - `@acme/tokens/css` and `@acme/tailwind-preset`

## Enable MCP in Cursor
1. Copy the example file:
   - from `.cursor/mcp.json.example`
   - to `.cursor/mcp.json` (local, not committed)
2. Set required environment variables (e.g. `FIGMA_ACCESS_TOKEN`).
3. Restart Cursor so it picks up the MCP servers.


