import { JSX } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

function ImageUploadTooltip(): JSX.Element {
  return (
    <TooltipProvider >
      <Tooltip>
        <TooltipTrigger asChild className='mb-2'>
          <Info className="w-5 h-5 text-[#C05C41] cursor-pointer hover:text-[#E5C6AC]" />
        </TooltipTrigger>
        <TooltipContent side="right" className="text-white bg-black text-sm px-3 py-1 rounded-md">
          Max image size 10MB
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ImageUploadTooltip