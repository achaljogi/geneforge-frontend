import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { PCA } from "ml-pca";

const PCAPlot = ({
  data,
  selectedSamples = [],
  controlSamples = [],
  treatedSamples = []
}) => {

  const [plotData, setPlotData] = useState([]);
  const [variance, setVariance] = useState({ pc1: 0, pc2: 0 });

  useEffect(() => {
    if (!data || data.length === 0) return;

    try {
      const allSamples = Object.keys(data[0]).filter(
        key => key !== "GeneSymbol"
      );

      // ✅ selected या fallback ALL
      let sampleNames =
        selectedSamples && selectedSamples.length >= 2
          ? allSamples.filter(name => selectedSamples.includes(name))
          : allSamples;

      // Matrix
      const matrix = data.map(row =>
        sampleNames.map(sample => {
          const val = parseFloat(row[sample]);
          return isNaN(val) ? 0 : val;
        })
      );

      // Transpose
      const cleanData = sampleNames.map((_, i) =>
        matrix.map(row => row[i])
      );

      // PCA
      const pca = new PCA(cleanData, { center: true, scale: true });
      const result = pca.predict(cleanData);

      const pc1 = result.getColumn(0);
      const pc2 = result.getColumn(1);

      const varExp = pca.getExplainedVariance();
      setVariance({
        pc1: (varExp[0] * 100).toFixed(2),
        pc2: (varExp[1] * 100).toFixed(2)
      });

      // ✅ USER-BASED GROUPING
      const control = { x: [], y: [] };
      const treated = { x: [], y: [] };

      sampleNames.forEach((name, i) => {

        if (controlSamples.includes(name)) {
          control.x.push(pc1[i]);
          control.y.push(pc2[i]);

        } else if (treatedSamples.includes(name)) {
          treated.x.push(pc1[i]);
          treated.y.push(pc2[i]);
        }
      });

      const traces = [];

      // 🔴 CONTROL (RED)
      if (control.x.length > 0) {
        traces.push({
          x: control.x,
          y: control.y,
          type: "scatter",
          mode: "markers",
          name: "Control",
          marker: {
            color: "red",
            size: 10
          }
        });
      }

      // 🔵 TREATED (BLUE)
      if (treated.x.length > 0) {
        traces.push({
          x: treated.x,
          y: treated.y,
          type: "scatter",
          mode: "markers",
          name: "Treated",
          marker: {
            color: "blue",
            size: 10
          }
        });
      }

      // 🔥 fallback
      if (traces.length === 0) {
        traces.push({
          x: pc1,
          y: pc2,
          type: "scatter",
          mode: "markers",
          name: "All Samples",
          marker: {
            color: "blue",
            size: 10
          }
        });
      }

      setPlotData(traces);

    } catch (err) {
      console.error("PCA ERROR:", err);
    }
  }, [data, selectedSamples, controlSamples, treatedSamples]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h4 style={{ textAlign: "center" }}>
        PCA Plot (Sample Clustering)
      </h4>

      <Plot
        key={JSON.stringify(selectedSamples)}
        data={plotData}
        layout={{
          height: 500,
          margin: { t: 40, l: 50, r: 20, b: 50 },
          xaxis: { title: `PC1 (${variance.pc1}%)` },
          yaxis: { title: `PC2 (${variance.pc2}%)` },
          legend: { orientation: "h", x: 0.3, y: 1.1 }
        }}
        config={{ displayModeBar: false }}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default PCAPlot;