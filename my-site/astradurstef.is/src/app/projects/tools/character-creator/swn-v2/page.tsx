import {
  type CharacterInformation,
  initialCharacterInformation,
} from "@/projects/tools/swn-v2/character"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import SWNCharacterPage from "./components/swn-character-page"

export default async function SWNV2Page() {
  const character = initialCharacterInformation

  return <SWNCharacterPage initialCharacter={character} />
}
