import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Routes";
import { Neo4jProvider, createDriver } from "use-neo4j";

const driver = createDriver("bolt", "localhost", 7687, "neo4j", "123");

ReactDOM.render(
  <Neo4jProvider driver={driver}>
    <Routes />
  </Neo4jProvider>,
  document.getElementById("root")
);
