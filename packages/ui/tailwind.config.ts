import type { Config } from 'tailwindcss';
// Note: After building tokens with `pnpm --filter tokens build`,
// Style Dictionary will generate a Tailwind config at '@design-system/tokens/tailwind'
// For now, we import tokens directly from JSON
import tokensData from '@design-system/tokens/tokens.json';

// Transform W3C tokens to Tailwind format
const transformTokens = (tokens: any) => {
  const transformColor = (colorObj: any): Record<string, string> => {
    const result: Record<string, string> = {};
    Object.keys(colorObj).forEach((key) => {
      if (colorObj[key].$value) {
        result[key] = colorObj[key].$value;
      } else {
        result[key] = transformColor(colorObj[key]);
      }
    });
    return result;
  };

  return {
    color: {
      primary: transformColor(tokens.color.primary),
      secondary: transformColor(tokens.color.secondary),
      neutral: transformColor(tokens.color.neutral),
      success: transformColor(tokens.color.success),
      warning: transformColor(tokens.color.warning),
      error: transformColor(tokens.color.error),
      info: transformColor(tokens.color.info),
      background: transformColor(tokens.color.background),
      foreground: transformColor(tokens.color.foreground),
      border: transformColor(tokens.color.border),
    },
    spacing: Object.fromEntries(
      Object.entries(tokens.spacing).map(([k, v]: [string, any]) => [k, v.$value])
    ),
    radius: Object.fromEntries(
      Object.entries(tokens.radius).map(([k, v]: [string, any]) => [k, v.$value])
    ),
    typography: {
      fontFamily: {
        sans: tokens.typography.fontFamily.sans.$value,
        mono: tokens.typography.fontFamily.mono.$value,
      },
      fontSize: Object.fromEntries(
        Object.entries(tokens.typography.fontSize).map(([k, v]: [string, any]) => [k, v.$value])
      ),
      fontWeight: Object.fromEntries(
        Object.entries(tokens.typography.fontWeight).map(([k, v]: [string, any]) => [k, v.$value])
      ),
      lineHeight: Object.fromEntries(
        Object.entries(tokens.typography.lineHeight).map(([k, v]: [string, any]) => [k, v.$value])
      ),
      letterSpacing: Object.fromEntries(
        Object.entries(tokens.typography.letterSpacing).map(([k, v]: [string, any]) => [k, v.$value])
      ),
    },
    shadow: Object.fromEntries(
      Object.entries(tokens.shadow).map(([k, v]: [string, any]) => [k, v.$value])
    ),
    opacity: Object.fromEntries(
      Object.entries(tokens.opacity).map(([k, v]: [string, any]) => [k, v.$value])
    ),
    zIndex: Object.fromEntries(
      Object.entries(tokens.zIndex).map(([k, v]: [string, any]) => [k, v.$value])
    ),
    breakpoint: Object.fromEntries(
      Object.entries(tokens.breakpoint).map(([k, v]: [string, any]) => [k, v.$value])
    ),
  };
};

const tokens = transformTokens(tokensData);

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: tokens.color,
      spacing: tokens.spacing,
      borderRadius: tokens.radius,
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.fontSize,
      fontWeight: tokens.typography.fontWeight,
      lineHeight: tokens.typography.lineHeight,
      letterSpacing: tokens.typography.letterSpacing,
      boxShadow: tokens.shadow,
      opacity: tokens.opacity,
      zIndex: tokens.zIndex,
      screens: tokens.breakpoint,
    },
  },
  plugins: [],
};

export default config;
