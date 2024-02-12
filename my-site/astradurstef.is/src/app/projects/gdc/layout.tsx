export default async function GDCLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid">
      <div className="h-4" />
      {children}
    </div>
  )
}
