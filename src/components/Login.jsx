import { useState } from "react";
import logo from "../assets/images/LOGO.svg";
import { Eye, EyeOff } from "lucide-react";
import ImageGolf from "../assets/images/golf.png";
import SvgGolf1 from "../assets/images/golf1.svg";
import SvgGolf2 from "../assets/images/golf2.svg";
import SvgGolf3 from "../assets/images/golf3.svg";
import { apiLogin } from "@/api";
import useLoading from "@/hooks/useLoading";
import { COOKIE_KEYS, HTTP_STATUS_CODE, ROUTE_PATH } from "@/constants";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import useAuthenticated from "@/hooks/useAuthenticated";

export default function LoginBox() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loading, setLoading } = useLoading();
  const { authenticated, setAuthenticated } = useAuthenticated();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await apiLogin({ email: name, password });
      if (response.status === HTTP_STATUS_CODE.OK) {
        const { error_code, access_token } = response.data;
        if (!error_code) {
          Cookies.set(COOKIE_KEYS.ACCESS_TOKEN, access_token);
          setAuthenticated(true);
        }
      }
      setError("Đăng nhập thất bại");
    } catch (err) {
      setError(err?.message || "Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return authenticated ? (
    <Navigate to={ROUTE_PATH.HOME} />
  ) : (
    <div className="relative bg-login flex justify-center items-center bg-cover bg-no-repeat max-h-screen w-full h-screen">
      <div className="w-[320px] lg:w-[360px] z-50 bg-[#73DAAF] h-[525px] rounded-[30px] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-95">
        <div className="flex flex-col gap-4 justify-center items-center my-auto w-full h-full py-8">
          <img src={logo} alt="LOGO VGCorp" />
          <h1 className="uppercase text-[20px] text-white font-semibold">
            Đăng nhập hệ thống
          </h1>
          <form
            className="flex justify-center flex-col gap-2 items-center h-full"
            onSubmit={handleLogin}
          >
            <div className="relative">
              <span className="block mb-2">Tên đăng nhập</span>
              <input
                type="email"
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
                type={show ? "text" : "password"}
                className="block w-72 py-2.5 text-sm rounded-md bg-white border-0 border-b-2 focus:outline-none px-2 pr-4"
                placeholder="Nhập mật khẩu"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {show ? (
                <EyeOff
                  onClick={() => setShow(false)}
                  className="w-4 h-4 opacity-35 absolute right-2 top-11 cursor-pointer"
                />
              ) : (
                <Eye
                  onClick={() => setShow(true)}
                  className="w-4 h-4 opacity-35 absolute right-2 top-11 cursor-pointer"
                />
              )}
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button
              className="flex justify-center disabled:opacity-50 items-center mt-4 w-72 bg-gradient-to-r from-[#17573C] to-[#4AC486] hover:opacity-85 duration-150 uppercase text-[16px] py-3 rounded-lg text-white px-10"
              type="submit"
              disabled={!name || !password || loading}
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
      <div className="absolute bottom-[15px] left-0">
        <img src={SvgGolf1} alt="Golf Icon" className="opacity-20 w-[107px] h-[204px]" />
      </div>
      <div className="absolute top-[32px] right-0">
        <img src={SvgGolf2} alt="Golf Icon" className="opacity-25 w-[156] h-[325px]" />
      </div>
      <div className="absolute bottom-0 right-0">
        <img src={SvgGolf3}  alt="Golf Icon" className="opacity-40 w-[102px] h-[168px]" />
      </div>
    </div>
  );
}
