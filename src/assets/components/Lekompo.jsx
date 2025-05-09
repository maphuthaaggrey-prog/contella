import React, { useEffect, useState } from 'react';
import play from '../icons/HeroiconsSolidPlay.svg';
import { Link } from 'react-router-dom';
import { lekompo as lekompoData } from './data/lekompo';

const Lekompo = () => {
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
    <div className="wrap">
      <div className="video-grid" style={{ marginBottom: '3em' }}>
        <div className='top'>
          <p className="heading" style={{ fontSize: '28px', marginBottom: '.8em' }}>Explore Lekompo</p>
          <p className="heading" style={{ fontSize: '15px', marginBottom: '0' }}>Filter by Category</p>
          <div className="filter-buttons">
            <button onClick={() => setFilterType('all')}
              style={{ fontWeight: filterType === 'all' ? 'bolder' : 'normal' }}>All</button>
            <button onClick={() => setFilterType('Music')}
              style={{ fontWeight: filterType === 'Music' ? 'bolder' : 'normal' }}>Music</button>
            <button onClick={() => setFilterType('Visuals')}
              style={{ fontWeight: filterType === 'Visuals' ? 'bolder' : 'normal' }}>Visuals</button>
          </div>
        </div>

        {filteredVideos.map((video) => (
          <div key={video.id} className="video-card">
            <Link to={`/watch/${video.id}`}>
              <div className="img-container">
                <img src={video.thumbnail} alt={video.title} />
                <div className="video-info">
                  <div className="container-title">
                    <h5>{video.author}</h5>
                    <h3>{video.title}</h3>
                  </div>
                  <img src={play} className='playBtn' style={{ width: '40px', height: '40px' }} alt="Play" />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lekompo;
