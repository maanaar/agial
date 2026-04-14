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

export default function MedicalRecord() {
  // const route = ["oral", "IV", "IM"]

  const medicationsColumns = [
    { key: "drug", label: "Drug Name" },
    { key: "dose", label: "Dose / Freq" },
    { key: "route", label: "Route" },
    { key: "duration", label: "Duration" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const medicationsRows = [
    {
      drug: {
        type: "multi",
        title: "Augmentin 1g Tablet",
        subtitle: "Amoxicillin / Clavulanate Potassium",
      },
      dose: "1 Tab, BID",
      route: "Oral",
      duration: "7 Days",
      status: { type: "badge", value: "Active" },
      actions: "✏️",
    },
    {
      drug: {
        type: "multi",
        title: "Panadol Advance 500mg",
        subtitle: "Paracetamol",
      },
      dose: "1 Tab, PRN",
      route: "Oral",
      duration: "5 Days",
      status: { type: "badge", value: "Active" },
      actions: "✏️",
    },
    {
      drug: {
        type: "multi",
        title: "Amoxicillin 500mg Capsule",
        subtitle: "Amoxicillin",
      },
      dose: "1 Cap, TID",
      route: "Oral",
      duration: "5 Days",
      status: { type: "badge", value: "Completed" },
      actions: { type: "action", label: "Renew", icon: "🔄" },
    },
  ];

  // const vitalsColumns = [
  //   { key: "datetime",  label: "Date / Time"   },
  //   { key: "bp",        label: "BP (mmHg)"     },
  //   { key: "hr",        label: "HR (bpm)"      },
  //   { key: "temp",      label: "Temp (°C)"     },
  //   { key: "rr",        label: "RR / SpO2"     },
  //   { key: "wt",        label: "Wt / Ht"       },
  //   { key: "recorded",  label: "Recorded By"   },
  // ];

  // const vitalsRows = [
  //   {
  //     datetime: "10 Apr 2026\n07:15 AM",
  //     bp: "—",
  //     hr: 74, temp: 36.8, rr: "18 / 98%", wt: "65kg / 165cm",
  //     recorded: { type: "avatar", initials: "NA", value: "Nurse A." },
  //   },
  //   {
  //     datetime: "09 Apr 2026\n08:00 AM",
  //     bp: "122 / 78", hr: 70, temp: 37.0, rr: "16 / 99%", wt: "65kg / 165cm",
  //     recorded: { type: "avatar", initials: "SM", value: "Sarah M." },
  //   },
  //   {
  //     datetime: "08 Apr 2026\n09:30 AM",
  //     bp: "120 / 80", hr: 72, temp: 36.9, rr: "16 / 98%", wt: "65.5kg / 165cm",
  //     recorded: { type: "avatar", initials: "SM", value: "Sarah M." },
  //   },
  // ];

  // const labsColumns = [
  //   { key: "datetime",  label: "Date / Time"  },
  //   { key: "category",  label: "Category"     },
  //   { key: "test",      label: "Test Name"    },
  //   { key: "priority",  label: "Priority"     },
  //   { key: "status",    label: "Status"       },
  //   { key: "requested", label: "Requested By" },
  //   { key: "actions",   label: "Actions"      },
  // ];

  // const labsRows = [
  //   {
  //     datetime:  "10 Apr 2026\n08:30 AM",
  //     category:  "Laboratory",
  //     test:      "Comprehensive Metabolic Panel (CMP)",
  //     priority:  { type: "badge", value: "Routine" },
  //     status:    { type: "dot",   color: "#e6a817", value: "Pending"   },
  //     requested: { type: "avatar", initials: "AA", value: "Dr. Ahmed" },
  //     actions:   "",
  //   },
  //   {
  //     datetime:  "05 Apr 2026\n10:15 AM",
  //     category:  "Radiology",
  //     test:      "Chest X-Ray (PA & Lateral)",
  //     priority:  { type: "badge", value: "Urgent" },
  //     status:    { type: "dot",   color: "#1a9e5c", value: "Completed" },
  //     requested: { type: "avatar", initials: "AA", value: "Dr. Ahmed" },
  //     actions:   { type: "action", label: "Results", icon: "👁" },
  //   },
  //   {
  //     datetime:  "05 Apr 2026\n10:15 AM",
  //     category:  "Laboratory",
  //     test:      "Urinalysis",
  //     priority:  { type: "badge", value: "Routine" },
  //     status:    { type: "dot",   color: "#1a9e5c", value: "Completed" },
  //     requested: { type: "avatar", initials: "AA", value: "Dr. Ahmed" },
  //     actions:   { type: "action", label: "Results", icon: "👁" },
  //   },
  // ];
  return (
    <div className="relative z-10 flex  w-full flex-1 flex-col lg:flex-row min-h-screen">
      <div className="w-full">
        <div>
          <PageHeader
            title="Medication Record"
            tx="Active Prescriptions"
            no="2"
          />
        </div>
        <div>
          <StickyNote note="Patient is allergic to Penicillin. Ensure to check latest vitals before prescribing new medication." />
        </div>
        <div>
          <SectionHeader header="Current Medications" />
          <div className="border mx-4 mb-4 bg-white">
            <DataTable columns={medicationsColumns} rows={medicationsRows} />
          </div>
        </div>
        <SectionHeader header="Prescribe New Medication" />
        <div className="border m-4 my-0 p-4 bg-white">
          <div className="mb-3 flex flex-col gap-2">
            <Label text="Medication Name" />
            <SearchInput placeholder="Search drug by name or active ingredient..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="flex flex-col gap-2">
              <Label text="Dose / Strength" />
              <Inputs type="number" unit="mg" placeholder="e.g: 500" />
            </div>
            <div className="flex flex-col gap-2">
              <Label text="Route" />
              <SelectInput />
            </div>
            <div className="flex flex-col gap-2" >
              <Label text="Frequency" />
              <SelectInput />
            </div>
            <div className="flex flex-col gap-2">
              <Label text="Duration" />
              <Inputs type="number" unit="Days" placeholder="e.g: 7" />
            </div>

            <div className="flex flex-col gap-2">
              <Label text="Start Date" />
              <Inputs type="date" />
            </div>
            <div className="flex flex-col gap-2">
              <Label text="Dispense Quantity" />
              <SelectInput />
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <Label text="Patient Instructions" />
            <Textarea placeholder="Add any specific instructions like 'Take after meals'..." />
          </div>
        </div>
        <SectionFooter
          text="Close"
          bg="bg-white"
          hoverbg="hover:bg-gray-200"
          text2="Add to Prescription"
          bg2="bg-teal-600"
          hoverbg2="hover:bg-teal-700"
          tx2="text-white"
        />
      </div>
    </div>
  );
}
