// src/components/ProgressBar.tsx
import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid"; // CheckCircleIcon으로 변경

interface ProgressBarProps {
  progress: number;
  isLastQuestion?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  isLastQuestion,
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-2 relative">
        <div
          className="bg-sky-400 h-4 rounded-full transition-all duration-500 ease-in-out relative"
          style={{ width: `${progress}%` }}
        >
          <div
            className="absolute right-0 top-0 h-4 w-4 bg-white rounded-full transform translate-x-1/2"
            style={{
              opacity: progress > 10 ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
              backgroundColor: progress >= 100 ? "#4ade80" : "white",
            }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{
                backgroundColor: progress >= 100 ? "#4ade80" : "#7dd3fc",
                opacity: progress > 10 ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
              }}
            />
          </div>
        </div>
      </div>
      {isLastQuestion && (
        <div className="text-green-500">
          <CheckCircleIcon className="w-8 h-8" />
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
