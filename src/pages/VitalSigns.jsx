import { DataTable } from "../components/DataTable";
import Inputs, {
  Label,
  SearchInput,
  SelectInput,
  Textarea,
} from "../components/Inputs";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import SectionHeader, { SectionFooter } from "../components/SectionHeader";
import StickyNote from "../components/StickyNote";

export default function VitalSigns() {
  // const route = ["oral", "IV", "IM"]

  const vitalsColumns = [
    { key: "datetime", label: "Date / Time" },
    { key: "bp", label: "BP (mmHg)" },
    { key: "hr", label: "HR (bpm)" },
    { key: "temp", label: "Temp (°C)" },
    { key: "rr", label: "RR / SpO2" },
    { key: "wt", label: "Wt / Ht" },
    { key: "recorded", label: "Recorded By" },
  ];

  const vitalsRows = [
    {
      datetime: "10 Apr 2026\n07:15 AM",
      bp: "—",
      hr: 74,
      temp: 36.8,
      rr: "18 / 98%",
      wt: "65kg / 165cm",
      recorded: { type: "avatar", initials: "NA", value: "Nurse A." },
    },
    {
      datetime: "09 Apr 2026\n08:00 AM",
      bp: "122 / 78",
      hr: 70,
      temp: 37.0,
      rr: "16 / 99%",
      wt: "65kg / 165cm",
      recorded: { type: "avatar", initials: "SM", value: "Sarah M." },
    },
    {
      datetime: "08 Apr 2026\n09:30 AM",
      bp: "120 / 80",
      hr: 72,
      temp: 36.9,
      rr: "16 / 98%",
      wt: "65.5kg / 165cm",
      recorded: { type: "avatar", initials: "SM", value: "Sarah M." },
    },
  ];

  return (
    <div className="relative z-10 flex  w-full flex-1 flex-col lg:flex-row min-h-screen">
      <div className="w-full">
        <div>
          <PageHeader title="Vitals Signs" tx="Last Visit" no="2 hrs ago" />
        </div>
        <div>
          <StickyNote note="Patient is allergic to Penicillin. Ensure to check latest vitals before prescribing new medication." />
        </div>
        <SectionHeader header="Record New Vital Signs" />
        <div className="border m-4 my-0 p-4 bg-white">
          <div className="mb-3 w-[50%]">
            <Label text="Date & Time" />
            <Inputs type="date" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
              <Label text="Blood Pressure (mmhg)" />
              <div className="flex gap-3 items-center ">
                <Inputs type="number" placeholder="120" />
                /
                <Inputs type="number" placeholder="80" />
              </div>
            </div>
            <div>
              <Label text="Heart Rate" />
              <Inputs type="number" unit="bpm" placeholder="72" />
            </div>
            <div>
              <Label text="Temperature" />
              <Inputs type="number" unit="°C" placeholder="37.1" />
            </div>
            <div>
              <Label text="Respiratory Rate" />
              <Inputs type="number" unit="/min" placeholder="16" />
            </div>
            <div>
              <Label text="Spo2" />
              <Inputs type="number" unit="%" placeholder="98" />
            </div>
            <div>
              <Label text="Weight" />
              <Inputs type="number" unit="kg" placeholder="65" />
            </div>
            <div>
              <Label text="Height" />
              <Inputs type="number" unit="cm" placeholder="165" />
            </div>
            <div>
              <Label text="BMI" />
              <Inputs
                type="number"
                placeholder="23.8(Normal)"
                disabled="disabled"
              />
            </div>
          </div>
          <div className="mt-3">
            <Label text="Remarks / Notes" />
            <Textarea placeholder="Add any observations regarding patient vitals..." />
          </div>
        </div>
        <SectionFooter
          text="Clear"
          bg="bg-white"
          hoverbg="hover:bg-gray-200"
          text2="Save Vitals"
          bg2="bg-teal-600"
          hoverbg2="hover:bg-teal-700"
          tx2="text-white"
        />
        <div>
          <SectionHeader header="Vitals History" />
          <div className="border mx-4 mb-4 bg-white">
            <DataTable columns={vitalsColumns} rows={vitalsRows} />
          </div>
        </div>
      </div>
    </div>
  );
}
