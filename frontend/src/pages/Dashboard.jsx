import { useEffect, useState } from "react";

import axios from "../api/axios";
import toast from "react-hot-toast";
import { TopBar, VideoStatusCard, NewVideo } from "../components";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [addProject, setAddProject] = useState(false);
  const [videoAdded, setVideoAdded] = useState(false);

  const handleVideoAdd = (video) => {
    setVideos(video);
  };

  const handleSetVideoAdded = () => {
    setVideoAdded((prev) => !prev);
  };

  useEffect(() => {
    fetchVideos();
  }, [videoAdded]);

  const fetchVideos = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get("/get-videos", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      console.log(response.data);

      handleVideoAdd(response.data.videos);

      toast.success("Videos fetched!");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setAddProject(false);
  };

  const handleModalOpen = () => {
    setAddProject(true);
  };

  return (
    <div>
      {/* <div className="sticky top-0">
        <TopBar buttonText="New Video" handleButtonClick={handleModalOpen} />
      </div> */}

      <div className="justify-left my-6 flex flex-wrap gap-6 px-6">
        {isLoading && (
          <p className="text-lg font-semibold text-gray-500">Loading...</p>
        )}

        {!isLoading &&
          videos.map((video) => (
            <VideoStatusCard key={video.video_id} video={video} />
          ))}

        {videos.length === 0 && !isLoading && (
          <p className="text-lg font-semibold text-gray-500">
            No videos found!
          </p>
        )}
      </div>

      <NewVideo
        addProject={addProject}
        handleModalClose={handleModalClose}
        handleModalOpen={handleModalOpen}
        handleSetVideoAdded={handleSetVideoAdded}
      />
    </div>
  );
};

export default Dashboard;
