import LogoHeader from "@/assets/images/logo-header.svg";
import LogoutForm from "../Logout";
const Header = () => {
  return (
    
    <div className="bg-white h-[84px] fixed top-0 right-0 left-0 flex justify-between gap-2 lg:px-10 px-4 items-center z-10">
      <div className="flex items-center gap-2">
 
    <LogoutForm/>

      <div className="flex flex-col item-center gap-1">
        <span className="font-bold text-[14px]">Phan Văn Thành</span>
        <span className="text-[14px]">Admin sân</span>
      </div>
      </div>
      <a href="#">
        <img src={LogoHeader} alt="Logo" className="w-[76px] h-[53px]" />
      </a>
    </div>
  );
};

export default Header;
