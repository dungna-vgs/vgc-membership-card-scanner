import useScanning from "@/hooks/useScanning";
import Header from "./layout/Header";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import SuccessScreen from './SuccessScreen';

export default function HomePage() {
  const { step } = useScanning();

  return (
    <div className="w-full h-full">
      <Header />
      <div className="min-h-dvh h-full w-full flex justify-center items-center bg-cover bg-no-repeat">
        {step === 1 && <FirstStep />}
        {step === 2 && <SecondStep />}
        {step === 3 && <ThirdStep />}
        {step === 4 && <SuccessScreen />}
      </div>
    </div>
  );
}
