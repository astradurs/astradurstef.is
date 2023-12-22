import PaneContainer from "./components/PaneContainer"
export default async function AdventureV2Layout(props: {
  children: React.ReactNode
  player: React.ReactNode
  controls: React.ReactNode
  content: React.ReactNode
}) {
  return (
    <div className="w-full">
      <div>{props.children}</div>
      <div className="sm:grid grid-cols-6">
        <div className="col-span-2">
          <PaneContainer>
            <div>{props.player}</div>
          </PaneContainer>
        </div>
        <div className="col-span-3">
          <PaneContainer>
            <div>{props.content}</div>
          </PaneContainer>
        </div>
        <div className="col-span-1">
          <PaneContainer>
            <div>{props.controls}</div>
          </PaneContainer>
        </div>
      </div>
    </div>
  )
}
