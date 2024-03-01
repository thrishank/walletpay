import { Balance } from "../components/balance";
import { DashboardHeading } from "../components/dashboard_heading";
import { Heading } from "../components/heading";
import { InputBox } from "../components/input";
import { User } from "../components/user";

// Search Users functionality
// send money
// If user is not logged in user should go to login page
export function Dashboard() {
  setInterval(() => {
    const time = localStorage.getItem("time");
    if (time < new Date().getTime()) {
      localStorage.clear();
    }
    const token = localStorage.getItem("Authorization");
    
  }, [1000 * 60 * 5]);

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
