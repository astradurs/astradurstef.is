import { initialCharacterInformation } from "@/projects/tools/swn-v2/character"

import SWNCharacterPage from "./components/swn-character-page"

export default async function SWNV2Page() {
  const character = initialCharacterInformation

  return <SWNCharacterPage initialCharacter={character} />
}
