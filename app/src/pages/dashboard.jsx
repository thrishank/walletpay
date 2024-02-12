import { Balance } from "../components/balance";
import { DashboardHeading } from "../components/dashboard_heading";
import { Heading } from "../components/heading";
import { InputBox } from "../components/input";
import { User } from "../components/user";

export function Dashboard() {
  return (
    <div>
      <DashboardHeading username={"thrishank"} />
      <Balance amount={4000} />
      <div className="px-4">
        <InputBox
          heading={"Users"}
          placeholder={"Search users"}
          inputtype={"text"}
        />
      </div>
      <User name={"Madhu"} />
      <User name={"Abhi"} />
      <User name={"thrishank"} />
    </div>
  );
}
