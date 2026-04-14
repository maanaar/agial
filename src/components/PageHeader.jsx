import Buttons from "./Buttons";

export default function PageHeader({ title, tx, no, tx2,no2 }) {
  return (
    <div className="m-4 mb-0 flex items-end gap-2  justify-between">
        <div>
            <span className="text-sm text-gray-400 block">Internal Medicine {'>'} Medical Desktop</span>
      <span className="text-2xl font-bold text-gray-900 block mt-2">{title}</span>
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
        {tx && <div className="inline-block mr-2"> <Buttons text={tx} no={no} bg="bg-white"/></div>}
        {tx2 && <div className="inline-block "> <Buttons text={tx2} no={no2} bg="bg-white"/>  </div>
}
    </div>
</div>
    </div>
  );
}