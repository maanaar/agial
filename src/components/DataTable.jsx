// import { useState } from "react";

// ─── Generic DataTable Component ─────────────────────────────────────────────

const statusColors = {
  Active:    { bg: "#e6f9f0", color: "#1a9e5c" },
  Completed: { bg: "#f0f0f0", color: "#888"    },
  Pending:   { bg: "#fff8e1", color: "#e6a817" },
  Moderate:  { bg: "#fde8e8", color: "#d94848" },
  Urgent:    { bg: "#fde8e8", color: "#d94848" },
  Routine:   { bg: "#f0f4ff", color: "#5a7ef5" },
};

function Badge({ label }) {
  const s = statusColors[label] || { bg: "#eee", color: "#555" };
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 12px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 600,
      background: s.bg,
      color: s.color,
    }}>
      {label}
    </span>
  );
}

function Avatar({ initials }) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 28, height: 28,
      borderRadius: "50%",
      background: "#c9d8f5",
      color: "#3a5bbf",
      fontSize: 11,
      fontWeight: 700,
      marginRight: 6,
    }}>
      {initials}
    </span>
  );
}

function ActionButton({ label, icon }) {
  return (
    <button style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "4px 12px", borderRadius: 6, border: "1px solid #d0d7e3",
      background: "#fff", color: "#3a5bbf", fontSize: 12,
      fontWeight: 600, cursor: "pointer",
    }}>
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
}

/**
 * DataTable
 *
 * Props:
 *   title   – string, table heading
 *   columns – array of { key, label, width? }
 *   rows    – array of objects; each value may be:
 *               • a plain string / number
 *               • { type: "badge",  value }
 *               • { type: "avatar", initials, value }
 *               • { type: "action", label, icon? }
 *               • { type: "dot",    color, value }   (coloured dot + text)
 *   footer  – optional footer node (e.g. "+ Add a line")
 */
export function DataTable({ title, columns, rows, footer }) {
  return (
    <div>
      {title && (
        <div style={{
          padding: "14px 20px 10px",
          fontWeight: 700, fontSize: 15,
          color: "#1e2a3a",
          borderBottom: "1px solid #f0f2f5",
        }}>
          {title}
        </div>
      )}

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} style={{
                  padding: "10px 16px",
                  textAlign: "left",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#8a96a8",
                  background: "#fafbfc",
                  borderBottom: "1px solid #eef0f3",
                  whiteSpace: "nowrap",
                  width: col.width,
                }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{
                borderBottom: ri < rows.length - 1 ? "1px solid #f3f5f8" : "none",
                transition: "background .15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#fafbff"}
                onMouseLeave={e => e.currentTarget.style.background = ""}
              >
                {columns.map(col => {
                  const cell = row[col.key];
                  return (
                    <td key={col.key} style={{
                      padding: "12px 16px",
                      fontSize: 13,
                      color: "#2d3a4a",
                      verticalAlign: "middle",
                    }}>
                      <CellRenderer cell={cell} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {footer && (
        <div style={{
          padding: "10px 16px",
          borderTop: "1px solid #f0f2f5",
          fontSize: 13,
          color: "#5a7ef5",
          fontWeight: 600,
          cursor: "pointer",
        }}>
          {footer}
        </div>
      )}
    </div>
  );
}

function CellRenderer({ cell }) {
  if (cell === null || cell === undefined) return null;

  if (typeof cell !== "object") return <span>{cell}</span>;

  switch (cell.type) {
    case "badge":
      return <Badge label={cell.value} />;

    case "avatar":
      return (
        <span style={{ display: "inline-flex", alignItems: "center" }}>
          <Avatar initials={cell.initials} />
          {cell.value}
        </span>
      );

    case "action":
      return <ActionButton label={cell.label} icon={cell.icon} />;

    case "dot":
      return (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: cell.color, display: "inline-block",
          }} />
          {cell.value}
        </span>
      );

    case "multi":   // bold title + subtitle
      return (
        <span>
          <strong style={{ display: "block", fontSize: 13 }}>{cell.title}</strong>
          <span style={{ fontSize: 11, color: "#8a96a8" }}>{cell.subtitle}</span>
        </span>
      );

    case "placeholder":
      return <span style={{ color: "#c0c7d3", fontStyle: "italic" }}>{cell.value}</span>;

    default:
      return <span>{JSON.stringify(cell)}</span>;
  }
}

// ─── Demo: all four tables ────────────────────────────────────────────────────


// ─── App ──────────────────────────────────────────────────────────────────────


