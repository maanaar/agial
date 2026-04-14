import Buttons from "./Buttons";

export default function PageHeader({ title, tx, no }) {
  return (
    <div className="m-4 mb-0 flex items-end gap-2  justify-between">
        <div>
            <span className="text-sm text-gray-400 block">Internal Medicine {'>'} Medical Desktop</span>
      <span className="text-xl font-bold text-gray-900 block">{title}</span>
      </div>
<div>
    <div className="text-gray-400 border rounded-xl p-2 bg-white mb-2 text-sm">
<span>Waiting</span>
<span className="inline-block mx-3">{'>'}</span>
<span className="inline-block py-1 px-3 bg-teal-600 text-white rounded-2xl">Examination</span>
<span className="inline-block mx-3">{'>'}</span>
<span>Done</span>
    </div >
    <div className="flex justify-end">
    <Buttons text={tx} no={no} bg="bg-white"/>
    </div>
</div>
    </div>
  );
}