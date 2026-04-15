import { useState, useEffect } from "react";
import { DataTable } from "../components/DataTable";
import Inputs, { Label, SearchInput, SelectInput, Textarea } from "../components/Inputs";
import PageHeader from "../components/PageHeader";
import SectionHeader, { SectionFooter } from "../components/SectionHeader";
import StickyNote from "../components/StickyNote";
import { usePatient } from "../context/PatientContext";

export default function MedicalRecord() {
  const { patient } = usePatient();
  const [medicationsRows, setMedicationsRows] = useState(null);

  const medicationsColumns = [
    { key: "drug", label: "Drug Name" },
    { key: "dose", label: "Dose / Freq" },
    { key: "route", label: "Route" },
    { key: "duration", label: "Duration" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  useEffect(() => {
    if (!patient?.reg_id) { setMedicationsRows([]); return; }
    fetch(`/agial/consultation/${patient.reg_id}/data`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        setMedicationsRows(
          (d?.medications || []).map((m) => ({
            drug: { type: "multi", title: m.name, subtitle: m.dose || "" },
            dose: [m.dose, m.frequency].filter(Boolean).join(", ") || "—",
            route: m.route || "Oral",
            duration: m.duration || "—",
            status: { type: "badge", value: "Active" },
            actions: "✏️",
          }))
        );
      })
      .catch(() => setMedicationsRows([]));
  }, [patient?.reg_id]);

  return (
    <div className="w-full">
      <div>
        <PageHeader
          title={patient ? `${patient.name} — Medication Record` : "Medication Record"}
          tx="Active Prescriptions"
          no={medicationsRows?.length ?? 0}
        />
      </div>
      <div>
        <StickyNote note={patient?.note || "Patient is allergic to Penicillin. Ensure to check latest vitals before prescribing new medication."} />
      </div>
      <div>
        <SectionHeader header="Current Medications" />
        <div className="border mx-4 mb-4 bg-white">
          {medicationsRows === null ? (
            <p className="p-4 text-sm text-gray-400">Loading…</p>
          ) : medicationsRows.length === 0 ? (
            <p className="p-4 text-sm text-gray-400 italic">No medications on record for this patient.</p>
          ) : (
            <DataTable columns={medicationsColumns} rows={medicationsRows} />
          )}
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
          <div className="flex flex-col gap-2">
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
  );
}
