import type { Meta, StoryObj } from "@storybook/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@acme/ui";

const meta: Meta = {
  title: "Components/Tabs"
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-full max-w-xl">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="telemetry">Telemetry</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="text-sm text-fg-muted">
          System health: nominal. Last update 2 minutes ago.
        </div>
      </TabsContent>
      <TabsContent value="telemetry">
        <div className="text-sm text-fg-muted">
          Live feed: 41.8 MW, 15.2 kV, PF 0.97.
        </div>
      </TabsContent>
    </Tabs>
  )
};


