export function getRandomDiceRoll(sides: number) {
  let array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return (array[0] % sides) + 1
}

export function rolld6() {
  return getRandomDiceRoll(6) as 1 | 2 | 3 | 4 | 5 | 6
}

export function rolld8() {
  return getRandomDiceRoll(8) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}

export function roll3d6() {
  return rolld6() + rolld6() + rolld6()
}
