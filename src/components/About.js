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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "AIzaSyCV6g5mtMKjpf5NWdfkYhLRHBHqSV6Qq8c";
        const url = `https://translation.googleapis.com/language/translate/v2/languages?key=${apiKey}&target=en`;
        const response = await fetch(url);
        const data = await response.json();
        setLanguage(data.data.languages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // translet button click
  const translateText = async () => {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=${inputLanguage}|${selectedLanguage}`
    );
    const data = await response.json();
    setTranslatedText(data.responseData.translatedText);
  };

  // get input suggetion
  const typeInput = async (e) => {
    setText(e.target.value);
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${e.target.value}&langpair=en|${inputLanguage}`
    );
    const data = await response.json();
    setInputfirstLanguage(data.responseData.translatedText);
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

  return (
    <>
      <Alert alert={alert} />
      <div className="container" style={{ marginTop: "70px" }}>
        <div className="d-flex mb-3 gap-3">
          <select
            className="form-select"
            value={inputLanguage}
            onChange={(e) => setInputLanguage(e.target.value)}
          >
            <option value="en">English</option>
            {language.map((language) => (
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
            {language.map((language) => (
              <option key={language.language} value={language.language}>
                {language.name}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex mb-3 gap-3">
          <div className="w-100 position-relative">
            <textarea
              className="form-control "
              placeholder="Enter Text."
              rows="8"
              value={text}
              onChange={typeInput}
            ></textarea>
            {inputLanguage !== "en" && (
              <span onClick={clicksuggection} className="pointer position-absolute border px-4 bottom-0">
                {inputfirstLanguage}
              </span>
            )}
            <button
              onClick={() => copytext(text)}
              className="btn position-absolute  bottom-0 end-0 mb-2"
            >
              <i className="bi bi-copy"></i>
            </button>
          </div>
          <div className="w-100 position-relative">
            <textarea
              disabled
              className="form-control"
              placeholder="Translation"
              rows="8"
              value={translatedText}
            ></textarea>
            <button
              onClick={() => copytext(translatedText)}
              className="btn position-absolute  bottom-0 end-0 mb-2"
            >
              <i className="bi bi-copy"></i>
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
