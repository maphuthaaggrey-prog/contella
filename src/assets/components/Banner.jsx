import { useEffect, useState } from 'react';
import BannerImg1 from '../images/heroimage.jpg';
import BannerImg2 from '../images/heroimage2.jpg';
import BannerImg3 from '../images/heroimage3.jpg'; 

const images = [BannerImg1, BannerImg2, BannerImg3];

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); 

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setFade(true); 
      }, 1000);
    }, 7000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='wrap'>
      <div className='top'>
        <p className="heading" style={{ fontSize: '16px' }}>Explore</p>
      </div>
      <div className="banner-container" style={{ position: 'relative', overflow: 'hidden' }}>
        <img 
          src={images[currentImageIndex]} 
          className={`banner-image ${fade ? 'fade-in' : 'fade-out'}`} 
        />
        <div className="news-info" style={{ display: 'block'}}>
          <p className='discover'>Explore vlogs, music, and podcasts from a new wave of creators.</p>
          <p className='author'>Contella</p>
        </div>
      </div>
      </div>
    </>
  );
};

export default Banner;
