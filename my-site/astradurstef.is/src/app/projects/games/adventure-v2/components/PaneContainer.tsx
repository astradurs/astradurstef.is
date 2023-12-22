export default function PaneContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col rounded-md border-2 items-center w-full">
      {children}
    </div>
  )
}
