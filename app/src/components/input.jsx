export function InputBox({ heading, placeholder, inputtype }) {
  return (
    <div>
      <div className="text-md text-left font-medium py-2">{heading}</div>
      <input
        className="appearance-none block w-full bg-gray-200 text-black text-lg border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
        placeholder={placeholder}
        type={inputtype}
      ></input>
    </div>
  );
}
