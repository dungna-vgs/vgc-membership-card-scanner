import "./App.css";
import { Suspense, useCallback, useEffect } from "react";
import Loading from "./components/loading";
import Spinner from "./components/Spinner";
import ErrorModal from "./components/ErrorModal";
import RenderRouter from "./router";
import { apiGetUser } from "./api";
import useLoading from "./hooks/useLoading";
import useAuthenticated from "./hooks/useAuthenticated";
import useAdmin from "./hooks/useAdmin";
import useErrorModal from "./hooks/useErrorModal";
import { isResponseOk } from './utils/common';

function App() {
  const { authenticated } = useAuthenticated();
  const { setLoading } = useLoading();
  const { setAdmin } = useAdmin();
  const { openModal } = useErrorModal();

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiGetUser();
      if (isResponseOk(response)) {
        const { error_code, data } = response.data;
        if (!error_code) {
          setAdmin(data);
        }
      }
    } catch (err) {
      openModal(err?.message || "Không lấy được thông tin admin");
    }
    setLoading(false);
  }, [openModal, setAdmin, setLoading]);

  useEffect(() => {
    if (authenticated) {
      fetchUser();
    }
  }, [authenticated, fetchUser]);

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-dvh bg-container flex justify-center items-center bg-cover">
        <Spinner />
        <ErrorModal />
        <RenderRouter />
      </div>
    </Suspense>
  );
}

export default App;
