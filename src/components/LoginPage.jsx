import { useEffect, useState } from "react";
import Logo from "@/assets/images/white-logo.svg?react";
import EyeIcon from "@/assets/icons/eye.svg?react";
import EyeOffIcon from "@/assets/icons/eye-off.svg?react";
import ImageGolf from "@/assets/images/golf.svg?react";
import { apiLogin } from "@/api";
import useLoading from "@/hooks/useLoading";
import { COOKIE_KEYS, ROUTE_PATH } from "@/constants";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import useAuthenticated from "@/hooks/useAuthenticated";
import useErrorModal from "@/hooks/useErrorModal";
import useCredentialPassword from "@/hooks/useCredentialPassword";
import { isResponseOk } from "@/utils/common";

export default function LoginPage() {
  const { authenticated, setAuthenticated } = useAuthenticated();
  const { openModal } = useErrorModal();
  const { getCredential, saveCredential } = useCredentialPassword();
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, setLoading } = useLoading();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiLogin({ email: username, password });
      if (isResponseOk(response)) {
        const { error_code, message, access_token } = response.data;
        if (!error_code) {
          Cookies.set(COOKIE_KEYS.ACCESS_TOKEN, access_token);
          setAuthenticated(true);
          saveCredential(username, password);
        } else {
          openModal(message);
        }
      } else {
        openModal("Đăng nhập thất bại");
      }
    } catch (err) {
      openModal(err?.message || "Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCredentials = async () => {
      if (!getCredential) return;
      const credentials = await getCredential();
      if (credentials) {
        setUsername(credentials.username);
        setPassword(credentials.password);
      }
    };

    fetchCredentials();
  }, [getCredential]);

  return authenticated ? (
    <Navigate to={ROUTE_PATH.HOME} />
  ) : (
    <div className="relative bg-login flex justify-center items-center bg-cover bg-no-repeat max-h-screen w-full min-h-dvh h-full">
      <div className="max-w-[370px] w-full mx-6 z-50 bg-[#73DAAF] rounded-[30px]">
        <div className="flex flex-col gap-8 justify-center items-center my-auto w-full h-full py-8">
          <Logo className="h-[95px]" />
          <div className="flex flex-col gap-6 justify-center items-center">
            <span className="uppercase text-[20px] text-white font-semibold">
              Đăng nhập hệ thống
            </span>
            <form
              className="flex justify-center flex-col gap-2 items-center h-full"
              onSubmit={handleLogin}
            >
              <div className="relative">
                <span className="block mb-2 text-[13px]">Tên đăng nhập</span>
                <input
                  type="email"
                  className="block w-72 py-2.5 text-base rounded-md bg-white border-0 border-b-2 focus:outline-none px-2"
                  placeholder="Nhập tên đăng nhập"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="relative">
                <span className="block mb-2 text-[13px]">Mật khẩu</span>
                <input
                  type={show ? "text" : "password"}
                  className="block w-72 py-2.5 text-base rounded-md bg-white border-0 border-b-2 focus:outline-none px-2 pr-4"
                  placeholder="Nhập mật khẩu"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {show ? (
                  <EyeOffIcon
                    onClick={() => setShow(false)}
                    className="w-4 h-4 opacity-35 absolute right-2 top-11 cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setShow(true)}
                    className="w-4 h-4 opacity-35 absolute right-2 top-11 cursor-pointer"
                  />
                )}
              </div>

              <button
                className="flex justify-center disabled:opacity-50 items-center mt-4 w-72 bg-gradient-to-r from-[#17573C] to-[#4AC486] hover:opacity-85 duration-150 uppercase text-[16px] py-3 rounded-lg text-white px-10"
                type="submit"
                disabled={!username || !password || loading}
              >
                Đăng nhập
              </button>
            </form>
          </div>
          <div>
            <ImageGolf className="w-[30px] h-[54px] mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
