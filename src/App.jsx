import "./App.css";
import { Suspense, useEffect } from "react";
import Loading from "./components/loading";
import Spinner from "./components/Spinner";
import ErrorModal from "./components/ErrorModal";
import RenderRouter from "./router";
import { apiGetUser } from "./api";
import useLoading from "./hooks/useLoading";

function App() {
  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      await apiGetUser();
      setLoading(false);
    };

    fetchUser();
  }, [setLoading]);

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
