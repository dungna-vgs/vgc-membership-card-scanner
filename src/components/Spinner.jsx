import useLoading from "@/hooks/useLoading";
import Loading from "./loading";

const Spinner = () => {
  const { loading } = useLoading();
  if (loading) {
    return <Loading />;
  }
};

export default Spinner;
