#!/usr/bin/env node

/**
 * MCP Server for Design System Querying
 * 
 * Provides AI tools with access to design system components, tokens, and documentation
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
    name: 'design-system-query',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Load tokens
async function loadTokens() {
  const tokensPath = path.join(__dirname, '../packages/tokens/tokens.json');
  const tokensContent = await fs.readFile(tokensPath, 'utf-8');
  return JSON.parse(tokensContent);
}

// Get all component files
async function getComponents() {
  const componentsPath = path.join(__dirname, '../packages/ui/src/components');
  const componentDirs = await fs.readdir(componentsPath, { withFileTypes: true });
  
  const components = [];
  for (const dir of componentDirs) {
    if (dir.isDirectory()) {
      const componentPath = path.join(componentsPath, dir.name);
      const files = await fs.readdir(componentPath);
      const componentFiles = files.filter(f => f.endsWith('.tsx') && !f.includes('.stories'));
      
      components.push({
        name: dir.name,
        path: componentPath,
        files: componentFiles,
      });
    }
  }
  
  return components;
}

// Read component source
async function readComponent(componentName: string) {
  const componentPath = path.join(
    __dirname,
    `../packages/ui/src/components/${componentName}/${componentName}.tsx`
  );
  try {
    return await fs.readFile(componentPath, 'utf-8');
  } catch {
    return null;
  }
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'list_components',
        description: 'List all available components in the design system',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_component',
        description: 'Get the source code of a specific component',
        inputSchema: {
          type: 'object',
          properties: {
            componentName: {
              type: 'string',
              description: 'Name of the component (e.g., "button", "input")',
            },
          },
          required: ['componentName'],
        },
      },
      {
        name: 'get_tokens',
        description: 'Get all design tokens',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Optional token category filter (color, spacing, typography, etc.)',
            },
          },
        },
      },
      {
        name: 'search_components',
        description: 'Search for components by name or functionality',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query',
            },
          },
          required: ['query'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'list_components': {
        const components = await getComponents();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(components.map(c => ({
                name: c.name,
                files: c.files,
              })), null, 2),
            },
          ],
        };
      }

      case 'get_component': {
        const { componentName } = args as { componentName: string };
        const source = await readComponent(componentName);
        
        if (!source) {
          return {
            content: [
              {
                type: 'text',
                text: `Component "${componentName}" not found`,
              },
            ],
            isError: true,
          };
        }
        
        return {
          content: [
            {
              type: 'text',
              text: source,
            },
          ],
        };
      }

      case 'get_tokens': {
        const { category } = args as { category?: string };
        const tokens = await loadTokens();
        
        if (category && tokens[category]) {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({ [category]: tokens[category] }, null, 2),
              },
            ],
          };
        }
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(tokens, null, 2),
            },
          ],
        };
      }

      case 'search_components': {
        const { query } = args as { query: string };
        const components = await getComponents();
        const queryLower = query.toLowerCase();
        
        const matches = components.filter(c =>
          c.name.toLowerCase().includes(queryLower) ||
          c.files.some(f => f.toLowerCase().includes(queryLower))
        );
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(matches.map(c => ({
                name: c.name,
                files: c.files,
              })), null, 2),
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
  console.error('Design System MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

