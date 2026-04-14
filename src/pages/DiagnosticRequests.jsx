import { DataTable } from "../components/DataTable";
import Inputs, {
  Label,
  RadioInput,
  SearchInput,
  SelectInput,
  Textarea,
} from "../components/Inputs";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import SectionHeader, { SectionFooter } from "../components/SectionHeader";
import StickyNote from "../components/StickyNote";

export default function DiagnosticRequests() {
  // const route = ["oral", "IV", "IM"]

  const labsColumns = [
    { key: "datetime", label: "Date / Time" },
    { key: "category", label: "Category" },
    { key: "test", label: "Test Name" },
    { key: "priority", label: "Priority" },
    { key: "status", label: "Status" },
    { key: "requested", label: "Requested By" },
    { key: "actions", label: "Actions" },
  ];

  const labsRows = [
    {
      datetime: "10 Apr 2026\n08:30 AM",
      category: "Laboratory",
      test: "Comprehensive Metabolic Panel (CMP)",
      priority: { type: "badge", value: "Routine" },
      status: { type: "dot", color: "#e6a817", value: "Pending" },
      requested: { type: "avatar", initials: "AA", value: "Dr. Ahmed" },
      actions: "",
    },
    {
      datetime: "05 Apr 2026\n10:15 AM",
      category: "Radiology",
      test: "Chest X-Ray (PA & Lateral)",
      priority: { type: "badge", value: "Urgent" },
      status: { type: "dot", color: "#1a9e5c", value: "Completed" },
      requested: { type: "avatar", initials: "AA", value: "Dr. Ahmed" },
      actions: { type: "action", label: "Results", icon: "👁" },
    },
    {
      datetime: "05 Apr 2026\n10:15 AM",
      category: "Laboratory",
      test: "Urinalysis",
      priority: { type: "badge", value: "Routine" },
      status: { type: "dot", color: "#1a9e5c", value: "Completed" },
      requested: { type: "avatar", initials: "AA", value: "Dr. Ahmed" },
      actions: { type: "action", label: "Results", icon: "👁" },
    },
  ];
  return (
    <div className="relative z-10 flex  w-full flex-1 flex-col lg:flex-row min-h-screen">
      <div className="w-full">
        <div>
          <PageHeader title="Diagnostic Requests" tx="Pending Result" no="2" />
        </div>
        <div>
          <StickyNote note="Patient is allergic to Penicillin. Ensure to check latest vitals before prescribing new medication." />
        </div>
        <SectionHeader header="New Diagnostic Request" />
        <div className="border m-4 my-0 p-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <div className="flex flex-col gap-4">
              <Label text="Category" />
              <select className="w-full inline-flex items-center border border-gray-300 rounded-md bg-white overflow-hidden focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-200  px-2.5 py-1.5 text-sm text-gray-900 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none">
                <option value="Laboratory">Laboratory</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <Label text="Priority"/>
              <RadioInput priorities={["Routine", "Urgent", "STAT"]} />
            </div>
          </div>
          <div className="my-3 flex flex-col gap-2">
            <Label text="Search & select Tests" />
            <SearchInput placeholder="Search for tests (e.g., CBC, Lipid Profile, X-Ray)" />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <Label text="Clinical Details / Reason for Request" />
            <Textarea placeholder="Routine checkup for diabetic patient..." />
          </div>
        </div>
        <SectionFooter
          text="Clear"
          bg="bg-white"
          hoverbg="hover:bg-gray-200"
          text2="Submit Request"
          bg2="bg-teal-600"
          hoverbg2="hover:bg-teal-700"
          tx2="text-white"
        />
        <div>
          <SectionHeader header="Previous Requests" text="Filter" />
          <div className="border mx-4 mb-4 bg-white">
            <DataTable columns={labsColumns} rows={labsRows} />
          </div>
        </div>
      </div>
    </div>
  );
}
