import React, { useState } from "react";

function Navbar() {

  const [showAbout, setShowAbout] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
        <div className="container-fluid">

          <a className="navbar-brand fw-bold" href="#home">
            Gene Expression Data Analysis Platform and Visualization
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav ms-auto">

              {/* Home */}
              <li className="nav-item mx-3">
                <a className="nav-link" href="#home">
                  Home
                </a>
              </li>

              {/* About button */}
              <li className="nav-item mx-3">
                <button
                  className="btn nav-link border-0 bg-transparent text-white"
                  onClick={() => setShowAbout(true)}
                >
                  About
                </button>
              </li>

              {/* User Guide button */}
              <li className="nav-item mx-3">
                <button
                  className="btn nav-link border-0 bg-transparent text-white"
                  onClick={() => setShowGuide(true)}
                >
                  User Guide
                </button>
              </li>

            </ul>

          </div>
        </div>
      </nav>


      {/* ABOUT POPUP */}
      {showAbout && (
        <div
          style={{
            position: "fixed",
            top:0,
            left:0,
            width:"100%",
            height:"100%",
            background:"rgba(0,0,0,0.5)",
            zIndex:9999
          }}
        >
          <div
            className="card shadow"
            style={{
              width:"700px",
              margin:"100px auto",
              padding:"30px"
            }}
          >

            <div className="d-flex justify-content-between">
              <h3>About GeneForge</h3>

              <button
                className="btn btn-danger"
                onClick={() => setShowAbout(false)}
              >
                X
              </button>
            </div>

            <hr />

            <p>
              GeneForge is a web-based platform for gene expression
              data analysis and visualization using GEO dataset GSE18520.
            </p>

            <p>
              The platform supports:
            </p>

            <ul>
              <li>Gene expression dataset upload</li>
              <li>Sample group selection</li>
              <li>Quality control using PCA and Boxplots</li>
              <li>Differential expression analysis</li>
              <li>Volcano plot visualization</li>
              <li>Heatmap generation</li>
              <li>Downloadable result files</li>
            </ul>

          </div>
        </div>
      )}



      {/* USER GUIDE POPUP */}
      {showGuide && (
        <div
          style={{
            position:"fixed",
            top:0,
            left:0,
            width:"100%",
            height:"100%",
            background:"rgba(0,0,0,0.5)",
            zIndex:9999
          }}
        >
          <div
            className="card shadow"
            style={{
              width:"700px",
              margin:"100px auto",
              padding:"30px"
            }}
          >

            <div className="d-flex justify-content-between">
              <h3>User Guide</h3>

              <button
                className="btn btn-danger"
                onClick={() => setShowGuide(false)}
              >
                X
              </button>
            </div>

            <hr />

            <ol>
              <li>Upload gene expression CSV file.</li>
              <li>Select control and treated sample groups.</li>
              <li>Run quality control analysis.</li>
              <li>Perform differential expression analysis.</li>
              <li>Generate heatmap visualization.</li>
              <li>Download results for further study.</li>
            </ol>

          </div>
        </div>
      )}

    </>
  );
}

export default Navbar;


