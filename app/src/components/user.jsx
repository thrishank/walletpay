import { Link, useNavigate } from "react-router-dom";
import { Send } from "../pages/send";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { InputBox } from "./input";
import axios from "axios";

export function User({ name }) {
  const backend_url = "http://localhost:3000/api/v1/";
  // const backend_url = "https://walletpay-backend.onrender.com/api/v1/";

  const [frnds, setFrnds] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    console.log(filter);
    axios
      .get(backend_url + "user/bulk?filter=" + filter)
      .then((res) => {
        setFrnds(res.data.user);
      })
      .catch((err) => {
        console.log("Error in getting frnds List: " + err);
      });
  }, [filter]);

  return (
    <div>
      <div className="px-4">
        <InputBox
          heading={"Users"}
          placeholder={"Search users"}
          inputtype={"text"}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      {frnds &&
        frnds.length > 0 &&
        frnds.map((frnd) => <Component data={frnd} key={frnd._id} />)}
    </div>
  );
}

function Component({ data }) {
  const navigate = useNavigate();
  return (
    <div className="flex p-4 justify-between">
      <div className="flex">
        <button
          type="button"
          className=" text-white bg-white hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-900"
        >
          {data.firstName.toUpperCase().split("")[0]}
        </button>
        <div className=" px-4 text-2xl">{data.firstName}</div>
      </div>
      <div className="flex flex-col justify-center h-ful">
        <Button
          text={"Send Money"}
          onClick={() => {
            navigate("/send?id=" + data._id + "&name=" + data.firstName);
          }}
        />
      </div>
    </div>
  );
}
