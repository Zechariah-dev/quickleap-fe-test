import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaymentForm from "./pages/Payment";
import SuccessPage from "./pages/SuccessPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaymentForm />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
