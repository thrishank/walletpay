export function Balance({ amount }) {
  return (
    <div className="flex font-bold text-2xl">
      <div className="p-4">Your Balance</div>
      <div className="flex items-center">{"$"+ amount}</div>
    </div>
  );
}
