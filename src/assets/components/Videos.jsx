import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import play from '../icons/HeroiconsSolidPlay.svg';
import { videos as videoData } from '../components/data/videos'; // ⬅️ import local data

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [filterType, setFilterType] = useState('all'); 

  useEffect(() => {
    setVideos(videoData); 
  }, []);

  const sortedVideos = [...videos].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredVideos = filterType === 'all'
    ? sortedVideos
    : sortedVideos.filter(video => video.type === filterType);

  return (
    <>
      <div className="video-grid">
        <div className='top'>
          <p className="heading" style={{ fontSize: '15px', fontWeight: '600', marginTop: '1em' }}>
            Recently Uploaded
          </p>
        </div>

        {filteredVideos.slice(0, 8).map((video) => (
          <div key={video.id} className="video-card">
            <Link to={`/watch/${video.id}`}>
              <div className="img-container">
                <img src={video.thumbnail} alt={video.title} />
                <div className="video-info">
                  <div className="container-title">
                    <h5>{video.author}</h5>
                    <h3>{video.title}</h3>
                  </div>
                  <img src={play} className='playBtn' style={{width: '40px', height: '40px'}} />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/videos"><p className='see-all'>See all</p></Link> 
    </>
  );
};

export default Videos;
