/** @type {import("tailwindcss").Config} */
const preset = {
  darkMode: ["class", "[data-theme='dark']"],
  theme: {
    extend: {
      colors: {
        bg: {
          canvas: "var(--color-bg-canvas)",
          surface: "var(--color-bg-surface)",
          card: "var(--color-bg-card)"
        },
        fg: {
          DEFAULT: "var(--color-fg-default)",
          muted: "var(--color-fg-muted)"
        },
        border: {
          DEFAULT: "var(--color-border-default)"
        },
        primary: {
          DEFAULT: "var(--color-primary-default)",
          hover: "var(--color-primary-hover)",
          fg: "var(--color-primary-fg)"
        },
        success: {
          DEFAULT: "var(--color-success-default)",
          fg: "var(--color-success-fg)"
        },
        danger: {
          DEFAULT: "var(--color-danger-default)",
          fg: "var(--color-danger-fg)"
        }
      },
      borderRadius: {
        control: "var(--radius-control)",
        card: "var(--radius-card)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)"
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        card: "var(--shadow-card)"
      },
      fontFamily: {
        sans: ["var(--font-family-sans)"]
      }
    }
  }
};

export default preset;
export { preset };


