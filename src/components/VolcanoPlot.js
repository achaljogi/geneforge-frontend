import React from "react";
import Plot from "react-plotly.js";

const VolcanoPlot = ({ data = [] }) => {

  if (!data || data.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        No differential expression data
      </p>
    );
  }

  const x = data.map(d => Number(d.log2FoldChange));
  const y = data.map(d => -Math.log10(Number(d.pvalue)));

  const colors = data.map(d => {
    if (d.log2FoldChange > 1 && d.pvalue < 0.05) return "red";   // up
    if (d.log2FoldChange < -1 && d.pvalue < 0.05) return "blue"; // down
    return "gray";
  });

  return (
    <div style={{ marginTop: "20px" }}>
      <h4 style={{ textAlign: "center" }}>Volcano Plot</h4>

      <Plot
        data={[
          {
            x: x,
            y: y,
            text: data.map(d => d.Gene),
            mode: "markers",
            type: "scatter",
            marker: {
              color: colors,
              size: 8
            }
          }
        ]}
        layout={{
          height: 500,
          xaxis: { title: "log2 Fold Change" },
          yaxis: { title: "-log10(p-value)" },
          margin: { t: 40, l: 50, r: 20, b: 50 }
        }}
        config={{ displayModeBar: false }}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default VolcanoPlot;