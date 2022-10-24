// import logo from './logo.svg';
import "./App.css";
import Tuiter from "./tuiter";
import Labs from "./labs";
import HelloWorld from "./labs/a6/hello-world";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/labs" element={<Labs />} />
          <Route path="/hello" element={<HelloWorld />} />
          <Route path="/tuiter" element={<Tuiter />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
