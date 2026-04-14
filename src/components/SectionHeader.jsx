import { PlusCircle } from "lucide-react";
import Buttons from "./Buttons";

export default function SectionHeader({ header }) {
  return (
    <div className="m-4 mb-0 flex items-center gap-2 border border-b-0 border-gray-200 rounded-md rounded-b-none px-4 py-3 bg-gray-50 cursor-pointer transition">
      <PlusCircle className="w-4 h-4 text-gray-500" />
      <span className="text-sm font-semibold text-gray-700">{header}</span>
    </div>
  );
}
export function SectionFooter() {
      return (
    <div className="m-4 mt-0 flex items-center justify-end gap-2 border border-t-0 border-gray-200 rounded-md rounded-t-none px-4 py-3 bg-gray-50 cursor-pointer  transition">
   <Buttons text="Close" bg="bg-white" hoverbg="hover:bg-gray-200"/>
   <Buttons text="Add to Prescription" bg="bg-teal-600" hoverbg="hover:bg-teal-700" tx="text-white"/>
    </div>
  );
}