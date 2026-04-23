import React from "react";

const SampleSelector = ({
  columns = [],
  controlSamples = [],
  treatedSamples = [],
  setControlSamples,
  setTreatedSamples
}) => {

  if (!columns || columns.length === 0) {
    return <p>Please upload dataset first</p>;
  }

  const samples = columns.slice(1);

  // ✅ FINAL FIX: auto-remove from other group
  const toggleControl = (sample) => {
    setControlSamples(prev => {
      if (prev.includes(sample)) {
        return prev.filter(s => s !== sample);
      } else {
        // remove from treated
        setTreatedSamples(prev2 => prev2.filter(s => s !== sample));
        return [...prev, sample];
      }
    });
  };

  const toggleTreated = (sample) => {
    setTreatedSamples(prev => {
      if (prev.includes(sample)) {
        return prev.filter(s => s !== sample);
      } else {
        // remove from control
        setControlSamples(prev2 => prev2.filter(s => s !== sample));
        return [...prev, sample];
      }
    });
  };

  return (
    <div className="row">

      {/* Control */}
      <div className="col-md-6">
        <h5>Control Samples</h5>

        {samples.map(sample => (
          <div key={sample} className="form-check">

            <input
              className="form-check-input"
              type="checkbox"
              checked={controlSamples.includes(sample)}
              onChange={() => toggleControl(sample)}
            />

            <label className="form-check-label">
              {sample}
            </label>

          </div>
        ))}
      </div>

      {/* Treated */}
      <div className="col-md-6">
        <h5>Treated Samples</h5>

        {samples.map(sample => (
          <div key={sample} className="form-check">

            <input
              className="form-check-input"
              type="checkbox"
              checked={treatedSamples.includes(sample)}
              onChange={() => toggleTreated(sample)}
            />

            <label className="form-check-label">
              {sample}
            </label>

          </div>
        ))}
      </div>

    </div>
  );
};

export default SampleSelector;