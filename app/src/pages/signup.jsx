import { Button } from "../components/button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/input";
import { SubHeading } from "../components/subheading";
import { Bottom } from "../components/bottom";

export function Signup() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className=" rounded-md text-center p-2 h-max px-4 w-100 bg-white">
          <Heading text={"Sign Up"} />
          <SubHeading text={"Enter Your information to create your account"} />
          <InputBox heading={"FirstName"} placeholder={"Madhu"} type={"text"} />
          <InputBox heading={"LastName"} placeholder={"Reddy"} type={"text"} />
          <InputBox
            heading={"Email"}
            placeholder={"madhu@gmail.com"}
            inputtype={"email"}
          />
          <InputBox
            heading={"Password"}
            placeholder={"Enter Your Password"}
            inputtype={"password"}
          />
          <div className="pt-4">
            <Button text={"Sign Up"} />
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
