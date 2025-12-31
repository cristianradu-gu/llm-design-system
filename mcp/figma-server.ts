#!/usr/bin/env node

/**
 * MCP Server for Figma Integration
 * 
 * Provides bi-directional sync between Figma Variables and design tokens
 * Enables AI tools to query and update design tokens from Figma
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new Server(
  {
    name: 'figma-design-system',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Load design tokens
async function loadTokens() {
  const tokensPath = path.join(__dirname, '../packages/tokens/tokens.json');
  const tokensContent = await fs.readFile(tokensPath, 'utf-8');
  return JSON.parse(tokensContent);
}

// Save design tokens
async function saveTokens(tokens: any) {
  const tokensPath = path.join(__dirname, '../packages/tokens/tokens.json');
  await fs.writeFile(tokensPath, JSON.stringify(tokens, null, 2), 'utf-8');
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_figma_tokens',
        description: 'Get design tokens from Figma Variables (simulated - requires Figma API integration)',
        inputSchema: {
          type: 'object',
          properties: {
            fileKey: {
              type: 'string',
              description: 'Figma file key',
            },
          },
        },
      },
      {
        name: 'sync_tokens_from_figma',
        description: 'Sync design tokens from Figma Variables to code',
        inputSchema: {
          type: 'object',
          properties: {
            fileKey: {
              type: 'string',
              description: 'Figma file key',
            },
          },
        },
      },
      {
        name: 'sync_tokens_to_figma',
        description: 'Sync design tokens from code to Figma Variables',
        inputSchema: {
          type: 'object',
          properties: {
            fileKey: {
              type: 'string',
              description: 'Figma file key',
            },
          },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'get_figma_tokens': {
        // In a real implementation, this would fetch from Figma API
        const tokens = await loadTokens();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(tokens, null, 2),
            },
          ],
        };
      }

      case 'sync_tokens_from_figma': {
        // In a real implementation, this would:
        // 1. Fetch variables from Figma API
        // 2. Transform to W3C format
        // 3. Save to tokens.json
        // 4. Trigger Style Dictionary build
        
        return {
          content: [
            {
              type: 'text',
              text: 'Token sync from Figma would be implemented here. Requires Figma API access.',
            },
          ],
        };
      }

      case 'sync_tokens_to_figma': {
        // In a real implementation, this would:
        // 1. Load tokens from tokens.json
        // 2. Transform to Figma Variables format
        // 3. Update Figma via API
        
        const tokens = await loadTokens();
        return {
          content: [
            {
              type: 'text',
              text: `Tokens ready to sync to Figma:\n${JSON.stringify(tokens, null, 2)}`,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Figma MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

