"use client"
import { cn } from "@/lib/utils";
import OutlineDirectory from "@/presentation/components/outline/outline-directory";
import { OutlineDropdownMenu} from "@/presentation/components/outline/outline-menu";
import { Separator } from "@/presentation/components/ui/separator";
import { OutlineContextProvider } from "@/presentation/context/OutlineContext";
import { useNarrativeStore } from '@/presentation/stores/narrative-store-provider';



export default function NarrativeOutline() {
  // const { story, characters, locations } = useNarrativeStore((store) => store);
  return (
      <section className="flex flex-1 flex-col gap-4 p-4 bg-white/5 m-2 rounded-xl font-figtree">
        <OutlineContextProvider>
          <section className="flex items-end justify-between w-full">
            <div>
              <p
              className={cn(
                      'flex h-6 shrink-0 w-full items-center rounded-md text-sm font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
                      'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 text-base font-semibold'
                    )}
              >Plot Outline</p>
            </div>
            <div>
              <pre>
              </pre>
            </div>
          <OutlineDropdownMenu/>
          </section>
          <Separator/>
          <OutlineDirectory/>
        </OutlineContextProvider>    
      </section>
  );
}
