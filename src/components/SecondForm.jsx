import { ArrowRight } from "lucide-react";

const SecondForm = () => {
  return (
    <div>
      <div className="bg-transparent">
        <div className="h-[100vh] mt-[84px] w-full flex justify-center items-center bg-cover bg-no-repeat">
          <div className="flex flex-col p-8 gap-4 justify-center items-center my-auto w-full h-full py-8">
            <span className="text-[18px] font-semibold text-center px-8 uppercase">
              Thông tin khách hàng
            </span>
            <div className="w-[345px] h-12 flex justify-start gap-2 items-center bg-white border border-[#ccc] shadow-md rounded-md">
              <span className="text-[#ccc] pl-3">Chủ thẻ:</span>
              <input type="text" name="" className="outline-none flex-1 pr-3" />
            </div>
            <div className="w-[345px] h-12 flex justify-start gap-2 items-center bg-white border border-[#ccc] shadow-md rounded-md">
              <span className="text-[#ccc] pl-3">Mã thẻ:</span>
              <input type="text" name="" className="outline-none flex-1 pr-3" />
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
            <span>Mã OTP đã được gửi về ứng dụng vHandicap của khách hàng</span>

            <button
              type="submit"
              className="flex btn-buy justify-center items-baseline gap-1 px-8 py-2 bg-gray-600 rounded-lg"
            >
              <span className="uppercase font-semibold text-white">
                Xác nhận
              </span>
              <ArrowRight className="w-[13px] h-[12px] text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondForm;
