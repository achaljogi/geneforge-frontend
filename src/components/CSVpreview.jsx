import React from "react";

function CSVPreview({ data, columns }) {
  if (!data?.length || !columns?.length) return null;

  const previewRows = data.slice(0, 8); // show first 8 genes

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>📄 CSV Preview (First 8 Genes)</h3>

      <div
        style={{
          overflowX: "auto",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          marginTop: "10px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr style={{ background: "#f1f5f9" }}>
              <th style={thStyle}>Gene</th>
              {columns.map((col) => (
                <th key={col} style={thStyle}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {previewRows.map((row, i) => (
              <tr key={i}>
                <td style={tdStyle}>
                  <b>{row.gene || `Gene_${i + 1}`}</b>
                </td>
                {columns.map((col) => (
                  <td key={col} style={tdStyle}>
                    {Number(row[col]).toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: "13px", color: "#475569", marginTop: "8px" }}>
        Showing a subset of genes for preview. Full dataset is used for analysis.
      </p>
    </div>
  );
}

const thStyle = {
  padding: "8px",
  borderBottom: "1px solid #e5e7eb",
  textAlign: "center",
};

const tdStyle = {
  padding: "6px",
  borderBottom: "1px solid #f1f5f9",
  textAlign: "center",
};

export default CSVPreview;
