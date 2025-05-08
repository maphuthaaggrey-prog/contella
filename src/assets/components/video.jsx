import { useState, useEffect } from "react";
import video from '../images/contactVideo.mp4';

const Video = ({ onLoaded }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoaded && onLoaded) {
        onLoaded();
      }
    }, 1000); 

    return () => clearTimeout(timeout);
  }, [isLoaded, onLoaded]);

  const handleLoadedMetadata = () => {
    setIsLoaded(true);
    if (onLoaded) {
      onLoaded();
    }
  };
  console.log("Video isLoaded:", isLoaded);
  console.log("Video file:", video);
  return (
    <>
      {!isLoaded && <div className="loading">Loading...</div>}
      <div className="video-overlay"></div>
      <video
        autoPlay
        loop
        muted
        className='contact-video'
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={() => {
          console.log("Video can play");
        }}
      >
        <source src={video} type="video/mp4" />
      </video>
    </>
  );
};

export default Video;