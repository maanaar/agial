
export default function Buttons({ text, bg,tx,hoverbg, no}) {
  return (
    <button
      className={`flex items-center gap-2 ${bg} ${hoverbg} ${tx} text-sm  font-medium px-4 py-2 rounded-md transition shadow-sm`}
    >
      {text} {no && `: ${no}`}
    </button>
  );
}