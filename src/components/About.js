import React, { useEffect, useState } from "react";
import Alert from "./Alert";

export default function About(props) {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("gu");
  const [inputLanguage, setInputLanguage] = useState("en");
  const [language, setLanguage] = useState([]);
  const [inputfirstLanguage, setInputfirstLanguage] = useState("");
  const [alert, setalert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "AIzaSyCV6g5mtMKjpf5NWdfkYhLRHBHqSV6Qq8c";
        const url = `https://translation.googleapis.com/language/translate/v2/languages?key=${apiKey}&target=en`;
        const response = await fetch(url);
        const data = await response.json();
        setLanguage(data.data.languages);
        setLoading(false);
      } catch (error) {
        showalert(" Something is Wrong, Please Check Your Network.", "danger");
      }
    };
    fetchData();
  }, []);

  // translet button click
  const translateText = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${text}&langpair=${inputLanguage}|${selectedLanguage}`
      );
      const data = await response.json();
      setTranslatedText(data.responseData.translatedText);
      setLoading(false);
    } catch (error) {
      showalert(" Something is Wrong, Please Check Your Network.", "danger");
    }
  };

  // get input suggetion
  const typeInput = async (e) => {
    try {
      setText(e.target.value);
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${e.target.value}&langpair=en|${inputLanguage}`
      );
      const data = await response.json();
      setInputfirstLanguage(data.responseData.translatedText);
    } catch (error) {
      showalert(" Something is Wrong, Please Check Your Network.", "danger");
    }
  };

  // click suggection
  const clicksuggection = () => {
    setText(inputfirstLanguage);
    setInputfirstLanguage("");
  };

  // replace Language click button
  const replaceLanguage = () => {
    setSelectedLanguage(inputLanguage);
    setInputLanguage(selectedLanguage);
    setText(translatedText);
    setTranslatedText(text);
  };

  // copy text
  const copytext = (text) => {
    navigator.clipboard.writeText(text);
    showalert("copy text", "success");
  };

  // show alert
  const showalert = (message, type) => {
    setalert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  };

  // speaker fanctionality
  const speak = (sms) => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = sms;
    msg.lang = "eng";
    window.speechSynthesis.speak(msg);
  };

  return loading ? (
    <div>
      <Alert alert={alert} />
      <h6 className="vh-100 mt-4 text-center">Loading...</h6>
    </div>
  ) : (
    <>
      <Alert alert={alert} />
      <div className="container " style={{ marginTop: "70px" }}>
        <div className="d-flex mb-3 gap-3">
          <select
            className="form-select"
            value={inputLanguage}
            onChange={(e) => setInputLanguage(e.target.value)}
          >
            <option value="en">English</option>
            {language &&
              language.map((language) => (
                <option key={language.language} value={language.language}>
                  {language.name}
                </option>
              ))}
          </select>
          <button
            type="button"
            onClick={replaceLanguage}
            className="btn btn-outline-secondary opacity-75"
          >
            <i className="bi bi-arrow-left-right"></i>
          </button>
          <select
            className="form-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="gu"> Gujarati </option>
            {language &&
              language.map((language) => (
                <option key={language.language} value={language.language}>
                  {language.name}
                </option>
              ))}
          </select>
        </div>

        <div className="row mb-3">
          <div className="col-sm-6 position-relative">
            <textarea
              className="form-control "
              placeholder="Enter Text."
              rows="8"
              value={text}
              onChange={typeInput}
            ></textarea>
            {inputLanguage !== "en" && (
              <span
                onClick={clicksuggection}
                className="pointer position-absolute border px-4 bottom-0"
              >
                {inputfirstLanguage}
              </span>
            )}
            <button
              onClick={() => copytext(text)}
              className="btn position-absolute  bottom-0 end-0 mb-2 me-3"
            >
              <i className="bi bi-copy"></i>
            </button>
            <button
              onClick={() => speak(text)}
              className="btn position-absolute bottom-0 p-1"
            >
              <i className="bi bi-volume-up fs-5"></i>
            </button>
          </div>
          <div className="col-sm-6 position-relative">
            <textarea
              disabled
              className="form-control"
              placeholder="Translation"
              rows="8"
              value={translatedText}
            ></textarea>
            <button
              onClick={() => copytext(translatedText)}
              className="btn position-absolute bottom-0 end-0 mb-2 me-3"
            >
              <i className="bi bi-copy"></i>
            </button>
            <button
              onClick={() => speak(translatedText)}
              className="btn position-absolute bottom-0 p-1"
            >
              <i className="bi bi-volume-up fs-5"></i>
            </button>
          </div>
        </div>

        <button
          onClick={translateText}
          className="btn btn-outline-primary w-100 mb-5"
        >
          Translate
        </button>
      </div>
    </>
  );
}
