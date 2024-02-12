export function DashboardHeading({ username }) {
  return (
    <div className="flex justify-between border items-center p-4">
      <div className="text-4xl">Payments App</div>
      <div className="flex flex-row items-center">
        <div className="text-xl mr-3">Hello, {username}</div>
        <button
          type="button"
          className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          {username.toUpperCase().split("")[0]}
        </button>
      </div>
    </div>
  );
}
