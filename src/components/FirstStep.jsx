import { ArrowRight } from "lucide-react";
import QrCode from "../assets/images/qrcode.svg";
import useScanning from "@/hooks/useScanning";

const FirstStep = () => {
  const { setStep } = useScanning();

  return (
    <div className="flex flex-col gap-6 justify-center items-center my-auto w-full h-full">
      <img src={QrCode} alt="LOGO VGCorp" className="w-[93px] h-[93px]" />
      <span className="text-lg font-semibold text-center w-60">
        Vui lòng quét mã QR của khách hàng để thực hiện check-in
      </span>

      <button onClick={() => setStep(2)} className="btn-buy">
        <span>Bắt đầu quét</span>
        <ArrowRight className="w-[13px] h-[12px] text-white" />
      </button>
    </div>
  );
};

export default FirstStep;
