import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import play from '../icons/HeroiconsSolidPlay.svg';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all'); 

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:3000/videos');
        const data = await response.json();
        setVideos(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load videos.');
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <div>Loading videos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const sortedVideos = [...videos].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredVideos = filterType === 'all'
    ? sortedVideos
    : sortedVideos.filter(video => video.type === filterType);
  return (
    <>



      <div className="video-grid">
      <div className='top'>

        <p className="heading" style={{ fontSize: '15px', fontWeight: '600', marginTop: '1em' }}>Recently Uploaded</p>

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
                          <img src={play} className='playBtn' style={{width: '40px', height: '40px', color: '#E1002D'}} />
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