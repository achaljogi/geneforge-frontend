import Plot from "react-plotly.js";

export default function HeatmapPlot({ data }) {

  if (!data || data.length === 0) {
    return <p>No heatmap data available</p>;
  }

  // Extract column names automatically
  const columns = Object.keys(data[0]);

  const geneCol = columns[0];
  const numericCols = columns.slice(1);

  const z = data.map(row =>
    numericCols.map(col => Number(row[col]))
  );

  const genes = data.map(row => row[geneCol]);

  return (
    <div style={{ marginTop: "30px" }}>
      <h3 style={{ textAlign: "center" }}>
        Top Differentially Expressed Genes Heatmap
      </h3>

      <Plot
        data={[
          {
            z: z,
            x: numericCols,
            y: genes,
            type: "heatmap",
            colorscale: "RdBu"
          }
        ]}
        layout={{
          width: 900,
          height: 500,
          
        }}

        // ✅ Disabled zoom/scroll (same as volcano plot)
        config={{
          displayModeBar: false,
          scrollZoom: false,
          doubleClick: false
        }}

        style={{ width: "100%" }}
      />
    </div>
  );
}