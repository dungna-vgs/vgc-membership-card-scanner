import { useState } from "react";
import FirstForm from "./FirstForm";
import SecondForm from "./SecondForm";
import ThirdForm from "./ThirdForm";
import Header from "./Header";

const ParentComponent = () => {
  const formList = ["First Form", "Second Form", "Third Form"];
  const [page, setPage] = useState(0);

  const formLength = formList.length;

  const handlePrev = () => {
    setPage(page === 0 ? formLength - 1 : page - 1);
  };
  const handleNext = () => {
    setPage(page === formLength - 1 ? 0 : page + 1);
  };
  console.log(page);
  const handleForm = () => {
    switch (page) {
      case 0: {
        return <FirstForm></FirstForm>;
      }
      case 1: {
        return <SecondForm></SecondForm>;
      }
      case 2: {
        return <ThirdForm></ThirdForm>;
      }

      default:
        return null;
    }
  };
  return (
    <div className="form">
      <Header />
      <div>{handleForm()}</div>
      <div className=" flex justify-center gap-2">
        <div>
          <button onClick={handlePrev}>Go Back</button>
        </div>
        <div>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default ParentComponent;
