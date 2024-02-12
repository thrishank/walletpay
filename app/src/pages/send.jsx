import { Button } from "../components/button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/input";

export function Send({ name }) {
  return (
    <div className="shadow-md">
      <div className="p-4 text-center">
        <Heading text={"Send Money"} />
      </div>
      <div className="flex flex-col p-4">
        <div className="flex">
          <button
            type="button"
            className=" text-white bg-white hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-900"
          >
            {name.toUpperCase().split("")[0]}
          </button>
          <div className=" px-4 text-2xl">{name}</div>
        </div>
        <InputBox
          heading={"Amount"}
          placeholder={"Enter Amount"}
          type={"number"}
        />
        <div className="p-4">
          <Button text={"Initate Transfer"} />
        </div>
      </div>
    </div>
  );
}
