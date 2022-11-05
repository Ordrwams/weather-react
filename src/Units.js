import "./Units.css";
import React, { useState } from "react";

export default function Unit(props) {
  let [metric, useMetric] = useState("celsium");

  function ShowToFar(event) {
    event.preventDefault();
    useMetric("farenheit");
  }

  function ShowToCel(event) {
    event.preventDefault();
    useMetric("celsium");
  }

  if (metric === "celsium") {
    return (
      <div>
        <span className="temperature">
          <span className="valueOfTemp">{Math.round(props.celsium)}</span>°
        </span>
        C |{" "}
        <a href="/" className="degreeF" onClick={ShowToFar}>
          F
        </a>{" "}
      </div>
    );
  } else {
    let farenheit = (props.celsium * 9) / 5 + 32;
    return (
      <div>
        <span className="temperature">
          <span className="valueOfTemp">{Math.round(farenheit)}</span>°
        </span>
        <a href="/" className="degreeF" onClick={ShowToCel}>
          C{" "}
        </a>
        | F
      </div>
    );
  }
}
