"use client"
import OutlineDirectory from "@/presentation/components/narrative/main/outline-directory";
import { Button } from "@/presentation/components/ui/button";
import { Separator } from "@/presentation/components/ui/separator";
import { SidebarTrigger } from "@/presentation/components/ui/sidebar";
import { Home } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/presentation/components/ui/tabs"
import Draft from "@/presentation/components/narrative/main/draft";
import { useManuscript } from "@/presentation/hooks/use-manuscript";
import { useNarrativeStore } from "@/presentation/stores/narrative-store-provider";




export default function NarrativeOutline() {
  const {locations, characters} = useNarrativeStore((store) => store);
  const {story} = useManuscript();
  return (
    <Tabs defaultValue="outline" className="w-full h-full flex flex-col">
     <header className="flex h-16 shrink-0 items-center gap-2 border-b justify-between pr-4 sticky top-0 bg-background z-10">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-4" />
              <Link href="/">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Home />
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-4" />
              <TabsList className="font-figtree w-[400px]">
    <TabsTrigger value="outline" className="w-full tracking-wider">Outline</TabsTrigger>
    <TabsTrigger value="draft" className="w-full tracking-wider">Draft</TabsTrigger>
  </TabsList>
            </div>
     </header>
     <section className="flex flex-1 flex-col gap-4 px-6 py-4 rounded-xl font-figtree">
        <TabsContent value="outline" asChild><OutlineDirectory story={story} locations={locations} characters={characters}/></TabsContent>
        <TabsContent value="draft" asChild><Draft/></TabsContent>  
      </section>
    </Tabs>);
}
