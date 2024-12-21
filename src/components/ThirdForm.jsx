import Checkin from "../assets/images/checkin.svg";

const ThirdForm = () => {
  return (
    <div>
      <div className="bg-transparent">
        <div className="h-[100vh] mt-[84px] w-full flex justify-center items-center bg-cover bg-no-repeat">
          <div className="flex flex-col p-8 gap-4 justify-center items-center my-auto w-full h-full py-8">
            <img
              src={Checkin}
              alt="Checkin Success"
              className="w-[180px] h-[148px]"
            />
            <h1 className="text-[24px] font-bold">Check-in thành công!</h1>
            <span>Bạn đã thực hiện check-in cho khách hàng thành công!</span>
            <button
              type="submit"
              className="flex btn-buy justify-center items-baseline gap-1 px-8 py-2 bg-gray-600 rounded-lg"
            >
              <span className="uppercase font-semibold text-white">
                Trang chủ
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdForm;
