import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css";

export default function App() {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef(null);

  const handleGenerate = () => {
    if (url.trim() !== "") {
      setShowQR(true);
    } else {
      setShowQR(false);
    }
  };

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const fileName = name.trim() !== "" ? `${name}-QR-CODE.png` : "QR-CODE.png";
      link.href = dataUrl;
      link.download = fileName;
      link.click();
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">QR Code Generator</h1>
        
        <div className="input-group">
          <label className="label">Name (optional)</label>
          <input
            type="text"
            placeholder="e.g., Susan"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
        </div>

        <div className="input-group">
          <label className="label">URL</label>
          <input
            type="text"
            placeholder="Enter a URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input"
          />
        </div>

        <button onClick={handleGenerate} className="button">
          Generate QR Code
        </button>

        {showQR && (
          <div>
            <div className="qr-container" ref={qrRef}>
              <div className="qr-wrapper">
                <QRCodeCanvas value={url} size={256} />
              </div>
            </div>
            
            <button onClick={handleDownload} className="button button-download">
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
