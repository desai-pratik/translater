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

  const titleCase = () => {
    const words = text.toLowerCase().split(" ");
    const titleCaseWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    setText(titleCaseWords.join(" "));
    props.showalert("Converted to Title Case", "success");
  };

  const speak = () => {
    let msg = new SpeechSynthesisUtterance(); 
    msg.lang='eng';
    msg.text= text;
    window.speechSynthesis.speak(msg);
  };

  const readTxt = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function (event) {
      setText(event.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <>
      <div className="container mt-5 ">
        <div className="d-flex align-items-end justify-content-between">
          <h3>{props.heading}</h3>
          <input
            type="file"
            className="btn btn-secondary "
            accept="text/plain"
            onChange={readTxt}
          />
        </div>
        <div className="d-flex mb-3 gap-3">
          <textarea
            className="form-control"
            id="mybox"
            placeholder="Enter Your Text."
            rows="8"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className="d-flex gap-2">
          <button onClick={handalupperclick} className="btn btn-primary w-100">
            Upper Case
          </button>
          <button onClick={handalowerclick} className="btn btn-primary w-100">
            Lower Case
          </button>
          <button onClick={titleCase} className="btn btn-primary w-100">
            Title Case
          </button>
          <button onClick={clearclick} className="btn btn-primary w-100">
            Clear
          </button>
          <button onClick={copytext} className="btn btn-primary w-100">
            Copy Text
          </button>
          <button onClick={removespace} className="btn btn-primary w-100">
            Remove Space
          </button>
          <button onClick={speak} className="btn btn-primary w-100">
            Speak
          </button>
        </div>
        <h5 className="mt-5">Your Text Summary</h5>
        <p>
          {text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} minutes read</p>
      </div>
    </>
  );
}
