import React from "react";

function AboutModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h2>About GeneForge</h2>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>

        <hr />

        <p>
          GeneForge is an interactive web-based platform developed for gene
          expression analysis and visualization using GEO dataset GSE18520.
        </p>

        <h4>Our Mission</h4>
        <p>
          To provide researchers and students an accessible platform for
          reproducible gene expression analysis.
        </p>

      </div>
    </div>
  );
}

export default AboutModal;