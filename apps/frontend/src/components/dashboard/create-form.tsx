"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter,} from "@/components/ui/card"

export default function NarrativeForm() {
  const [formData, setFormData] = useState({
    title: "crownsfall",
    subtitle: "witches and the like",
    penName: "yo daddy",
    blurb: "oooohhh, spooky",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleNarrativeCreation = async ({
    title,
    subtitle,
    penName,
    blurb,
  }: {
    title: string
    subtitle: string
    penName: string
    blurb: string
  }) => {
    console.log("Creating narrative with data:", {
      title,
      subtitle,
      penName,
      blurb,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    handleNarrativeCreation(formData)
    // Here you would typically send the data to an API or perform other actions
  }

  return (
    <Card className="w-full max-w-2xl mx-auto pt-4">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter the title of your story"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              name="subtitle"
              placeholder="Enter a subtitle (if applicable)"
              value={formData.subtitle}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="penName">Pen Name</Label>
            <Input
              id="penName"
              name="penName"
              placeholder="Enter your pen name"
              value={formData.penName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="blurb">Blurb (Optional)</Label>
            <Textarea
              id="blurb"
              name="blurb"
              placeholder="Enter a brief description or teaser for your narrative"
              className="resize-none"
              value={formData.blurb}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

