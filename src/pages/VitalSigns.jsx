import { useState, useEffect } from "react";
import { DataTable } from "../components/DataTable";
import Inputs, { Label, Textarea } from "../components/Inputs";
import PageHeader from "../components/PageHeader";
import SectionHeader, { SectionFooter } from "../components/SectionHeader";
import StickyNote from "../components/StickyNote";
import { usePatient } from "../context/PatientContext";


export default function VitalSigns() {
  const { patient } = usePatient();
  // null = not yet loaded, [] = loaded but empty
  const [vitalsRows, setVitalsRows] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [datetime, setDatetime] = useState("");
  const [bpSys, setBpSys] = useState("");
  const [bpDia, setBpDia] = useState("");
  const [hr, setHr] = useState("");
  const [temp, setTemp] = useState("");
  const [rr, setRr] = useState("");
  const [spo2, setSpo2] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [remarks, setRemarks] = useState("");

  const vitalsColumns = [
    { key: "datetime", label: "Date / Time" },
    { key: "bp", label: "BP (mmHg)" },
    { key: "hr", label: "HR (bpm)" },
    { key: "temp", label: "Temp (°C)" },
    { key: "rr", label: "RR / SpO2" },
    { key: "wt", label: "Wt / Ht" },
    { key: "recorded", label: "Recorded By" },
  ];

  useEffect(() => {
    if (!patient?.id) { setVitalsRows([]); return; }
    fetch(`/agial/patient/${patient.id}/vitals`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setVitalsRows(d?.rows || []))
      .catch(() => setVitalsRows([]));
  }, [patient?.id]);

  async function handleSaveVitals() {
    if (!patient?.id) return;
    setSaving(true);
    try {
      const body = {
        datetime: datetime || new Date().toISOString().slice(0, 16),
        bp_sys: bpSys,
        bp_dia: bpDia,
        hr: hr ? Number(hr) : null,
        temp: temp ? Number(temp) : null,
        rr: rr ? Number(rr) : null,
        spo2: spo2 ? Number(spo2) : null,
        reg_id: patient?.reg_id,
      };
      const res = await fetch(`/agial/patient/${patient.id}/vitals`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const refreshed = await fetch(`/agial/patient/${patient.id}/vitals`, { credentials: "include" });
        if (refreshed.ok) {
          const d = await refreshed.json();
          if (d?.rows?.length) setVitalsRows(d.rows);
        }
        handleClear();
      }
    } catch (_) {}
    setSaving(false);
  }

  function handleClear() {
    setBpSys(""); setBpDia(""); setHr(""); setTemp("");
    setRr(""); setSpo2(""); setWeight(""); setHeight(""); setRemarks("");
  }

  const bmi =
    weight && height
      ? (Number(weight) / (Number(height) / 100) ** 2).toFixed(1)
      : "";

  return (
    <div className="w-full">
      <div>
        <PageHeader title={patient ? `${patient.name} — Vital Signs` : "Vital Signs"} tx="Last Visit" no="2 hrs ago" />
      </div>
      <div>
        <StickyNote
          note={
            patient?.note ||
            "Patient is allergic to Penicillin. Ensure to check latest vitals before prescribing new medication."
          }
        />
      </div>
      <SectionHeader header="Record New Vital Signs" />
      <div className="border m-4 my-0 p-4 bg-white">
        <div className="mb-3 w-[50%] flex flex-col gap-2">
          <Label text="Date & Time" />
          <Inputs
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2">
            <Label text="Blood Pressure (mmhg)" />
            <div className="flex gap-3 items-center">
              <Inputs
                type="number"
                placeholder="120"
                value={bpSys}
                onChange={(e) => setBpSys(e.target.value)}
              />
              /
              <Inputs
                type="number"
                placeholder="80"
                value={bpDia}
                onChange={(e) => setBpDia(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label text="Heart Rate" />
            <Inputs
              type="number"
              unit="bpm"
              placeholder="72"
              value={hr}
              onChange={(e) => setHr(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label text="Temperature" />
            <Inputs
              type="number"
              unit="°C"
              placeholder="37.1"
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label text="Respiratory Rate" />
            <Inputs
              type="number"
              unit="/min"
              placeholder="16"
              value={rr}
              onChange={(e) => setRr(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label text="Spo2" />
            <Inputs
              type="number"
              unit="%"
              placeholder="98"
              value={spo2}
              onChange={(e) => setSpo2(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label text="Weight" />
            <Inputs
              type="number"
              unit="kg"
              placeholder="65"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label text="Height" />
            <Inputs
              type="number"
              unit="cm"
              placeholder="165"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label text="BMI" />
            <Inputs
              type="number"
              placeholder={bmi || "23.8(Normal)"}
              disabled="disabled"
            />
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <Label text="Remarks / Notes" />
          <Textarea
            placeholder="Add any observations regarding patient vitals..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
      </div>
      <SectionFooter
        text="Clear"
        bg="bg-white"
        hoverbg="hover:bg-gray-200"
        onClear={handleClear}
        text2={saving ? "Saving…" : "Save Vitals"}
        bg2="bg-teal-600"
        hoverbg2="hover:bg-teal-700"
        tx2="text-white"
        onSave={handleSaveVitals}
      />
      <div>
        <SectionHeader header="Vitals History" />
        <div className="border mx-4 mb-4 bg-white">
          {vitalsRows === null ? (
            <p className="p-4 text-sm text-gray-400">Loading…</p>
          ) : vitalsRows.length === 0 ? (
            <p className="p-4 text-sm text-gray-400 italic">No vitals recorded for this patient yet.</p>
          ) : (
            <DataTable columns={vitalsColumns} rows={vitalsRows} />
          )}
        </div>
      </div>
    </div>
  );
}
