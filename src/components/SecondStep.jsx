import { useRef, useEffect, memo, useCallback, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import useScanning from "@/hooks/useScanning";
import useLoading from "@/hooks/useLoading";
import { apiSendOTP } from "@/api";
import { HTTP_STATUS_CODE } from "@/constants";

const SecondStep = () => {
  const qrCodeRef = useRef(null);
  const scannerRef = useRef(null);
  const { setLoading } = useLoading();
  const { setStep, setCardInfo } = useScanning();
  const [error, setError] = useState("");

  const handleResult = useCallback(
    async (decodedText) => {
      if (!/\d{9}/.test(decodedText)) {
        return alert("Mã QR không hợp lệ. Vui lòng thử lại!");
      }
      setLoading(true);
      const response = await apiSendOTP({ card_number: decodedText });
      if (response.status === HTTP_STATUS_CODE.OK) {
        const { error_code, data, message } = response.data;
        if (error_code === HTTP_STATUS_CODE.OK) {
          setError("");
          setCardInfo(data);
          setStep(3);
        } else {
          setError(message);
          scannerRef?.current?.resume();
        }
      }
      setLoading(false);
    },
    [setCardInfo, setLoading, setStep]
  );

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-code-container");
    scannerRef.current = scanner;

    const startScanning = async () => {
      try {
        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            console.log("QR Code detected:", decodedText);
            handleResult(decodedText);
            if (scanner.isScanning) {
              scanner
                .pause()
                .catch((err) => console.error("Error pausing scanner:", err));
            }
          },
          (errorMessage) => {
            console.warn("QR Code scan error:", errorMessage);
          }
        );
      } catch (error) {
        console.error("Error starting QR Code scanner:", error);
      }
    };

    startScanning();

    return () => {
      if (scanner.isScanning) {
        scanner
          .stop()
          .catch((err) => console.error("Error stopping scanner:", err));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full w-full flex justify-center items-center relative z-0 flex-col">
      <div
        id="qr-code-container"
        ref={qrCodeRef}
        className="w-72 h-72 bg-black"
      />
      <div className="absolute inset-0 bg-black/50 -z-[1]" />
      <div className="flex flex-col justify-center items-center gap-4 absolute bottom-12">
        {error && (
          <p className="text-yellow-300 text-sm text-center">{error}</p>
        )}
        <button onClick={() => setStep(1)} className="btn-buy">
          <span>Hủy</span>
        </button>
      </div>
    </div>
  );
};

export default memo(SecondStep);
