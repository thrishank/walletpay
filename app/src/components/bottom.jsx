import { Link } from "react-router-dom";

export function Bottom({ text, to, component }) {
  return (
    <div className="flex justify-center">
      <div className="text-medium px-2">{text}</div>
      <Link className="underline" to={component}>
        {to}
      </Link>
    </div>
  );
}
