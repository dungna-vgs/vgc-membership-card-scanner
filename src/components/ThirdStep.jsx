import { apiCheckin, apiGetTicket, apiSendOTP, apiVerifyOTP } from "@/api";
import { HTTP_STATUS_CODE } from "@/constants";
import useErrorModal from '@/hooks/useErrorModal';
import useLoading from "@/hooks/useLoading";
import useScanning from "@/hooks/useScanning";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const ThirdStep = () => {
  const { cardInfo, setStep } = useScanning();
  const { loading, setLoading } = useLoading();
  const { openModal } = useErrorModal();
  const [otp, setOtp] = useState("");

  if (!cardInfo) return null;

  const { id, card_number, user } = cardInfo;

  const handleResendOtp = async () => {
    setLoading(true);
    const response = await apiSendOTP({ card_number });
    if (response.status === HTTP_STATUS_CODE.OK) {
      const { error_code, message } = response.data;
      if (!error_code === HTTP_STATUS_CODE.OK) {
        openModal(message);
      }
    }
    setOtp("");
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    const response = await apiVerifyOTP({ card_number, otp });

    if (response.status === HTTP_STATUS_CODE.OK) {
      const { error_code, message } = response.data;

      if (error_code === HTTP_STATUS_CODE.OK) {
        const payload = { card_number };

        const ticketResponse = await apiGetTicket({
          paginate: false,
          is_pending: true,
          user_id: user.id,
          card_id: id,
        });

        if (ticketResponse.status === HTTP_STATUS_CODE.OK) {
          const data = ticketResponse.data?.data?.data;

          if (Array.isArray(data) && data.length > 0) {
            payload.ticket_id = data[0].id;
          }
        }

        await handleCheckin(payload);
      } else {
        openModal(message);
      }
    }
    setLoading(false);
  };

  const handleCheckin = async (payload) => {
    const response = await apiCheckin(payload);

    if (response.status === HTTP_STATUS_CODE.OK) {
      const { error_code, message } = response.data;

      if (error_code === HTTP_STATUS_CODE.FULFILLED) {
        setStep(4);
      } else {
        openModal(message);
      }
    }
  };

  return (
    <div>
      <div className="bg-transparent">
        <div className="h-screen mt-20 w-full flex justify-center items-center bg-cover bg-no-repeat">
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
                value={user ? `${user.fullname} - VGA${user.id_display}` : null}
                readOnly
              />
            </div>
            <div className="w-[345px] h-12 flex justify-start gap-2 items-center bg-white border border-[#ccc] shadow-md rounded-md">
            <span className="text-[#ccc] pl-3">Mã thẻ:</span>
              <input
                type="text"
                name=""
                className="outline-none flex-1 pr-3"
                value={card_number}
                readOnly
              />
            </div>
            <div className="w-[345px] h-12 flex justify-start gap-2 items-center bg-white border border-[#ccc] shadow-md rounded-md">
            <span className="text-[#ccc] pl-3 whitespace-nowrap">Mã OTP:</span>
              <input
                type="text"
                name="otp"
                required
                className="w-full outline-none pr-3"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={handleResendOtp} className="text-green-500 p-2 whitespace-nowrap">
                Gửi lại
              </button>
            </div>
            <span className='text-xs'>Mã OTP đã được gửi về ứng dụng vHandicap của khách hàng</span>

            <div className='flex gap-6'>
              <button
                onClick={() => setStep(2)}
                className="btn-back"
              >
                <ArrowLeft className="w-[13px] h-[12px] text-[#17573C]" />
                <span>Quay lại</span>
              </button>
              <button
                onClick={handleVerifyOtp}
                className="btn-buy"
                disabled={loading || !otp}
              >
                <span>Xác nhận</span>
                <ArrowRight className="w-[13px] h-[12px] text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdStep;
