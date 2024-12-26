import { useState } from "react";
import { apiCheckin, apiGetTicket, apiSendOTP, apiVerifyOTP } from "@/api";
import { HTTP_STATUS_CODE } from "@/constants";
import useErrorModal from "@/hooks/useErrorModal";
import useLoading from "@/hooks/useLoading";
import useScanning from "@/hooks/useScanning";
import { isResponseOk } from "@/utils/common";
import ArrowIcon from '@/assets/icons/arrow-ic.svg?react';

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
    if (isResponseOk(response)) {
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

    if (isResponseOk(response)) {
      const { error_code, message } = response.data;

      if (error_code === HTTP_STATUS_CODE.OK) {
        const payload = { card_number };

        const ticketResponse = await apiGetTicket({
          paginate: false,
          is_pending: true,
          user_id: user.id,
          card_id: id,
        });

        if (isResponseOk(ticketResponse)) {
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

    if (isResponseOk(response)) {
      const { error_code, message } = response.data;

      if (error_code === HTTP_STATUS_CODE.FULFILLED) {
        setStep(4);
      } else {
        openModal(message);
      }
    }
  };

  return (
    <div className="bg-transparent min-h-dvh h-full w-full flex justify-center items-center bg-cover bg-no-repeat">
      <div className="flex flex-col gap-10 justify-center items-center my-auto max-w-[370px] w-full mx-6">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-semibold text-center uppercase">
            Thông tin khách hàng
          </span>
          <div className="w-full h-12 flex justify-start gap-2 items-center bg-white border-[0.5px] border-[#CECECE] rounded-[7px]">
            <span className="text-[#979797] pl-3 text-sm">Chủ thẻ:</span>
            <input
              type="text"
              name=""
              className="outline-none flex-1 pr-3"
              value={user ? `${user.fullname} - VGA${user.id_display}` : null}
              readOnly
            />
          </div>
          <div className="w-full h-12 flex justify-start gap-2 items-center bg-white border-[0.5px] border-[#CECECE] rounded-[7px]">
            <span className="text-[#979797] pl-3 text-sm">Mã thẻ:</span>
            <input
              type="text"
              name=""
              className="outline-none flex-1 pr-3"
              value={card_number}
              readOnly
            />
          </div>
          <div className="w-full h-12 flex justify-start gap-2 items-center bg-white border-[0.5px] border-[#CECECE] rounded-[7px]">
            <span className="text-[#979797] pl-3 text-sm whitespace-nowrap">
              Mã OTP:
            </span>
            <input
              type="text"
              name="otp"
              required
              className="w-full outline-none pr-3"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleResendOtp}
              className="text-[#4AC486] text-sm mr-3 whitespace-nowrap"
            >
              Gửi lại
            </button>
          </div>
          <span className="text-sm">
            Mã OTP đã được gửi về ứng dụng vHandicap của khách hàng
          </span>
        </div>

        <div className="flex gap-6">
          <button onClick={() => setStep(2)} className="btn-back">
            <ArrowIcon />
            <span>Quay lại</span>
          </button>
          <button
            onClick={handleVerifyOtp}
            className="btn-buy"
            disabled={loading || !otp}
          >
            <span>Xác nhận</span>
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThirdStep;
