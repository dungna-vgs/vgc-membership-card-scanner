import LogoHeader from "@/assets/images/logo-header.svg";
import { useState } from 'react';
import { Button, Modal } from 'antd';
const LogoutForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal} className="btn-logout">
       <img src={LogoHeader} alt="Avatar" className="w-[46px] h-[46px]" />
      </Button>
     <div className="flex flex-col justify-center items-center">
     <Modal title="Đăng xuất tài khoản" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p className="text-center p-3 rounded-2xl bg-[#EBEBEB]">Bạn đang thực hiện thao tác đăng xuất khỏi tài khoản. Vui lòng nhấn tiếp tục để hoàn thành thao tác đăng xuất.</p>
      </Modal>
     </div>
    </>
  );
};
export default LogoutForm;