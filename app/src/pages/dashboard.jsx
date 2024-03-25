import { useEffect, useState } from "react";
import { Balance } from "../components/balance";
import { DashboardHeading } from "../components/dashboard_heading";
import { User } from "../components/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export function Dashboard() {
  const navigate = useNavigate();

  function check_token_expiration() {
    const token = localStorage.getItem("Authorization");
    const time = localStorage.getItem("time");

    if (!token || time < Date.now()) {
      localStorage.clear();
      navigate("/login");
    }
  }

  useEffect(() => {
    check_token_expiration();
  }, []);

  setInterval(check_token_expiration, 1000 * 60);
  
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
        if (response.status === 411) {
          navigate("/login");
        }
      });
  }, []);
  const token = localStorage.getItem("Authorization");
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    axios
      .get(backend_url + "account/balance", {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        setBalance(response.data.balance);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <DashboardHeading username={"thrishank"} />
      <Balance amount={balance} />
      <User />
    </div>
  );
}
