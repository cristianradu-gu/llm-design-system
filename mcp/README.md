# MCP Servers

Model Context Protocol servers for design system integration.

## Servers

### `figma-server.ts`

MCP server for Figma integration. Provides bi-directional sync between Figma Variables and design tokens.

**Tools:**
- `get_figma_tokens` - Get design tokens from Figma Variables
- `sync_tokens_from_figma` - Sync tokens from Figma to code
- `sync_tokens_to_figma` - Sync tokens from code to Figma

### `design-system-server.ts`

MCP server for design system querying. Enables AI tools to query components, tokens, and documentation.

**Tools:**
- `list_components` - List all available components
- `get_component` - Get component source code
- `get_tokens` - Get design tokens (optionally filtered by category)
- `search_components` - Search components by name or functionality

## Usage

### Running the servers

```bash
# Figma server
pnpm --filter @design-system/mcp dev

# Design system server
pnpm --filter @design-system/mcp dev:design-system
```

### Configuring in Cursor

Add to your Cursor MCP configuration:

```json
{
  "mcpServers": {
    "figma-design-system": {
      "command": "node",
      "args": ["mcp/figma-server.ts"]
    },
    "design-system-query": {
      "command": "node",
      "args": ["mcp/design-system-server.ts"]
    }
  }
}
```

## Implementation Notes

- Figma API integration requires authentication tokens
- Both servers use stdio transport for MCP communication
- Component and token queries read directly from the codebase

