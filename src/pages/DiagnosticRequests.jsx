import { useState, useEffect } from "react";
import { DataTable } from "../components/DataTable";
import Inputs, { Label, RadioInput, SearchInput, Textarea } from "../components/Inputs";
import PageHeader from "../components/PageHeader";
import SectionHeader, { SectionFooter } from "../components/SectionHeader";
import StickyNote from "../components/StickyNote";
import { usePatient } from "../context/PatientContext";

export default function DiagnosticRequests() {
  const { patient } = usePatient();
  const [labsRows, setLabsRows] = useState(null);
  const [priority, setPriority] = useState("Routine");

  const labsColumns = [
    { key: "datetime", label: "Date / Time" },
    { key: "category", label: "Category" },
    { key: "test", label: "Test Name" },
    { key: "priority", label: "Priority" },
    { key: "status", label: "Status" },
    { key: "requested", label: "Requested By" },
    { key: "actions", label: "Actions" },
  ];

  useEffect(() => {
    if (!patient?.id) { setLabsRows([]); return; }
    fetch(`/agial/patient/${patient.id}/lab-requests`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        setLabsRows(
          (d?.rows || []).map((lr) => ({
            datetime: lr.datetime || "—",
            category: lr.category || "Laboratory",
            test: lr.test || "—",
            priority: { type: "badge", value: lr.priority || "Routine" },
            status: {
              type: "dot",
              color: lr.status_color || "#e6a817",
              value: lr.status || "Pending",
            },
            requested: { type: "avatar", initials: (lr.requested || "").slice(0, 2).toUpperCase() || "—", value: lr.requested || "—" },
            actions: lr.status === "Completed" ? { type: "action", label: "Results", icon: "👁" } : "",
          }))
        );
      })
      .catch(() => setLabsRows([]));
  }, [patient?.id]);

  return (
    <div className="w-full">
      <div>
        <PageHeader
          title={patient ? `${patient.name} — Diagnostic Requests` : "Diagnostic Requests"}
          tx="Pending"
          no={labsRows?.filter(r => r.status?.value === "Pending" || r.status?.value?.includes?.("Pending")).length ?? 0}
        />
      </div>
      <div>
        <StickyNote note={patient?.note || "Patient is allergic to Penicillin. Ensure to check latest vitals before prescribing new medication."} />
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
            <Label text="Priority" />
            <RadioInput
              priorities={["Routine", "Urgent", "STAT"]}
              onChange={setPriority}
            />
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
          {labsRows === null ? (
            <p className="p-4 text-sm text-gray-400">Loading…</p>
          ) : labsRows.length === 0 ? (
            <p className="p-4 text-sm text-gray-400 italic">No diagnostic requests found for this patient.</p>
          ) : (
            <DataTable columns={labsColumns} rows={labsRows} />
          )}
        </div>
      </div>
    </div>
  );
}
