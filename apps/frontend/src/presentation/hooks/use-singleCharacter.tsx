import { Character } from "@/entities/Character";
import { useState } from "react";

export default function useSingleCharacter(initialCharacter: Character) {
    const [character, setCharacter] = useState<Character>(initialCharacter);

    const handleChange = (field: string, value: string | boolean | string[]) => {
        console.log(field, value)
        setCharacter({
            ...character,
            [field]: value
        })
      }


    return {
        handleChange,
        character 
    }
}