
export default function Buttons({ text, bg,tx,hoverbg, no, border, onClick}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 ${bg} ${hoverbg} ${tx} ${border} text-sm  font-medium px-4 py-2 rounded-md transition shadow-sm`}
    >
      {text} {no && `: ${no}`}
    </button>
  );
}