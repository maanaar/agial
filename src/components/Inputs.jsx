
// import "./PercentageInput.css";
import { ChevronDown, Search } from "lucide-react";


export  function SelectInput({ value, onChange}) {
  return (
    <div className="w-full inline-flex items-center border border-gray-300 rounded-md bg-white overflow-hidden focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-200">
    <select value={value}  onChange={(e) => onChange?.(e.target.value)} className="w-full px-2.5 py-1.5 text-sm text-gray-900 bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none">
  <option value="">Select...</option>
  <option value="oral">Oral</option>
  <option value="iv">Intravenous</option>
      {/* {options.map(opt => (
          <option value={opt.value}>
            {opt.label}
          </option>
        ))} */}
</select>
    </div>
  );
}

export function SearchInput({placeholder}) {
  return (
      <div className="w-full inline-flex items-center border border-gray-300 rounded-md bg-white overflow-hidden focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-200">
         <Search className="text-gray-400 w-4 h-4 shrink-0 ms-2" />
      <input
        type="text"
        className="w-full px-2.5 py-1.5 text-sm text-gray-900 bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        placeholder={placeholder}
      />
  
      
    </div>
  )
}

export function Label({text}) {
  return(
    <div>
      <label>{text}</label>
    </div>
  )
}

export default function Inputs({
  placeholder,
  unit,
  type
}) {

  return (
    <div className="w-full inline-flex items-center border border-gray-300 rounded-md bg-white overflow-hidden focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-200">
      <input
        type={type}
        className="w-full px-2.5 py-1.5 text-sm text-gray-900 bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        placeholder={placeholder}
      />
      {
        unit && <span className="px-2.5 py-1.5 text-sm text-gray-500 border-l border-gray-200 bg-gray-50 select-none">{unit}</span>
      }
      
    </div>
  );
}
export function Textarea({placeholder}) {
  return (
     <div className="w-full inline-flex items-center border border-gray-300 rounded-md bg-white overflow-hidden focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-200">
      <textarea
        className="w-full px-2.5 py-1.5 text-sm text-gray-900 bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        placeholder={placeholder}
        rows={5}
          onChange={(e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  }}
      />
      
      
    </div>
  )
}