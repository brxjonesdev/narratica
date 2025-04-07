import { PlusCircle } from "lucide-react";
import { Button } from "@/shared/ui/button";

export default function EmptyState() {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2">
        <h2 className="text-lg font-semibold">No Outline Available</h2>
        <p className="text-gray-400">Start by adding an act to your outline.</p>
        <div>
          <Button
            size={'sm'}
            className=" w-fit bg-black/30 text-white/80 hover:bg-black/40 "
            variant={'ghost'}
          >
            <PlusCircle size={24} />
            Create Outline
          </Button>
        </div>
      </div>
    );
  }