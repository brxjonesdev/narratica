"use client"

import React from "react"

import { useState } from "react"
import { Sword, Shield, Wand, Scroll, Brain, Leaf, Heart, Zap, Info, ChevronRight } from "lucide-react"

import { Button } from "@/presentation/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/presentation/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select"


type NotableCharacter ={
    name: string
    fromWhere: string
    link: string
}

// Define the archetype data structure
type Archetype = {
  id: string
  name: string
  icon: React.ElementType
  shortDescription: string
  description: string
  strengths: string[]
  weaknesses: string[]
  notableCharacters?: NotableCharacter[]
}

// Sample archetype data
const archetypes: Archetype[] = [
    {
        name: "Accountant",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Achiever",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Addict",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Addicted Lover",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Adonis",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Adventurer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Advocate",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Alchemist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Amateur",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Ambassador",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Analyst",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Anarchist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Anchorite",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Angel",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Anima",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Animus",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Apprentice",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Arbitrator",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Architect",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Artisan",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Artist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Athlete",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Attila",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Attorney",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Author",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Avenger",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Beggar",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Black Widow",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Bon Vivant",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Boss",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Builder",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Bully",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Burglar",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Caregiver",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Casanova",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Celibate",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Challenger",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Champion",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Chef",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Chief",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Child",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Clown",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Communicator",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Companion",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Con Artist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Consort",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Consumer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Copyist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Counselor",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Courier",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Court Jester",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Coward",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Craftsperson",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Creator",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Crime Fighter",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Critic",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Crone",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Damsel",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Dark Lord",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Defender",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Derelict",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Destroyer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Detached Manipulator",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Detective",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Devotee",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Devouring Mother",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Dilettante",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Diplomat",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Disciple",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Divine Child",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Don Juan",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Double Agent",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Dreamer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Drunk",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Dummy",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Earth Mother",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Emperor",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Empress",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Enchantress",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Engineer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Enthusiast",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Entertainer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Environmentalist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Epicure",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Escort",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Eternal Child",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Evangelist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Everyman",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Examiner",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Exorcist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Explorer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Fairy Godmother",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Father",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Femme Fatale",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Flirt",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Follower",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Fool",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Friend",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Gambler",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Gigolo",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Giver",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Glutton",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Go-Between",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "God",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Goddess",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Godfather",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Gourmand",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Gourmet",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Grandstander Bully",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Guide",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Gunslinger",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Guru",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Healer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Hedonist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Helper",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Herald",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Hermit",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Hero",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Heroine",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "High Chair Tyrant",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Ice Queen",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Idiot",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Impotent Lover",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Indentured Servant",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Indigent",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Individualist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Innocent Child",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Innocent One",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Innovator",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Instructor",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Intellectual",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Intuitive Healer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Inventor",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Jester",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Journalist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Judge",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Killer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "King",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Knight",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Leader",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Legislator",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Liberator",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Lobbyist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Loner",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Loser",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Lover",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Loyalist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Mad Scientist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Magical Child",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Magician",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Maiden",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Martyr",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Masochist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Master",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Matriarch",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Mediator",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Mentor",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Mercenary",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Messenger",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Messiah",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Midas",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Minister",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Miser",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Monk",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Monster",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Mother",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Mother Nature",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Muse",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Mystic",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Narrator",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Nerd",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Networker",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Nomad",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Nonconformist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Novice",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Nun",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Observer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Olympian",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Orphan",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Orphan Child",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Outcast",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Outlaw",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Oedipal Child",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Patriarch",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Peacemaker",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Perfect Mother",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Perfectionist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Performer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Persona",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Philosopher",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Pilgrim",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Pickpocket",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Pirate",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Pioneer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Poet",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Precocious Child",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Preacher",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Prince",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Princess",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Private Investigator",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Progenitor",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Prophet",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Prostitute",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Protector",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Protester",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Provocateur",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Psychopath",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Queen",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Rabbi",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Rebel",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Redeemer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Reformer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Renunciate",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Rescuer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Revolutionary",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Right Arm",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },

    {
        name: "Robin Hood",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Romantic",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Ruler",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Saboteur",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Sacred Prostitute",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Sadist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Sage",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Samaritan",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Samurai",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Savior",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Scapegoat",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Scavenger",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Schemer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Scientist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Scribe",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Sculptor",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Secretary",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Seducer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Seductress",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Seeker",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Seer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Serial Killer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Serpent",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Servant",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Settler",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Sex Addict",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Shadow",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Shaman",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Shape-shifter",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Sherlock Holmes",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Sidekick",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Siren",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Skeptic",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Slave",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Sleuth",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Snoop",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Sociopath",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Soldier",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Soldier of Fortune",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Spell-caster",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Spiritual Master",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Spoiler",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Spy",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Stepmother",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Storyteller",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Student",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Succubus",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Swindler",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Sybarite",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Teacher",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Temptress",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "The Self",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Therapist",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Thief",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Tomboy",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Trickster",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Tyrant",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Tutor",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Vagabond",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Vampire",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Victim",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Villain",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Virgin",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Visionary",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Wanderer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Warrior",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Weakling",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Weakling Prince",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Weaver",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Werewolf",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Wise Old Man",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Wise Woman",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Witch",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Wizard",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Workaholic",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Working Mother",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Wounded Child",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Wounded Healer",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    },
    {
        name: "Zombie",
        id: "",
        icon: "symbol",
        shortDescription: "",
        description: "",
        strengths: [],
        weaknesses: []
    }
]

export default function ArchetypeSelector() {
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<string>("")
  const [openDialog, setOpenDialog] = useState(false)

  const selectedArchetype = archetypes.find((a) => a.id === selectedArchetypeId)

  return (<>

      <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" disabled={!selectedArchetypeId} onClick={() => setOpenDialog(true)}>
          <Info className="h-4 w-4" />
          <span className="sr-only">View details</span>
        </Button>
        <Select value={selectedArchetypeId} onValueChange={setSelectedArchetypeId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an archetype" />
          </SelectTrigger>
          <SelectContent>
            {archetypes.map((archetype) => (
              <SelectItem key={archetype.id} value={archetype.id} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  {React.createElement(archetype.icon, { className: "h-4 w-4" })}
                  <span>{archetype.name}</span>
                  <span className="text-muted-foreground text-xs ml-2">- {archetype.shortDescription}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {selectedArchetype && (
          <DialogContent className="sm:max-w-[500px] font-figtree">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {React.createElement(selectedArchetype.icon, { className: "h-5 w-5" })}
                {selectedArchetype.name}
              </DialogTitle>
              <DialogDescription>{selectedArchetype.shortDescription}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <p>{selectedArchetype.description}</p>

              <div>
                <h4 className="font-medium mb-1">Strengths</h4>
                <ul className="space-y-1">
                  {selectedArchetype.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-1 mt-1 text-green-600" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-1">Weaknesses</h4>
                <ul className="space-y-1">
                  {selectedArchetype.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-1 mt-1 text-red-600" />
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
  </>)
}

