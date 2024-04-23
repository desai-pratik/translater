import React, { useState } from "react";
import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import WordsTranslate from "./components/WordsTranslate";
import About from "./components/About";
import ReactDOM from "react-dom/client";

const App = () => {
  const [mode, setmode] = useState("light");
  const [alert, setalert] = useState(null);
  
  const [mystyle, setmystyle] = useState({
    color: "black",
    backgroundColor: "white",
  });
  const showalert = (message, type) => {
    setalert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  };
  let enable = () => {
    if (mystyle.color === "white") {
      setmystyle({
        color: "black",
        backgroundColor: "white",
      });
      showalert(" light mode", "success ");
      setmode("light");
    } else {
      setmystyle({
        color: "white",
        backgroundColor: "black",
      });
      showalert(" Dark mode", "success ");
      setmode("dark");
    }
  };

  return (
    <div>
      <Navbar
        title="Translater"
        aboutText="About us"
        toggelstyle={enable}
        mode={mode}
      />
      <Outlet />
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