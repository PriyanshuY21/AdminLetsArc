import React from 'react';
import { FaPenFancy, FaCheck, FaCamera, FaMicrophone, FaVideo, FaFilm, FaFlag, FaEnvelope, FaThumbsUp, FaFileInvoice, FaDollarSign, FaFileAlt } from 'react-icons/fa';

const steps = [
  { name: 'Script Writing', icon: <FaPenFancy />, description: 'Write the initial script for the project.' },
  { name: 'Script Approval', icon: <FaCheck />, description: 'Approve the written script.' },
  { name: 'Video Shoot', icon: <FaCamera />, description: 'Shoot the video based on the script.' },
  { name: 'Voice Over', icon: <FaMicrophone />, description: 'Record the voice over for the video.' },
  { name: 'Video Editing', icon: <FaVideo />, description: 'Edit the video with the recorded footage and voice over.' },
  { name: 'Animation', icon: <FaFilm />, description: 'Add animations to the video.' },
  { name: 'Completion and QC', icon: <FaFlag />, description: 'Complete the video and perform quality checks.' },
  { name: 'First Cut Submission', icon: <FaEnvelope />, description: 'Submit the first cut of the video.' },
  { name: 'Final Submission', icon: <FaFileAlt />, description: 'Submit the final version of the video.' },
  { name: 'Final Approval from Client', icon: <FaThumbsUp />, description: 'Get final approval from the client.' },
  { name: 'Invoice Submitted', icon: <FaFileInvoice />, description: 'Submit the invoice for the project.' },
  { name: 'Payment Received', icon: <FaDollarSign />, description: 'Receive payment for the project.' }
];

const Detailed = ({ project, onUpdateProgress }) => {
  const completedSteps = project.progress.completed;

  const handleMarkComplete = () => {
    const nextStep = completedSteps + 1;
    onUpdateProgress(project._id, nextStep); // Pass project ID here
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-secondary shadow-lg p-4 mt-4">
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center pt-3 pb-3">
          <h3 className="text-2xl font-bold text-center pt-1 pb-1">{project.projectName}</h3>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md relative group ${index < completedSteps ? 'bg-gr' : index === completedSteps ? 'bg-gr2' : 'bg-nc'}`}
            style={{ height: '160px' }}
          >
            <div className="text-3xl mb-2 opacity-40">{step.icon}</div>
            <div className="text-base text-center">{step.name}</div>
            {index === completedSteps && (
              <button onClick={handleMarkComplete} className="absolute bottom-2 bg-gr1 text-xs text-white px-1 py-1.5 rounded-lg">
                Mark Complete
              </button>
            )}
            {index > completedSteps && (
              <div className="absolute bottom-2 text-xs bg-as text-white px-1 py-1.5 rounded-lg">
                Not Uploaded
              </div>
            )}
            {index >= completedSteps && (
              <div className="absolute top-0 w-full text-center p-2 bg-accent text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {step.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detailed;
