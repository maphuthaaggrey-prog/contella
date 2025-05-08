import { useState, useEffect } from "react";
import video from "../images/contactVideo.mp4";
import ContactComponent from "../components/ContactComponent";
import loader from "../icons/Spinner@1x-0.4s-85px-85px.gif"

const Contact = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Optional fallback in case video doesn't load
    const timeout = setTimeout(() => {
      if (!videoLoaded) {
        setVideoLoaded(true);
      }
    }, 10000); // 10 seconds fallback

    return () => clearTimeout(timeout);
  }, [videoLoaded]);

  const handleLoadedMetadata = () => {
    console.log("Video metadata loaded");
    setVideoLoaded(true);
  };

  return (
    <>
      {!videoLoaded && (
        <div className="loading-page">
           <img src={loader} alt="Loading..." className="loading-gif" />
        </div>
        )}

      <div className="video-overlay"></div>
      <video
        autoPlay
        loop
        muted
        className="contact-video"
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={() => console.log("Video can play")}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {videoLoaded && <ContactComponent />}
    </>
  );
};

export default Contact;
