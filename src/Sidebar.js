import React from "react";

function Sidebar() {
  return (
    <div className="bg-dark text-white p-3 vh-100" style={{width:"320px" , height:"700px"}}>
      <h4 className="text-center mb-4">Geneforge Pipeline</h4>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <span className="nav-link text-white"> 1. Upload Gene Expression Dataset</span>
        </li>


        <li className="nav-item mb-2">
          <span className="nav-link text-white"> 3. Samples Group Selection </span>
        </li>

        <li className="nav-item mb-2">
          <span className="nav-link text-white">4. Quality Control (PCA + Boxplot)</span>
        </li>

        <li className="nav-item mb-2">
          <span className="nav-link text-white">5. Differential Expression Analysis</span>
        </li>

        <li className="nav-item mb-2" >
          <span className="nav-link text-white"> 6. Volcano Plot </span>
        </li>

        <li className="nav-item">
          <span className="nav-link text-white"> 7. Heatmap Visualization</span>
        </li>

        <li className="nav-item" >
          <span className="nav-link text-white"> 8. Download Results </span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;