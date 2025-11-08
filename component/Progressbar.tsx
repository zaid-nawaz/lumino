export default function ({ value }: { value: number }){
      return (
    <div className="w-full bg-gray-200 rounded-lg h-4">
      <div
        className="bg-green-500 h-4 rounded-lg"
        style={{ width: `${value}` }}
      ></div>
    </div>
  );
}