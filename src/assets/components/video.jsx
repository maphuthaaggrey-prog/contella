import video from '../images/instasave.website_AQOCBbWKReqBva2rYOkpMs2EZm6JbBMvDQR2mIQRR0SvIgg9JVGbbXDRRM5jN5moaUPHEzBp7Hv5jqnwAFIt9itGN-MdBx0dSVPbd8c.mp4'
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