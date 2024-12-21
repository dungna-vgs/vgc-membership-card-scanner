import LogoHeader from "../assets/images/logo-header.svg";
const Header = () => {
  return (
    <div className="bg-white h-[84px] fixed top-0 right-0 left-0 flex justify-center items-center">
      <a href="#">
        <img src={LogoHeader} alt="Logo" className="w-[76px] h-[53px]" />
      </a>
    </div>
  );
};

export default Header;
