import type { Meta, StoryObj } from "@storybook/react";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@acme/ui";

const meta: Meta = {
  title: "Components/Card"
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Plant A — Net Output</CardTitle>
        <CardDescription>Last 15 minutes (rolling)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="text-sm text-fg-muted">Current</div>
          <div className="text-2xl font-semibold">41.8 MW</div>
          <div className="text-sm text-fg-muted">Target: 45.0 MW</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" variant="outline">
          View details
        </Button>
      </CardFooter>
    </Card>
  )
};


