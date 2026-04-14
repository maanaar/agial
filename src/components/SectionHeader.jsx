import { PlusCircle } from "lucide-react";
import Buttons from "./Buttons";

export default function SectionHeader({ header, tx , border, text}) {
  return (
    <div className="m-4 mb-0 flex justify-between items-center gap-2 border border-b-0 border-gray-200 rounded-md rounded-b-none px-4 py-3 bg-gray-50  transition">
     <div className="flex items-center gap-2">
      <PlusCircle className="w-4 h-4 text-gray-500" />
      <span className="text-base font-semibold text-gray-700">{header}</span>
      </div>
      <div>
        <Buttons text={text} border={border} tx={tx}/>
      </div>
    </div>
  );
}
export function SectionFooter({text,bg,hoverbg,tx,text2,bg2,hoverbg2,tx2}) {
      return (
    <div className="m-4 mt-0 flex items-center justify-end gap-2 border border-t-0 border-gray-200 rounded-md rounded-t-none px-4 py-3 bg-gray-50 cursor-pointer  transition">
   <Buttons text={text} bg={bg} hoverbg={hoverbg} tx={tx}/>
   <Buttons text={text2} bg={bg2} hoverbg={hoverbg2} tx={tx2}/>
    </div>
  );
} 