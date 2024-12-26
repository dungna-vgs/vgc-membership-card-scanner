import useScanning from "@/hooks/useScanning";
import CheckinIcon from "@/assets/icons/success-ic.svg?react";

const SuccessScreen = () => {
  const { setStep, setCardInfo } = useScanning();

  const handleFinish = () => {
    setStep(1);
    setCardInfo(null);
  };

  return (
    <div className="flex flex-col items-center my-auto w-full h-fit px-2 text-center">
      <CheckinIcon className="w-[180px] h-[148px] mb-6" />
      <h1 className="font-bold text-2xl mb-2.5">Check-in thành công!</h1>
      <span className="text-base font-medium text-[#868686]">
        Bạn đã thực hiện check-in cho khách hàng thành công!
      </span>
      <button onClick={handleFinish} className="btn-buy mt-14">
        <span>Trang chủ</span>
      </button>
    </div>
  );
};

export default SuccessScreen;
