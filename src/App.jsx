import React, { useState } from "react";
import EnglishPresentation from "./presentations/English";
import RussianPresentation from "./presentations/Russian";

export default function App() {
  const [lang, setLang] = useState(null);

  if (!lang) {
    return (
      <div className="centered" style={{ position: 'relative' }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "#FFFFFF", fontWeight: 400, marginBottom: 20 }}>Choose language</h1>
          <div className="lang-buttons">
            <button className="btn btn--primary" onClick={() => setLang('en')}>english</button>
            <button className="btn btn--secondary" onClick={() => setLang('ru')}>russian</button>
          </div>
        </div>

        <button
          onClick={() => setLang('en')}
          aria-label="Full English version"
          style={{
            position: 'fixed',
            left: '6%',
            bottom: '10%',
            padding: '6px 10px',
            fontSize: 12,
            borderRadius: 8,
            background: 'transparent',
            color: 'rgba(255,255,255,0.75)',
            border: '1px solid rgba(255,255,255,0.06)',
            opacity: 0.8,
            cursor: 'pointer'
          }}
        >
          full english version
        </button>
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
