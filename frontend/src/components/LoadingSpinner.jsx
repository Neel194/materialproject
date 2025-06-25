import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ size = "w-6 h-6", text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Loader2 className={`animate-spin text-indigo-500 ${size}`} />
      {text && <p className="mt-2 text-sm text-gray-500">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
