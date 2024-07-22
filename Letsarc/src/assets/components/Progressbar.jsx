import React from 'react';

const ProgressBar = ({ completed, total }) => {
  const percentage = (completed / total) * 100;

  return (
    <div className="flex items-center w-full bg-green-200 rounded-full h-8 pl-1 pr-3">
      <div className="flex items-center w-full relative px-4">
        <div className="absolute pt-2 left-2 h-3 rounded-full bg-white" style={{ width: '90%' }}></div>
        <div className="absolute pt-2 left-2 h-3 rounded-full bg-black" style={{ width: `${percentage*0.9}%` }}></div>
       </div> 
        <span className="relative text-xs font-semibold text-gray-700">{`${completed}/${total} completed`}</span>
      </div>
  );
};

export default ProgressBar;
