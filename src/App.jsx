import "./App.css";
import HomePage from "./components/HomePage";
import { Routes, Route } from "react-router-dom";
import LoginBox from "./components/Login";
import ParentComponent from "./components/ParentComponent";
import FormAction from "./components/Form";
import BarcodeScanner from "./components/QrScan";

function App() {
  return (
    <>
      <div className="min-h-[100vh] bg-container flex justify-center items-center bg-cover">
        <Routes>
          <Route path="/" element={<LoginBox />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/step-form" element={<ParentComponent />} />
          <Route path="/form" element={<FormAction />} />
          <Route path="/qr" element={<BarcodeScanner />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
