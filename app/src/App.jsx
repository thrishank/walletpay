import "./App.css";
import { Heading } from "./components/heading";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import { Send } from "./pages/send";
import { Signup } from "./pages/signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={Heading} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send  name={"Thrishank"}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
