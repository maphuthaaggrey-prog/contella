import video from '../images/contactVideo.mp4'
const Video = () => {
    return ( 

        <>
        <div className="video-overlay"></div>
              <video
        autoPlay
        loop
        muted
        className='contact-video'
      >
        <source src={video} type="video/mp4" />
      </video>
</>
     );
}
 
export default Video;