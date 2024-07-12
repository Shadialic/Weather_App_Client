import { Routes, Route } from "react-router-dom";
import "./App.css";
import UserRouter from "./Routes/UserRouter";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<UserRouter />} />
      </Routes>
    </div>
  );
}

export default App;
