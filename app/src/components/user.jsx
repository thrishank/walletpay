import { Link, useNavigate } from "react-router-dom";
import { Send } from "../pages/send";
import { Button } from "./button";
export function User({ name }) {
  const navigate = useNavigate();
  return (
    <div className="flex p-4 justify-between">
      <div className="flex">
        <button
          type="button"
          className=" text-white bg-white hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-900"
        >
          {name.toUpperCase().split("")[0]}
        </button>
        <div className=" px-4 text-2xl">{name}</div>
      </div>
      <div className="flex flex-col justify-center h-ful">
        <Button
          text={"Send Money"}
          onClick={() => {
            navigate("/send", { state: { name } });
          }}
        />
      </div>
    </div>
  );
}
