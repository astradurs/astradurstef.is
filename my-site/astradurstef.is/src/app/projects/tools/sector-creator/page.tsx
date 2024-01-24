export default function SectorCreator() {
  const columns = 8
  const rows = 10

  return (
    <div>
      <h1>Sector Creator</h1>
      <div className={`grid grid-cols-${columns % 12} grid-rows-${rows % 12}`}>
        {Array.from({ length: columns * rows }).map((_, i) => {
          const row = Math.floor(i / columns)
          const column = i % columns
          // create a string of four characters where the first two are the row and the last two are the column (e.g. 0101)
          const cell = `${row < 10 ? "0" + row : row}${
            column < 10 ? "0" + column : column
          }`

          return (
            <div
              key={i}
              className="flex items-end justify-center aspect-square border border-gray-400"
            >
              {cell}
            </div>
          )
        })}
      </div>
    </div>
  )
}
