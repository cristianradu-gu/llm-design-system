import type { Decorator, Preview } from "@storybook/react";

import "@acme/tokens/css";
import "../src/tailwind.css";

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as "light" | "dark") ?? "light";
  document.documentElement.dataset.theme = theme;

  return (
    <div className="min-h-screen bg-bg-canvas text-fg font-sans p-6">
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" }
        ],
        dynamicTitle: true
      }
    }
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } }
  }
};

export default preview;


