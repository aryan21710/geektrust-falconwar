
import React from "react";
import ReactDOM from "react-dom";
import "./styles/base/index.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import Approutes from "./routers/Approutes.js";
// import reduxStore from "./redux/store/store.js";
// import { Provider } from "react-redux";


const output = (
    <Approutes />
);

ReactDOM.render(output, document.getElementById("root"));