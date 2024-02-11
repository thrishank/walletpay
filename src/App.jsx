import "./App.css";
import { Heading } from "./components/heading";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Signup /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={Heading} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/dashboard" component={Dashboard} />
          <Route path="/send" component={Send} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
