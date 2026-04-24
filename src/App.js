import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

/* ---------- Components ---------- */
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import VolcanoPlot from "./components/VolcanoPlot";
import PCAPlot from "./components/PCAPlot";
import BoxPlot from "./components/BoxPlot";
import SampleSelector from "./components/SampleSelector";
import HeatmapPlot from "./components/HeatmapPlot";

/* =========================================================
   App.js
   Main application workflow for GeneForge:
   1. Upload gene expression CSV
   2. Select control and treated samples
   3. Perform quality control (PCA + Boxplot)
   4. Run differential expression analysis
   5. Visualize volcano plot + top genes
   6. Generate heatmap
   7. Download differential expression results
========================================================= */

function App() {

  /* ---------- State Variables ---------- */

  const [file, setFile] = useState(null);

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const [deData, setDeData] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);

  const [error, setError] = useState("");

  const [controlSamples, setControlSamples] = useState([]);
  const [treatedSamples, setTreatedSamples] = useState([]);

  const [uploadLoading, setUploadLoading] = useState(false);
  const [deLoading, setDeLoading] = useState(false);
  const [heatmapLoading, setHeatmapLoading] = useState(false);

  const [topGenes] = useState(20);

  const selectedSamples = [
    ...controlSamples,
    ...treatedSamples
  ];


  /* ---------- Wake Backend on Load ---------- */
  useEffect(() => {

    const wakeBackend = async () => {
      try {
        await fetch(
          "https://geneforge-backend.onrender.com/health"
        );
        console.log("Backend awake");
      } catch (e) {
        console.error(e);
      }
    };

    wakeBackend();

  }, []);


  /* =========================================================
      Upload CSV File
  ========================================================= */

  const handleUpload = async () => {

    if (uploadLoading) return;

    if (!file) {
      setError("Please select a CSV file");
      return;
    }

    setUploadLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {

      const response = await fetch(
        "https://geneforge-backend.onrender.com/upload-csv",
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();

      setColumns(result.columns || []);
      setData(result.data || []);

    } catch (error) {

      console.error(error);
      setError("Backend connection failed");

    } finally {

      setUploadLoading(false);

    }
  };


  /* =========================================================
      Differential Expression Analysis
  ========================================================= */

  const runDEAnalysis = async () => {

    if (deLoading) return;

    if (!file) {
      setError("Upload CSV first");
      return;
    }

    if (
      controlSamples.length === 0 ||
      treatedSamples.length === 0
    ) {
      setError("Select control and treated samples");
      return;
    }

    setDeLoading(true);
    setError("");

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
      "control_samples",
      JSON.stringify(controlSamples)
    );

    formData.append(
      "treated_samples",
      JSON.stringify(treatedSamples)
    );

    try {

      const response = await fetch(
        "https://geneforge-backend.onrender.com/differential-expression",
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("DE analysis failed");
      }

      const result = await response.json();

      setDeData(result);

    } catch (error) {

      console.error(error);
      setError("Backend connection failed");

    } finally {

      setDeLoading(false);

    }
  };


  /* =========================================================
      Generate Heatmap
  ========================================================= */

  const runHeatmap = async () => {

    if (heatmapLoading) return;

    setHeatmapLoading(true);

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
      "control_samples",
      JSON.stringify(controlSamples)
    );

    formData.append(
      "treated_samples",
      JSON.stringify(treatedSamples)
    );

    formData.append(
      "top_genes",
      topGenes
    );

    try {

      const response = await fetch(
        "https://geneforge-backend.onrender.com/top-genes-heatmap",
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("Heatmap failed");
      }

      const result = await response.json();

      setHeatmapData(result);

    } catch (error) {

      console.error(error);
      setError("Heatmap failed");

    } finally {

      setHeatmapLoading(false);

    }

  };


  /* =========================================================
      Download Results as CSV
  ========================================================= */

  const downloadCSV = () => {

    if (!deData.length) return;

    const headers = Object.keys(deData[0]);

    const rows = [
      headers.join(","),
      ...deData.map(row =>
        headers.map(field => row[field]).join(",")
      )
    ];

    const csv = rows.join("\n");

    const blob = new Blob(
      [csv],
      { type: "text/csv" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "differential_expression_results.csv";

    a.click();

  };


  /* =========================================================
      UI Rendering
  ========================================================= */

  return (

    <div className="d-flex" id="home">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="container mt-4">

          {/* Upload Section */}
          <div className="card p-3 mb-4 shadow">

            <h4>Upload Gene Expression Dataset</h4>

            <input
              type="file"
              className="form-control mb-3"
              accept=".csv"
              onChange={(e)=>setFile(e.target.files[0])}
            />

            <button
              type="button"
              className="btn btn-primary"
              onMouseDown={handleUpload}
              disabled={uploadLoading}
            >
              {uploadLoading ? "Uploading..." : "Upload"}
            </button>

            {error &&
              <p className="text-danger mt-2">
                {error}
              </p>
            }

          </div>


          {data.length > 0 && (

            <>

              {/* Sample Selection */}
              <div className="card p-3 mb-4 shadow">

                <h4>Sample Group Selection</h4>

                <SampleSelector
                  columns={columns}
                  controlSamples={controlSamples}
                  treatedSamples={treatedSamples}
                  setControlSamples={setControlSamples}
                  setTreatedSamples={setTreatedSamples}
                />

              </div>


              {/* Quality Control */}
              <div className="card p-3 mb-4 shadow">

                <h4>Quality Control Analysis</h4>

                <PCAPlot
                  data={data}
                  selectedSamples={selectedSamples}
                  controlSamples={controlSamples}
                  treatedSamples={treatedSamples}
                />

                <BoxPlot
                  data={data}
                  columns={
                    selectedSamples.length > 0
                      ? ["GeneSymbol", ...selectedSamples]
                      : columns
                  }
                  controlSamples={controlSamples}
                  treatedSamples={treatedSamples}
                />

              </div>


              {/* Differential Expression */}
              <div className="card p-3 mb-4 shadow">

                <h4>Differential Expression Analysis</h4>

                <button
                  type="button"
                  className="btn btn-success mb-3"
                  onMouseDown={runDEAnalysis}
                  disabled={deLoading}
                >
                  {deLoading
                    ? "Running..."
                    : "Run Differential Expression"}
                </button>


                {deData.length > 0 && (
                  <>

                    <VolcanoPlot data={deData} />


                    <div className="mt-4">

                      <h4>Top Differentially Expressed Genes</h4>

                      <div style={{overflowX:"auto"}}>

                        <table className="table table-striped table-bordered">

                          <thead>
                            <tr>
                              <th>Gene</th>
                              <th>log2FC</th>
                              <th>p-value</th>
                              <th>adj p-value</th>
                            </tr>
                          </thead>

                          <tbody>
                            {deData.slice(0,20).map((gene,index)=>(

                              <tr key={index}>
                                <td>
                                  {gene.Gene ||
                                   gene.gene ||
                                   gene.GeneSymbol ||
                                   "N/A"}
                                </td>

                                <td>
                                  {Number(
                                    gene.log2FC || 0
                                  ).toFixed(4)}
                                </td>

                                <td>
                                  {Number(
                                    gene.pvalue ||
                                    gene.p_value ||
                                    0
                                  ).toFixed(8)}
                                </td>

                                <td>
                                  {Number(
                                    gene.adj_pvalue ||
                                    gene.adjPvalue ||
                                    gene.padj ||
                                    0
                                  ).toFixed(8)}
                                </td>

                              </tr>

                            ))}
                          </tbody>

                        </table>

                      </div>

                    </div>


                    {/* Heatmap + Download Buttons */}
                    <div className="button-container">

                      <button
                        className="btn btn-warning mb-3"
                        onMouseDown={runHeatmap}
                        disabled={heatmapLoading}
                      >
                        {heatmapLoading
                          ? "Generating..."
                          : (
                            <>
                              Generate <br />
                              Heatmap
                            </>
                          )
                        }
                      </button>

                      <button
                        className="btn btn-info"
                        onClick={downloadCSV}
                      >
                        Download <br />
                        Results
                      </button>

                    </div>


                    {/* Heatmap */}
                    {heatmapData.length > 0 && (

                      <div className="card p-3 mt-4 shadow">

                        <h4>Heatmap</h4>

                        <HeatmapPlot
                          data={heatmapData}
                        />

                      </div>

                    )}

                  </>
                )}

              </div>

            </>

          )}


          <footer className="text-center mb-4">
            © 2025–26 MSc Bioinformatics Academic Project
          </footer>

        </div>

      </div>

    </div>

  );

}

export default App;