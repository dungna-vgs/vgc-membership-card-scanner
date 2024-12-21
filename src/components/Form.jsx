import React from "react";
import { ArrowRight } from "lucide-react";
import QrCode from "../assets/images/qrcode.svg";
import Checkin from "../assets/images/checkin.svg";

const FormAction = () => {
  const [formStep, setFormStep] = React.useState(0);
  const completeFormStep = () => {
    setFormStep((cur) => cur + 1);
  };
  const renderButton = () => {
    if (formStep >= 3) {
      return (
        <section>
          <div className="flex flex-col p-8 gap-4 justify-center items-center my-auto w-full h-full py-8">
            <img
              src={Checkin}
              alt="Checkin Success"
              className="w-[180px] h-[148px]"
            />
            <h1 className="text-[24px] font-bold">Check-in thành công!</h1>
            <span>Bạn đã thực hiện check-in cho khách hàng thành công!</span>
            <a
              href="/form"
              className="flex btn-buy justify-center items-baseline gap-1 px-8 py-2 bg-gray-600 rounded-lg"
            >
              <span className="uppercase font-semibold text-white">
                Trang chủ
              </span>
            </a>
          </div>
        </section>
      );
    } else {
      // return (
      //   <button
      //     onClick={completeFormStep}
      //     type="button"
      //     className="mt-6 btn-buy text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
      //   >
      //     Next Step
      //   </button>
      // );
      return undefined;
    }
  };
  return (
    <div className="bg-transparent">
      <div className="px-16 py-10">
        <form>
          {formStep === 0 && (
            <section>
              <div className="flex flex-col gap-4 justify-center items-center my-auto w-full h-full py-8">
                <img
                  src={QrCode}
                  alt="LOGO VGCorp"
                  className="w-[93px] h-[93px]"
                />
                <span className="text-[18px] font-semibold text-center px-8">
                  Vui lòng quét mã QR của khách hàng để thực hiện check-in
                </span>

                <button
                  onClick={completeFormStep}
                  type="button"
                  className="btn-buy flex justify-center items-baseline gap-1 px-8 py-2 rounded-lg"
                >
                  <span className="uppercase font-semibold text-white">
                    Bắt đầu quét
                  </span>
                  <ArrowRight className="w-[13px] h-[12px] text-white" />
                </button>
              </div>
            </section>
          )}
          {formStep === 1 && (
            <div>
              <button
                onClick={completeFormStep}
                type="button"
                className="mt-6 btn-buy text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            </div>
          )}
          {formStep === 2 && (
            <section>
              <div className="flex flex-col p-8 gap-4 justify-center items-center my-auto w-full h-full py-8">
                <span className="text-[18px] font-semibold text-center px-8 uppercase">
                  Thông tin khách hàng
                </span>
                <div className="w-[345px] h-12 flex justify-start gap-2 items-center bg-white border border-[#ccc] shadow-md rounded-md">
                  <span className="text-[#ccc] pl-3">Chủ thẻ:</span>
                  <input
                    type="text"
                    name=""
                    className="outline-none flex-1 pr-3"
                  />
                </div>
                <div className="w-[345px] h-12 flex justify-start gap-2 items-center bg-white border border-[#ccc] shadow-md rounded-md">
                  <span className="text-[#ccc] pl-3">Mã thẻ:</span>
                  <input
                    type="text"
                    name=""
                    className="outline-none flex-1 pr-3"
                  />
                </div>
                <div className="w-[345px] h-12 flex justify-between gap-2 items-center bg-white border border-[#ccc] shadow-md rounded-md">
                  <span className="text-[#ccc] pl-3">Mã OTP:</span>
                  <input
                    type="text"
                    name=""
                    required
                    className="flex-1 outline-none"
                  />
                  <button className="text-green-500 pr-3">Gửi lại</button>
                </div>
                <span>
                  Mã OTP đã được gửi về ứng dụng vHandicap của khách hàng
                </span>

                <button
                  onClick={completeFormStep}
                  type="button"
                  className="btn-buy flex justify-center items-baseline gap-1 px-8 py-2 rounded-lg"
                >
                  <span className="uppercase font-semibold text-white">
                    Xác nhận
                  </span>
                  <ArrowRight className="w-[13px] h-[12px] text-white" />
                </button>
              </div>
            </section>
          )}
          {renderButton()}
        </form>
      </div>
    </div>
  );
};

export default FormAction;
