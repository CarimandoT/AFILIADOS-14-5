import { BrowserRouter, Routes, Route } from "react-router-dom";
import PanelPage from "./pages/PanelPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<div>login acá</div>} /> */}
        <Route path="/panel" element={<PanelPage />} />
      </Routes>
    </BrowserRouter>
  );
}