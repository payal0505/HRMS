import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AuthContext from './context/authContext'

ReactDOM.createRoot(document.getElementById("root")).render(
 
  <AuthContext>
    <App />
  </AuthContext>
 
)
