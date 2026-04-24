import React, { useState } from "react";
import AboutModal from "./components/AboutModal";

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

              {/* About */}
              <li className="nav-item mx-3">
                <a
                  href="#"
                  className="nav-link text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAbout(true);
                  }}
                >
                  About
                </a>
              </li>

              {/* User Guide */}
              <li className="nav-item mx-3">
                <a
                  href="#"
                  className="nav-link text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowGuide(true);
                  }}
                >
                  User Guide
                </a>
              </li>

            </ul>
          </div>
        </div>
      </nav>


      {/* ABOUT POPUP (from AboutModal.js) */}
      {showAbout && (
        <AboutModal onClose={() => setShowAbout(false)} />
      )}


      {/* USER GUIDE POPUP */}
      {showGuide && (
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
              <li>Run PCA and Boxplot quality control.</li>
              <li>Perform differential expression analysis.</li>
              <li>Generate volcano plot and heatmap.</li>
              <li>Download result files.</li>
            </ol>

          </div>
        </div>
      )}

    </>
  );
}

export default Navbar;


