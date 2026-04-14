// StickyNote.jsx
import { FileText } from "lucide-react";

export default function StickyNote({ title = "Sticky Notes", note }) {


  return (
    <div className="flex items-start gap-3 bg-yellow-100 border border-yellow-300 rounded-md px-3.5 py-2.5 m-4">
      <FileText className="mt-0.5 shrink-0 text-yellow-700" size={16} />
      <div>
        <p className="text-sm font-semibold text-yellow-900 mb-0.5">
          {title}
        </p>
        <p className="text-sm text-yellow-800 leading-relaxed">
          {note}
        </p>
      </div>
    </div>
  );
}