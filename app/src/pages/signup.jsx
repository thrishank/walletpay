import { Button } from "../components/button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/input";
import { SubHeading } from "../components/subheading";
import { Bottom } from "../components/bottom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

thrishankkalluru@gmail.com// const backend_url = "http://localhost:3000/api/v1/";
export function Signup() {
  const navigate = useNavigate();
  const [obj, setObj] = useState({});
  const [passwordstrength, setpasswordstrength] = useState("");

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

  useEffect(() => {
    const x = setTimeout(() => {
      if (obj.password && obj.password.length < 8)
        setpasswordstrength("password is less than 8");
      else if (obj.password)
        setpasswordstrength("Nice work. This is an excellent password");
    }, [1000]);
    return () => clearTimeout(x);
  }, [obj.password]);

  async function sendData() {
    try {
      const res = await axios.post(backend_url + "user/signup", obj);
      if (res.status === 200) {
        navigate("/dashboard");
        localStorage.setItem("Authorization", "Bearer " + res.data.token);
        const expirytime = new Date().getTime() + 1000 * 60 * 10;
        localStorage.setItem("time", expirytime);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className=" rounded-md text-center h-max px-4 w-100 bg-white">
          <Heading text={"Sign Up"} />
          <SubHeading
            text={"Enter your credentails to Create Your WalletPay Account"}
          />
          <InputBox
            heading={"FirstName"}
            placeholder={"Madhu"}
            inputtype={"text"}
            onChange={(e) => handleinputchange(e, "firstName")}
          />
          <InputBox
            heading={"LastName"}
            placeholder={"Reddy"}
            inputtype={"text"}
            onChange={(e) => handleinputchange(e, "lastName")}
          />
          <InputBox
            heading={"Email"}
            placeholder={"madhu@gmail.com"}
            inputtype={"email"}
            onChange={(e) => handleinputchange(e, "username")}
          />
          <InputBox
            heading={"Password"}
            placeholder={"Enter Your Password"}
            inputtype={"password"}
            onChange={(e) => handleinputchange(e, "password")}
          />
          <p>{passwordstrength}</p>
          <div className="pt-4">
            <Button text={"Sign Up"} onClick={sendData} />
          </div>
          <Bottom
            text={"Already have an account?"}
            to={"login"}
            component={"/login"}
          />
        </div>
      </div>
    </div>
  );
}
