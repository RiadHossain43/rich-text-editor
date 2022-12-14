import { BallTriangle } from "react-loader-spinner";
export default function Loading() {
  return (
    <div className="flex justify-center items-center">
      <BallTriangle color="gray" height={15} width={15} />
      <span className="text-gray-400">Loading...</span>
    </div>
  );
}
