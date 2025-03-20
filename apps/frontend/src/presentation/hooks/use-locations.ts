
import { useEffect, useState } from "react";
import { Location } from "@/entities/Location";
import  modifyLocationByID from "@/usecases/modifyLocationByID";
import { useNarrativeStore } from "../stores/narrative-store-provider";

const sampleLocation: Location = {
  id: "loc-001",
  name: "Vaelith",
  subname: "The Shimmering City",
  narrative: "A once-thriving capital now veiled in mystery, its mirrored towers reflecting both past glories and hidden dangers.",
  description: "Vaelith, the City of Mirrors, is known for its intricate glass architecture and an enigmatic past filled with betrayals and lost knowledge.",

  coreIdentity: {
      type: "City",
      geography: "Nestled between crystalline mountains and a vast, mist-covered lake.",
      climate: "Temperate with cool, misty mornings and golden-hued sunsets.",
      technologyLevel: "Advanced magical engineering intertwined with traditional craftsmanship."
  },

  societyCulture: {
      inhabitants: "Elves, scholars, and craftsmen; a mix of native-born and wandering traders.",
      languages: "Vaelthi (ancient dialect), Common Tongue.",
      traditions: "Annual Festival of Reflections, where inhabitants honor their ancestors by lighting mirrored lanterns.",
      beliefs: "The Order of the Looking Glass believes mirrors hold fragments of lost souls.",
      arts: "Renowned for illusionary glasswork and storytelling through refracted light.",
      dailyLife: "Citizens craft delicate artifacts, trade in enchanted mirrors, and study arcane texts."
  },

  governmentPower: {
      politicalSystem: "Ruled by the Council of Echoes, a mysterious group rumored to be influenced by reflections of the past.",
      laws: "Strict regulations on mirror magic; unauthorized usage can lead to exile.",
      majorFactions: "The Glassborn (elite artisans), The Hollow Watchers (a secretive law enforcement guild).",
      conflictsAlliances: "Tensions with the Sunken Guild, a rebel faction seeking to shatter the city’s illusions."
  },

  economyInfrastructure: {
      industries: "Glasscrafting, magical enchantments, rare mineral trade.",
      trade: "Exports enchanted glass, imports exotic dyes and enchanted inks.",
      currency: "Shimmerstones, rare gems infused with magical properties.",
      technology: "Magical constructs assist in daily life, including floating lanterns and self-repairing structures.",
      transportation: "Crystal trams glide through the air, powered by ley-line energy."
  },

  historyLore: {
      founding: "Established by an exiled elven prince who sought to create a sanctuary of knowledge and artistry.",
      majorEvents: "The Great Fracture – an event where half the city disappeared into another realm.",
      mythsLegends: "It is said that the city’s largest mirror, the Eternal Veil, reflects not just the present but glimpses of possible futures."
  },

  magicSupernatural: {
      influence: "Highly magical, infused with mirror-based sorcery.",
      beings: "The Veilborn – ghostly figures trapped in the reflections.",
      sacredLocations: "The Hall of Echoes, a chamber where past rulers' voices still whisper their wisdom."
  },

  narrativeSignificance: {
      keyEvents: "A secret prophecy hidden within the Eternal Veil holds the key to the protagonist’s journey.",
      importantCharacters: "A rogue historian seeking forbidden truths, an exiled glasscrafter, and a masked oracle who speaks in riddles.",
      secretsMysteries: "What truly happened during The Great Fracture? And why do some reflections move… when no one else does?"
  }
};


export const useLocations = () => {
  const {setLocationsGlobal} = useNarrativeStore((store) => store);
  const [locations, setLocations] = useState<Location[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeID, setActiveID] = useState<string | null>(null);

 

  useEffect(() => {
    setLoading(false);
    setLocations([sampleLocation]);
    setLocationsGlobal([sampleLocation]);
  }, [setLocationsGlobal]);

 





  const handleLocationSelect = (id: string | null) => {
    setActiveID(id);
  }

  const handleLocationChange = async (locationID: string, updatedLocation: Location) => {
    if (!locations) {
      setError("Locations not found");
      return;
    }

    const newLocation = await modifyLocationByID({ locationID, updatedLocation });
    if (!newLocation) {
      setError("Failed to update location. Please try again later.");
      return;
    }
 
    const locationIndex = locations.findIndex((location) => location.id === locationID);
    if (locationIndex === -1) {
      setError("Location not found");
      return;
    }

    console.log(`Updating location with ID: ${locationID}`);
    locations[locationIndex] = updatedLocation;
    setLocations([...locations]);
  }

  return { locations, loading, error, activeID, handleLocationSelect, handleLocationChange };
};