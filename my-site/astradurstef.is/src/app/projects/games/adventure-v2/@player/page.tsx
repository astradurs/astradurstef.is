import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function PlayerPane() {
  return (
    <Tabs aria-label="Options" defaultValue="player" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="player">Player</TabsTrigger>
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
        <TabsTrigger value="equipment">Equipment</TabsTrigger>
      </TabsList>
      <TabsContent value="player">
        <div className="w-full">PLAYER</div>
      </TabsContent>
      <TabsContent value="inventory"></TabsContent>
      <TabsContent value="equipment"></TabsContent>
    </Tabs>
  )
}
