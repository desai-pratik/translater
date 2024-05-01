import React, { useState } from "react";
import "./App.css";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import WordsTranslate from "./components/WordsTranslate";
import About from "./components/About";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  const [mode, setmode] = useState("light"); 
  
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
      setmode("light");
    } else {
      setmystyle({
        color: "white",
        backgroundColor: "black",
      });
      setmode("dark");
    }
  };

  return (
    <div className={`bg-${mode} text-${mystyle.color}`} >
      <Navbar
        title="Translater"
        toggelstyle={enable}
        mode={mode}
      />
      <Outlet/>
    </div>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        path: "/",
        element: <About />,
      },
      {
        path: "/words-translate",
        element: <WordsTranslate />,
      }, 
    ],
  },
]);