import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@acme/ui";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  args: {
    placeholder: "Type here..."
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "42 MW" }
};


