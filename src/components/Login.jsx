import { useState } from "react";
import logo from "../assets/images/LOGO.svg";
import { Eye, EyeOff } from "lucide-react";
import ImageGolf from "../assets/images/golf.png";
import SvgGolf1 from "../assets/images/golf1.svg";
import SvgGolf2 from "../assets/images/golf2.svg";
import SvgGolf3 from "../assets/images/golf3.svg";

export default function LoginBox() {
  const [show, setShow] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  // const handleLogin = () => {
  //   if (!email || !password) {
  //     toast.error("Email/Password is required");
  //     return;
  //   }
  //   let res =
  // };
  return (
    <div className="relative bg-login flex justify-center items-center bg-cover bg-no-repeat w-[434px] h-[100vh]">
      <div className="w-[320px] lg:w-[360px] z-50 bg-[#73DAAF] h-[525px] rounded-[30px] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-95">
        <div className="flex flex-col gap-4 justify-center items-center my-auto w-full h-full py-8">
          <img src={logo} alt="LOGO VGCorp" />
          <h1 className="uppercase text-[20px] text-white font-semibold">
            Đăng nhập hệ thống
          </h1>
          <form
            action=""
            className=" flex justify-center flex-col gap-2 items-center h-full"
          >
            <div className="relative">
              <span className="block mb-2">Tên đăng nhập</span>
              <input
                type="text"
                className="block w-72 py-2.5 text-sm rounded-md bg-white border-0 border-b-2 focus:outline-none px-2"
                placeholder="Nhập tên đăng nhập"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative">
              <span className="block mb-2">Mật khẩu</span>
              <input
                type={show ? "password" : "text"}
                className="block w-72 py-2.5 text-sm rounded-md bg-white border-0 border-b-2 focus:outline-none px-2 pr-4"
                placeholder="Nhập mật khẩu"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {show && (
                <Eye
                  onClick={() => setShow(!show)}
                  className="w-4 h-4 opacity-35 absolute right-2 top-11"
                />
              )}
              {!show && (
                <EyeOff
                  onClick={() => setShow(!show)}
                  className="w-4 h-4 opacity-35 absolute right-2 top-11"
                />
              )}
            </div>

            <button
              className="flex justify-center disabled:opacity-95 items-center mt-4 w-72 bg-gradient-to-r from-[#17573C] to-[#4AC486] hover:opacity-85 duration-150 uppercase text-[16px] py-3 rounded-lg text-white px-10"
              type="submit"
              disabled={name && password ? false : true}
              onClick={() => handleLogin()}
            >
              Đăng nhập
            </button>
          </form>
          <div>
            <img
              src={ImageGolf}
              alt="Golf Icon"
              className="w-[30px] h-[54px] mt-4"
            />
          </div>
        </div>
      </div>
      <div className="absolute top-[60%] left-0">
        <img src={SvgGolf1} alt="Golf Icon" className="opacity-20" />
      </div>
      <div className="absolute top-[15%] right-0">
        <img src={SvgGolf2} alt="Golf Icon" className="opacity-25" />
      </div>
      <div className="absolute top-[80%] right-0">
        <img src={SvgGolf3} alt="Golf Icon" className="opacity-40" />
      </div>
    </div>
  );
}
