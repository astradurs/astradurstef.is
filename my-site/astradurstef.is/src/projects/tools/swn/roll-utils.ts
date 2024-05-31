export function getRandomDiceRoll(sides: number): number {
  let array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return (array[0] % sides) + 1
}

export function rolld6(): number {
  return getRandomDiceRoll(6)
}

export function rolld8(): number {
  return getRandomDiceRoll(8)
}

export function roll3d6(): number {
  return rolld6() + rolld6() + rolld6()
}
