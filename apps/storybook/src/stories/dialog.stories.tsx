import type { Meta, StoryObj } from "@storybook/react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input
} from "@acme/ui";

const meta: Meta = {
  title: "Components/Dialog"
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect data source</DialogTitle>
          <DialogDescription>
            Example dialog built on Radix primitives.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 grid gap-3">
          <label className="grid gap-1 text-sm">
            <span className="text-fg-muted">Facility ID</span>
            <Input placeholder="e.g. PLANT-001" />
          </label>
          <div className="flex gap-2">
            <Button className="ml-auto">Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
};


