import React, { useEffect, useState } from "react";

export default function About() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("gu");
  const [inputLanguage, setInputLanguage] = useState("en");
  const [language, setLanguage] = useState([]);
  const [inputfirstLanguage, setInputfirstLanguage] = useState("");

  useEffect(() => {
    const fetchLanguages = async () => {
      const response = await fetch(
        "https://thingproxy.freeboard.io/fetch/https://en.wikipedia.org/w/api.php?action=query&meta=siteinfo&siprop=languages&format=json"
      );
      const data = await response.json();
      const langList = data.query.languages;
      setLanguage(langList);
    };
    fetchLanguages();
  }, []);

  // translet button click
  const translateText = async () => {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=${inputLanguage}|${selectedLanguage}`
    );
    const data = await response.json();
    setTranslatedText(data.responseData.translatedText);
  };
  // input type
  const typeInput = async (e) => {
    setText(e.target.value);
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=en|${inputLanguage}`
    );
    const data = await response.json();
    if (inputLanguage !== "en") {
      setInputfirstLanguage(data.responseData.translatedText);
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

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex mb-3 gap-3">
          <select
            className="form-select"
            value={inputLanguage}
            onChange={(e) => setInputLanguage(e.target.value)}
          >
            <option value="en">English</option>
            {language.map((language, index) => (
              <option key={index} value={language.code}>
                {language["*"]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={replaceLanguage}
            class="btn btn-outline-secondary opacity-75"
          >
            <i class="bi bi-arrow-left-right"></i>{" "}
          </button>
          <select
            className="form-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="gu"> ગુજરાતી </option>
            {language.map((language, index) => (
              <option key={index} value={language.code}>
                {language["*"]}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex mb-3 gap-3">
          <textarea
            className="form-control "
            placeholder="Enter Text."
            rows="8"
            value={text}
            onChange={typeInput}
          ></textarea>

          <textarea
            disabled
            className="form-control"
            placeholder="Translation"
            rows="9"
            value={translatedText}
          ></textarea>
        </div>

        <span onClick={clicksuggection} className="curser-pointer">
          {inputfirstLanguage}
        </span>

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
