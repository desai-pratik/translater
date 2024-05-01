import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <>
      <nav
        className={`navbar border-bottom navbar-expand-md navbar-${props.mode} bg-${props.mode}`}
      >
        <div className="container-fluid px-5">
          <Link className="navbar-brand" to="/">
            {props.title}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item mx-2">
                <Link className=" nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className=" nav-link" to="/words-translate">
                  Words
                </Link>
              </li>
            </ul>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                onChange={props.toggelstyle}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
