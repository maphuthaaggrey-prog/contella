import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import play from '../icons/HeroiconsSolidPlay.svg';
import { lekompo as lekompoData } from '../components/data/lekompo'; // ⬅️ import local data

const LekompoHome = () => {
  const [lekompo, setVideos] = useState([]);
  const [filterType, setFilterType] = useState('all'); 

  useEffect(() => {
    setVideos(lekompoData); 
  }, []);

  const sortedVideos = [...lekompo].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredVideos = filterType === 'all'
    ? sortedVideos
    : sortedVideos.filter(video => video.type === filterType);

  return (
    <>
      <div className="video-grid">
        <div className='top'>
          <p className="heading" style={{ fontSize: '15px', fontWeight: '600', marginTop: '1em' }}>
            Lekompo
          </p>
        </div>

        {filteredVideos.slice(0, 4).map((video) => (
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
      <Link to="/lekompo"><p className='see-all'>See all</p></Link> 
    </>
  );
};

export default LekompoHome;
