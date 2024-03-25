import { useEffect, useState } from "react";
import { Bottom } from "../components/bottom";
import { Heading } from "../components/heading";
import { InputBox } from "../components/input";
import { SubHeading } from "../components/subheading";
import { Button } from "../components/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export function Login() {
  const navigate = useNavigate();
  const [obj, setObj] = useState({});
  const [loginresponse, setloginresponse] = useState("");
  const handleinputchange = (e, field) => {
    setObj((prevObj) => ({
      ...prevObj,
      [field]: e.target.value,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    axios
      .post(
        backend_url + "user/verify",
        {},
        {
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          navigate("/dashboard");
        }
      });
  }, []);
  async function sendData() {
    try {
      const res = await axios.post(backend_url + "user/signin", obj);
      if (res.status === 200) {
        setloginresponse(res.data.message);
        navigate("/dashboard");
        const expirytime = new Date().getTime() + 1000 * 60 * 20;
        localStorage.setItem("time", expirytime);
        localStorage.setItem("Authorization", "Bearer " + res.data.token);
        localStorage.setItem("name", res.data.name);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-md text-center p-2 h-max w-100 px-4">
          <Heading text={"Sign In"} />
          <SubHeading text={"Enter your credentails to access your account"} />
          <InputBox
            heading={"Email"}
            placeholder={"madhu@gmail.com"}
            inputtype={"email"}
            onChange={(e) => handleinputchange(e, "username")}
          />
          <InputBox
            heading={"password"}
            placeholder={"Enter your Password"}
            inputtype={"password"}
            onChange={(e) => handleinputchange(e, "password")}
          />
          <div className="pt-4">
            <Button text={"Sign In"} onClick={sendData} />
          </div>
          <Bottom
            text={"Don't have an account? "}
            to={"Sign Up"}
            component={"/signup"}
          />
          <p>{loginresponse}</p>
        </div>
      </div>
    </div>
  );
}
