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
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const fileName = name.trim() !== "" ? `${name}-QR-CODE.png` : "QR-CODE.png";
      link.href = url;
      link.download = fileName;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          QR Code Generator
        </h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name (optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Susan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL
            </label>
            <input
              type="text"
              placeholder="Enter a URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Generate QR Code
          </button>
        </div>

        {showQR && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-center p-6 bg-gray-50 rounded-lg" ref={qrRef}>
              <QRCodeCanvas value={url} size={256} />
            </div>
            
            <button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-3 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
