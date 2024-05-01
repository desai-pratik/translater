//hooks
import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");

  const handalupperclick = () => {
    setText(text.toUpperCase());
    props.showalert("convert to uppercase", "success");
  };

  const handalowerclick = () => {
    setText(text.toLowerCase());
    props.showalert("convert to lowercase", "success");
  };

  const clearclick = () => {
    setText("");
    props.showalert("Text Clare", "success");
  };

  const henddalonchange = (event) => {
    setText(event.target.value);
  };

  const copytext = () => {
    var text = document.getElementById("mybox");
    navigator.clipboard.writeText(text.value);
    props.showalert("copy text", "success");
  };

  const removespace = () => {
    var newtext = text.split(/[ ]+/);
    setText(newtext.join(" "));
    props.showalert("Remove space", "success");
  };

  return (
    <>
      <div className="container vh-100 mt-5 ">
        <h3>{props.heading}</h3>
        <div className="d-flex mb-3 gap-3">
          <textarea
            className="form-control"
            id="mybox"
            placeholder="Enter Your Text."
            rows="8"
            value={text}
            onChange={henddalonchange} 
          ></textarea> 
        </div>
       <div className="d-flex gap-2">
       <button onClick={handalupperclick} className="btn btn-primary w-100">
          uppercase
        </button>
        <button onClick={handalowerclick} className="btn btn-primary w-100">
          lowercase
        </button>
        <button onClick={clearclick} className="btn btn-primary w-100">
          clear
        </button>
        <button onClick={copytext} className="btn btn-primary w-100">
          copy text
        </button>
        <button onClick={removespace} className="btn btn-primary w-100">
          remove extra space
        </button>
       </div>
        <h5 className="mt-5">Your Text Summary</h5>
        <p>
          {text.split(" ").length} words and {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").length} minutes read</p> 
      </div>
    </>
  );
}
