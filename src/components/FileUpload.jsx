import React from "react";

function FileUpload({ setTableData, setColumns, setFile }) {
  const handleUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    const response = await fetch("http://127.0.0.1:8000/upload-csv", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    setColumns(result.columns);
    setTableData(result.data);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input type="file" accept=".csv" onChange={handleUpload} />
    </div>
  );
}

export default FileUpload;

