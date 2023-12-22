import { Button } from "@/components/ui/button"
import { CardComponent } from "./components/CardComponent"

export default function CardGeneratorPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1>Card Generator</h1>
      <div className="grid grid-cols-4 gap-4">
        <CardComponent
          id="1"
          title="first"
          description="testing component"
          footer={"TEST"}
        >
          <p>testing</p>
        </CardComponent>
      </div>
    </div>
  )
}
