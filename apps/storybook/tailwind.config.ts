import type { Config } from "tailwindcss";
import preset from "@acme/tailwind-preset";

const config: Config = {
  presets: [preset],
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./.storybook/**/*.{ts,tsx,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ]
};

export default config;


