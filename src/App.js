import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Textform from "./components/Textform";
import Alert from "./components/Alert";
// import About from "./components/About";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// light mode fave icon
document.title = "pratik - light Mode";

function App() {
  // header
  const [mode, setmode] = useState("light");

  // body
  const [mystyle, setmystyle] = useState({
    color: "black",
    backgroundColor: "white",
  });

  let enable = () => {
    if (mystyle.color === "white") {
      setmystyle({
        color: "black",
        backgroundColor: "white",
      });
      showalert(" light mode", "success ");
      setmode("light");

      document.title = "pratik - light Mode";
    } else {
      setmystyle({
        color: "white",
        backgroundColor: "black",
      });
      showalert(" Dark mode", "success ");
      setmode("dark");

      document.title = "pratik - Dark Mode";
    }
  };
  // alert
  const [alert, setalert] = useState(null);

  const showalert = (message, type) => {
    setalert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  };
  return (
    <>
      <div className="pppp" style={mystyle}>
        <Navbar
          title="Translater"
          aboutText="About us"
          toggelstyle={enable}
          mode={mode}
        />
        <Alert alert={alert} />
        <Textform showalert={showalert} heading="Translate Form" mode={mode} />
      </div>
    </>
  );
}
export default App;
