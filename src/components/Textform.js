//hooks
import React, { useState } from "react";
export default function TextForm(props) {
  const handalupperclick = () => {
    const newtext = text.toUpperCase();
    setText(newtext);
    props.showalert('convert to uppercase', "success" )
  };

  const handalowerclick = () => {
    const newtext = text.toLowerCase();
    setText(newtext);
    props.showalert('convert to lowercase', "success" )
  };

  const clearclick = () => { 
    setText("");
    props.showalert('Text Clare', "success" )
  };

  const henddalonchange = (event) => {
    setText(event.target.value);
  };

  const copytext = () => {
    var text  = document.getElementById("mybox")
    navigator.clipboard.writeText(text.value) 
    props.showalert('copy text', "success")
  };

  const removespace = () => {
    var newtext  = text.split(/[ ]+/);
    setText(newtext.join(" "))
    props.showalert('Remove space', "success")
  };

  const [text, setText] = useState(" ");
  return (
    <>
      <div className="form-floating container mt-5 mb-3">
        <h3>{props.heading}</h3>
        <div className="form-floating">
          <textarea
            className="form-control mb-3" 
            id="mybox"
            value={text}
            onChange={henddalonchange}
            style={{backgroundColor: props.mode === 'light' ? 'white': 'black' ,color: props.mode === 'light' ? 'black': 'white'}}
          ></textarea>
        </div>
        <button onClick={handalupperclick} className="btn btn-primary mx-2">
          uppercase
        </button>
        <button onClick={handalowerclick} className="btn btn-primary mx-2">
          lowercase
        </button>
        <button onClick={clearclick} className="btn btn-primary mx-2">
        clear
        </button>
        <button onClick={copytext} className="btn btn-primary mx-2">
        copy text
        </button>
        <button onClick={removespace} className="btn btn-primary mx-2">
        remove extra space
        </button>
      </div>
      <div className="container">
        <h3>Your Text summary</h3>
        <p>{text.split(" ").length-2} words and {text.length} characters</p>
        <p>{0.008 * text.split(" ").length} minutes read</p>
        <h4>priview</h4>
        <p>{text}</p>
        <hr /> <hr />
      </div>
    </>
  );
}