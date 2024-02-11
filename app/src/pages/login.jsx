import { Bottom } from "../components/bottom";
import { Heading } from "../components/heading";
import { InputBox } from "../components/input";
import { SubHeading } from "../components/subheading";

export function Login() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-md text-center p-2 h-max w-100 px-4">
          <Heading text={"Sign In"} />
          <SubHeading text={"Enter your credentails to access your account"} />
          <InputBox
            heading={"Email"}
            placeholder={"madhu@gmail.com"}
            type={"email"}
          />
          <InputBox
            heading={"password"}
            placeholder={"Enter your Password"}
            type={"password"}
          />
          <Bottom
            text={"Don't have an account? "}
            to={"Sign Up"}
            component={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}
