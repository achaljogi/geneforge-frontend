import React from "react";
import Plot from "react-plotly.js";

function BoxPlot({ data, columns }) {
  // 🛑 SAFETY CHECKS
  if (!data || data.length === 0 || !columns || columns.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        No data available for Boxplot
      </p>
    );
  }

  // ✅ Remove gene / non-numeric columns
  const numericColumns = columns.filter(
    (col) => col.toLowerCase() !== "gene"
  );

  if (numericColumns.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        No numeric samples found for Boxplot
      </p>
    );
  }

  // ✅ Prepare traces
  const traces = numericColumns.map((col) => ({
    y: data
      .map((row) => Number(row[col]))
      .filter((v) => !isNaN(v)),
    type: "box",
    name: col,
    boxpoints: false,
  }));

  return (
    <div style={{ marginTop: "30px" }}>
      <h3 style={{ textAlign: "center" }}>Expression Distribution (Box Plot)</h3>

      <Plot
        data={traces}
        layout={{
          height: 420, // 🔥 IMPORTANT
          margin: { t: 40, l: 50, r: 20, b: 80 },
          yaxis: {
            title: "Expression Value",
            zeroline: false,
          },
          boxmode: "group",
        }}
        style={{ width: "100%" }}
        config={{ responsive: true }}
      />
    </div>
  );
}

export default BoxPlot;
