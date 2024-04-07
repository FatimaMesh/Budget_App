import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Budget } from "./pages/Budget";
import { Home } from "./pages/Home";
import { Error } from "./pages/Error";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/budget-app" element={<Budget />} />
          <Route path="/*" element={<Error />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
