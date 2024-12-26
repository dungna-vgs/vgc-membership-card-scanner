import useScanning from "@/hooks/useScanning";
import QrCode from "@/assets/images/qrcode.png";
import ArrowIcon from "@/assets/icons/arrow-ic.svg?react";

const FirstStep = () => {
  const { setStep } = useScanning();

  return (
    <div className="flex flex-col gap-6 justify-center items-center my-auto w-full h-full">
      <img src={QrCode} alt="LOGO VGCorp" className="w-[93px] h-[93px]" />
      {/* <QrCode /> */}
      <span className="text-lg font-semibold text-center w-60">
        Vui lòng quét mã QR của khách hàng để thực hiện check-in
      </span>

      <button onClick={() => setStep(2)} className="btn-buy">
        <span>Bắt đầu quét</span>
        <ArrowIcon />
      </button>
    </div>
  );
};

export default FirstStep;
