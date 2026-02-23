import React, { useState } from "react";
import EnglishPresentation from "./presentations/English";
import RussianPresentation from "./presentations/Russian";

export default function App() {
  const [lang, setLang] = useState(null);

  if (!lang) {
    return (
      <div className="centered">
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "#FFFFFF", fontWeight: 400, marginBottom: 20 }}>Choose language</h1>
          <div className="lang-buttons">
            <button className="btn btn--primary" onClick={() => setLang('en')}>english</button>
            <button className="btn btn--secondary" onClick={() => setLang('ru')}>russian</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <button className="back btn btn--secondary" onClick={() => setLang(null)}>back</button>
      {lang === 'en' ? <EnglishPresentation /> : <RussianPresentation />}
    </div>
  );
}
