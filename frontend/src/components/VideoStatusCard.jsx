import { StatusList } from "../constants";

const VideoStatusCard = ({ video }) => {
  const currentStatusIndex = StatusList.indexOf(video.status);

  return (
    <div className="flex h-max w-80 flex-col space-y-3 rounded-lg border-4 border-blue1/90 px-6 py-4 tracking-wide text-black1 shadow-2xl shadow-blue1/70">
      <h3 className="text-2xl font-semibold tracking-wider">
        {video.video_title}
      </h3>

      <p className="text-base font-normal text-black1/90">
        Started <span className="font-medium">{video.date_started}</span>
      </p>

      {video.date_completed && (
        <p className="text-base font-normal text-black1/90">
          Completed <span className="font-medium">{video.date_completed}</span>
        </p>
      )}

      <h4 className="text-xl font-medium">Status</h4>
      <div className="flex flex-col space-y-4 text-lg font-medium">
        {StatusList.map((status, index) => {
          let backgroundColorClass;
          if (index < currentStatusIndex) {
            backgroundColorClass = "bg-green-500";
          } else if (index === currentStatusIndex) {
            backgroundColorClass = "bg-green-300";
          } else {
            backgroundColorClass = "bg-gray-300 text-gray-700";
          }

          return (
            <p
              key={index}
              className={`flex items-center justify-center rounded-lg p-1.5 ${backgroundColorClass}`}
            >
              <p>{status}</p>
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default VideoStatusCard;
