import React, { useEffect, useState } from 'react';
import play from '../icons/HeroiconsSolidPlay.svg';
import { Link } from 'react-router-dom'

const AllVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all'); // Default to 'all'

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('https://interesting-spotted-lemongrass.glitch.me'); 
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


<div className="wrap">
      <div className="video-grid" style={{marginBottom: '3em'}}>
      <div className='top'>

               <p className="heading" style={{fontSize: '28px', marginBottom: '.8em'}}>Explore Videos</p>
               <p className="heading"style={{fontSize: '15px', marginBottom: '0'}}>Filter by Category</p>
                   <div className="filter-buttons">
                     <button onClick={() => setFilterType('all')}
                      style={{ fontWeight: filterType === 'all' ? 'bolder' : 'normal' }}
                      >All Content</button>
                     <button onClick={() => setFilterType('Vlog')}
                      style={{ fontWeight: filterType === 'Vlog' ? 'bolder' : 'normal' }}
                      >Vlogs</button>
                     <button onClick={() => setFilterType('Podcast')}
                      style={{ fontWeight: filterType === 'Podcast' ? 'bolder' : 'normal' }}
                      >Podcasts</button>
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
                          <img src={play} className='playBtn' style={{width: '40px', height: '40px', color: '#E1002D'}} />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
      </div>
            </div>
            
    </>
  );
};
export default AllVideos;