import React, { useState } from "react";

function Navbar() {

  const [showAbout, setShowAbout] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">

          <a className="navbar-brand" href="#home">
            GeneForge
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

              <li className="nav-item">
                <a className="nav-link" href="#home">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <button
                  className="btn nav-link border-0 bg-transparent text-white"
                  onClick={() => setShowAbout(true)}
                >
                  About
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="btn nav-link border-0 bg-transparent text-white"
                  onClick={() => setShowGuide(true)}
                >
                  User Guide
                </button>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#methods">
                  Methods
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>

            </ul>
          </div>
        </div>
      </nav>


      {/* About Modal */}
      {showAbout && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">
                  About GeneForge
                </h5>

                <button
                  className="btn-close"
                  onClick={() => setShowAbout(false)}
                ></button>
              </div>

              <div className="modal-body">
                <p>
                  GeneForge is a web-based platform for gene expression
                  data analysis and visualization using GEO dataset GSE18520.
                </p>

                <p>
                  Features include:
                </p>

                <ul>
                  <li>Dataset upload</li>
                  <li>Quality control (PCA, Boxplots)</li>
                  <li>Differential expression analysis</li>
                  <li>Volcano plot visualization</li>
                  <li>Heatmap generation</li>
                  <li>Downloadable results</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}


      {/* User Guide Modal */}
      {showGuide && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">
                  User Guide
                </h5>

                <button
                  className="btn-close"
                  onClick={() => setShowGuide(false)}
                ></button>
              </div>

              <div className="modal-body">
                <ol>
                  <li>Upload gene expression CSV file.</li>
                  <li>Select control and treated groups.</li>
                  <li>Run quality control analysis.</li>
                  <li>Perform differential expression analysis.</li>
                  <li>Generate heatmap.</li>
                  <li>Download results.</li>
                </ol>
              </div>

            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default Navbar;


