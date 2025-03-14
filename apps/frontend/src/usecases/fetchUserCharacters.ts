import { Character } from '@/entities/Character';
import { GET_USER_CHARACTERS } from '@/infrastructure/graphql/characters';
import { GraphQLFetcher } from '@/lib/fetcher';


const characters: Character[] = [
  {
    id: "1",
    narrative: "The main protagonist of SPYxFamily. A highly skilled spy known for his intelligence and stoic demeanor.",
    name: "Loid Forger",
    subname: "Twilight",
    alias: ["Twilight", "Loid Forger"],
    description: "A top-class spy tasked with maintaining world peace, Loid Forger is a man of many faces, juggling his spy life, family, and a mission.",
    backstory: "Loid was raised in an orphanage and became a top-tier spy for Westalis, under the alias 'Twilight.' He was tasked with infiltrating an elite school to get close to an important target, but had to form a fake family for the mission.",
    appearance: "A man in his early 30s with short blonde hair and blue eyes. He’s always impeccably dressed and maintains a professional, composed appearance.",
    personality: "Calm, collected, and dedicated to his mission. Despite being emotionally distant, Loid has a genuine care for his 'family' and often struggles with balancing his secret life and role as a father.",
    role: "protagonist",  // Role matching the Select values
    alignment: "lawful-good",  // Alignment matching the Select values
    age: 31,
    height: "6'0\"",
    weight: "180 lbs",
    eyeColor: "Blue",
    hairColor: "Blonde",
    skinColor: "Fair",
    bodyType: "Athletic",
    strengths: ["Combat skills", "High intelligence", "Stealth", "Strategy"],
    weaknesses: ["Overworked", "Emotional detachment", "Secretive"],
    fears: ["Failure in his mission", "Failing his family"],
    motivations: ["World peace", "To protect his 'family'"],
    goals: ["Complete the mission", "Protect his family while keeping his cover"],
    isAlive: true,
    createdAt: "2025-03-13T00:00:00Z",
    updatedAt: "2025-03-13T00:00:00Z",
    allies: [
      {
        id: "2",
        name: "Yor Forger",
        relationship: "Wife",
        description: `A skilled assassin
        who poses as his wife. Loid is unaware of her true identity.`}
    ]
   
  },
  {
    id: "2",
    narrative: "A highly skilled assassin posing as a typical housewife. She's also a master manipulator and often hides her true intentions.",
    name: "Yor Forger",
    subname: "The Thorn Princess",
    alias: ["Thorn Princess", "Yor Forger"],
    description: "Yor is a professional assassin who has taken on the role of a wife to Loid in a fake marriage, with her true goal being to hide her secret from the world.",
    backstory: "Yor grew up in a poor family and turned to assassination to provide for herself and her brother. She joined the assassin organization, becoming known as 'The Thorn Princess.' She marries Loid to keep her true occupation secret.",
    appearance: "Yor has long, dark hair and a strikingly elegant appearance. She usually dresses in simple but fashionable outfits. Despite her beautiful demeanor, she hides a deadly assassin persona.",
    personality: "Yor is sweet, shy, and kind-hearted, but when she’s on a mission, she transforms into a ruthless assassin. She deeply cares for her family and is willing to go to any lengths to protect them.",
    role: "sidekick",  // Role matching the Select values
    alignment: "neutral-good",  // Alignment matching the Select values
    age: 27,
    height: "5'7\"",
    weight: "125 lbs",
    eyeColor: "Green",
    hairColor: "Dark brown",
    skinColor: "Fair",
    bodyType: "Slim",
    strengths: ["Combat skills", "Agility", "Stealth", "Emotionally resilient"],
    weaknesses: ["Naivety in relationships", "Overprotective of family"],
    fears: ["Her secret being discovered", "Hurting her family unintentionally"],
    motivations: ["Provide for her brother", "Protect her new family", "Keep her identity secret"],
    goals: ["Keep her family safe", "Ensure her secret doesn't get out", "Maintain her cover as a housewife"],
    isAlive: true,
    createdAt: "2025-03-13T00:00:00Z",
    updatedAt: "2025-03-13T00:00:00Z",
    
  },
  {
    id: "3",
    narrative: "The adopted daughter of Loid and Yor, who secretly possesses psychic abilities.",
    name: "Anya Forger",
    subname: "None",
    alias: ["None"],
    description: "Anya is a young girl adopted by Loid and Yor, though she possesses the ability to read minds, a secret she keeps from her new family.",
    backstory: "Anya was raised in an orphanage and was experimented on before being adopted by Loid and Yor. She has the ability to read minds, but her powers often cause her trouble as she struggles to understand others.",
    appearance: "Anya has short pink hair and bright, expressive eyes. She has a childlike innocence in her demeanor, despite the psychic powers she possesses.",
    personality: "Anya is playful, mischievous, and often behaves childishly. She enjoys her new family and is eager to keep her abilities secret. She loves animals and is very innocent about her own powers.",
    role: "sidekick",  // Role matching the Select values
    alignment: "neutral-good",  // Alignment matching the Select values
    age: 6,
    height: "3'5\"",
    weight: "40 lbs",
    eyeColor: "Green",
    hairColor: "Pink",
    skinColor: "Fair",
    bodyType: "Petite",
    strengths: ["Psychic abilities", "Curiosity", "Empathy"],
    weaknesses: ["Naivety", "Inability to control her powers", "Can be easily misled"],
    fears: ["Losing her family", "Being exposed as a psychic"],
    motivations: ["Be a good daughter", "Make her parents happy", "Hide her psychic powers"],
    goals: ["Learn more about her powers", "Make her family proud", "Keep her secret safe"],
    isAlive: true,
    createdAt: "2025-03-13T00:00:00Z",
    updatedAt: "2025-03-13T00:00:00Z",
    
  },
];





export async function fetchUserCharacters(narrativeID: string) {
  
  // try {
  //   const response: { data: { characters: Character[] } } = await GraphQLFetcher(
  //     GET_USER_CHARACTERS,
  //     {
  //       where: {
  //         narrative_EQ: narrativeID,
  //       },
  //     }
  //   );
  //   return response.data.characters;
  // } catch (error) {
  //   console.error('Error fetching user characters:', error);
  //   throw error;
  // }

  return characters
}
