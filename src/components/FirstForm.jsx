import { ArrowRight } from "lucide-react";
import QrCode from "../assets/images/qrcode.svg";

const FirstForm = () => {
  return (
    <div>
      <div className="bg-transparent">
        <div className="h-[100vh] mt-[84px] w-full flex justify-center items-center bg-cover bg-no-repeat">
          <div className="flex flex-col gap-4 justify-center items-center my-auto w-full h-full py-8">
            <img src={QrCode} alt="LOGO VGCorp" className="w-[93px] h-[93px]" />
            <span className="text-[18px] font-semibold text-center px-8">
              Vui lòng quét mã QR của khách hàng để thực hiện check-in
            </span>

            <button
              type="submit"
              className="btn-buy flex justify-center items-baseline gap-1 px-8 py-2 rounded-lg"
            >
              <span className="uppercase font-semibold text-white">
                Bắt đầu quét
              </span>
              <ArrowRight className="w-[13px] h-[12px] text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstForm;
