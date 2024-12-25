// src/components/ProgressBar.tsx

import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full p-4">
      <div className="bg-gray-300 h-2 rounded-md">
        <div
          className="bg-sky-500 h-2 rounded-md transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
