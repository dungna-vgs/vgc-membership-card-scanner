import { useState } from "react";
import Cookies from "js-cookie";
import { COOKIE_KEYS } from "@/constants";
import useLoading from "@/hooks/useLoading";
import useAuthenticated from "@/hooks/useAuthenticated";
import Modal from "../modal";
import Avatar from "@/assets/images/avatar.png";
import LogoHeader from "@/assets/images/logo-header.svg";
import WarningIcon from "@/assets/icons/warning-ic.svg";

const Header = () => {
  const { setLoading } = useLoading();
  const { setAuthenticated } = useAuthenticated();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setOpen(false);
    Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN);
    setAuthenticated(false);
    setLoading(false);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div className="bg-white h-20 fixed top-0 right-0 left-0 flex justify-between gap-2 lg:px-10 px-4 items-center z-10">
      <div className="flex-1 flex gap-2 items-center">
        <div
          onClick={() => setOpen(true)}
          className="flex-shrink-0 w-11 aspect-square bg-gray-300 rounded-full overflow-hidden cursor-pointer"
        >
          <img src={Avatar} className="w-full h-full" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col item-center gap-1">
            <span className="font-bold text-sm text-[#404040] line-clamp-1">
              Laguna admin
            </span>
            <span className="text-xs">Admin sân</span>
          </div>
        </div>
      </div>
      <a href="#">
        <img src={LogoHeader} alt="Logo" className="w-[76px] h-[53px]" />
      </a>

      <Modal
        open={open}
        onClose={handleCloseModal}
        icon={WarningIcon}
        title="Đăng xuất tài khoản"
      >
        <div className="flex flex-col gap-2.5 w-full">
          <div className="w-full rounded-2xl px-4 py-3 bg-[#EBEBEB]">
            <p className="text-center text-base">
              Bạn đang thực hiện thao tác đăng xuất khỏi tài khoản. Vui lòng
              nhấn tiếp tục để hoàn thành thao tác đăng xuất.
            </p>
          </div>
          <div className="flex justify-between gap-5">
            <button onClick={handleCloseModal} className="btn-back flex-1">
              <span>Hủy</span>
            </button>
            <button onClick={handleLogout} className="btn-buy flex-1">
              <span>Tiếp tục</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
