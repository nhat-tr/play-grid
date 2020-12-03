import React from "react";
import "./App.css";
import { GridWrapper } from "./GridWrapper";

function App() {
  return (
    <div className="App">
      <GridWrapper columnCount={40} rowCount={50} oldVersion={true} />
    </div>
  );
}

export default App;
