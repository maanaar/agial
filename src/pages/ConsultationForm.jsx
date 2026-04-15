import { useState, useEffect } from "react";
import { DataTable } from "../components/DataTable";
import Inputs, { Label, Textarea } from "../components/Inputs";
import PageHeader from "../components/PageHeader";
import SectionHeader, { SectionFooter } from "../components/SectionHeader";
import StickyNote from "../components/StickyNote";
import { usePatient } from "../context/PatientContext";

export default function ConsultationForm() {
  const { patient } = usePatient();
  const complaintsRows = [];
  const [icdRows, setIcdRows] = useState([]);
  const [labCount, setLabCount] = useState(0);
  const [rxCount, setRxCount] = useState(0);

  const complaintsColumns = [
    { key: "date", label: "Date" },
    { key: "doctor", label: "Doctor" },
    { key: "complaints", label: "Complaints", width: "40%" },
    { key: "remarks", label: "Remarks" },
    { key: "severity", label: "Severity" },
  ];

  const icdColumns = [
    { key: "cptcode", label: "CPT Code" },
    { key: "shortDescription", label: "Short Description" },
    { key: "longDescription", label: "Long Description" },
  ];

  useEffect(() => {
    if (!patient?.reg_id) return;
    fetch(`/agial/consultation/${patient.reg_id}/data`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return;
        if (d.icd_codes?.length) {
          setIcdRows(
            d.icd_codes.map((icd) => ({
              cptcode: icd.code || "—",
              shortDescription: icd.short_desc || "—",
              longDescription: icd.full_desc || "—",
            }))
          );
        }
        if (d.lab_requests?.length) setLabCount(d.lab_requests.length);
        if (d.medications?.length) setRxCount(d.medications.length);
      })
      .catch(() => {});
  }, [patient?.reg_id]);

  return (
    <div className="w-full">
      <div>
        <PageHeader
          title={patient ? `${patient.name} — Consultation` : "Consultation Form"}
          tx="Lab Request"
          no={labCount}
          tx2="Pharmacy"
          no2={rxCount}
        />
      </div>
      <div>
        <StickyNote
          note={
            patient?.note ||
            "Patient is allergic to Penicillin. Ensure to check latest vitals before prescribing new medication."
          }
        />
      </div>
      <div>
        <SectionHeader
          header="Patient Complaints"
          text="+ Add Complaint"
          tx="text-teal-600"
          border="border border-teal-600"
        />
        <div className="border mx-4 mb-4 bg-white">
          <DataTable
            columns={complaintsColumns}
            rows={complaintsRows}
            footer="+ Add a line"
          />
        </div>
        <SectionHeader header="Diagnosis & ICD-Codes" />
        <div className="border mx-4 mb-4 px-4 pb-4 bg-white rounded-md">
          <div className="mt-3 flex flex-col gap-2">
            <Label text="Diagnostic Text" />
            <Textarea placeholder="Enter detailed diagnostic observations based on examination..." />
          </div>
          <div className="bg-white">
            <DataTable
              title="ICD-10 Codes"
              columns={icdColumns}
              rows={icdRows}
              footer="+ Add a line"
            />
          </div>
        </div>
      </div>
      <SectionHeader header="Recommendations & Follow-up" />
      <div className="border m-4 my-0 p-4 bg-white">
        <div className="mb-3 flex flex-col gap-2">
          <Label text="Final Diagnosis" />
          <Inputs type="text" placeholder="Enter final diagnosis conclusion" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <Label text="Recommended Lab" />
            <select className="w-full inline-flex items-center border border-gray-300 rounded-md bg-white overflow-hidden focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-200 px-2.5 py-1.5 text-sm text-gray-900 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none">
              <option value="Select lab tests">Select lab tests</option>
              <option value="test1">Test1</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label text="Recommended Rad" />
            <select className="w-full inline-flex items-center border border-gray-300 rounded-md bg-white overflow-hidden focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-200 px-2.5 py-1.5 text-sm text-gray-900 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none">
              <option value="Select radiology tests">Select radiology tests</option>
              <option value="test1">Test1</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label text="Follow Up" />
            <Inputs type="text" placeholder="e.g., Return after 1 week" />
          </div>
          <div className="flex flex-col gap-2">
            <Label text="Next Visit Date" />
            <Inputs type="date" />
          </div>
        </div>
      </div>
      <SectionFooter
        text="Close"
        bg="bg-white"
        hoverbg="hover:bg-gray-200"
        text2="Save Consultion"
        bg2="bg-teal-600"
        hoverbg2="hover:bg-teal-700"
        tx2="text-white"
      />
    </div>
  );
}
