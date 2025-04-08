import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css"; // Import CSS styles

export default function App() {
  const [url, setUrl] = useState("");
  const [showQR, setShowQR] = useState(false);

  const handleGenerate = () => {
    if (url.trim() !== "") {
      setShowQR(true);
    } else {
      setShowQR(false);
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">QR Code Generator</h1>
        <input
          type="text"
          placeholder="Enter a URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input"
        />
        <button onClick={handleGenerate} className="button">
          Generate QR Code
        </button>

        {showQR && (
          <div className="qr-container">
            <QRCodeCanvas value={url} size={256} />
          </div>
        )}
      </div>
    </div>
  );
}
