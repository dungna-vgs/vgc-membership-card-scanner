import { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const BarcodeScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    if (scanning) {
      startScanning();
    } else {
      stopScanning();
    }
    return () => stopScanning();
  }, [scanning]);

  const startScanning = () => {
    codeReader.current.decodeFromVideoDevice(
      null,
      videoRef.current,
      (result, err) => {
        if (result) {
          setResult(result.getText());
          setScanning(false);
        }
        if (err && !(err.name === "NotFoundException")) {
          console.error(err);
        }
      }
    );
  };

  const stopScanning = () => {
    codeReader.current.reset();
    const stream = videoRef.current?.srcObject;
    const tracks = stream?.getTracks();

    if (tracks) {
      tracks.forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleClick = () => {
    setResult(null);
    setScanning(true);
  };

  return (
    <div className=" flex justify-center flex-col-reverse gap-4">
      <button
        onClick={handleClick}
        className="px-8 py-4 bg-green-500 uppercase rounded-lg font-semibold text-white"
      >
        Bắt đầu quét
      </button>
      {scanning && (
        <div className="flex justify-center items-center flex-col gap-4 ">
          <video
            ref={videoRef}
            width="350"
            height="250"
            style={{ border: "1px solid black" }}
          />
          <a href="/qr" className="w-full">
            <button className="px-8 py-4 bg-red-500 w-full rounded-lg uppercase text-white font-semibold">
              HUỶ
            </button>
          </a>
        </div>
      )}

      {result && (
        <div>
          <h3>Scanned Result: </h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
