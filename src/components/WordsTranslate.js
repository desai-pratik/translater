import React, { useState } from "react";
import Alert from "./Alert";
import TextForm from "./Textform";

const WordsTranslate = () => { 
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
    <div>
      <Alert alert={alert} />
      <TextForm showalert={showalert} heading="Translate Form" />
    </div>
  );
};

export default WordsTranslate;
