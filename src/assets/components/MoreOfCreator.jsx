import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import play from '../icons/HeroiconsSolidPlay.svg';

const MoreOfCreator = ({ creator, excludeId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:3000/videos');
        const data = await response.json();

        // Filter videos by the same author, excluding the current video
        const filtered = data.filter(
          (video) => video.author === creator && video.id !== excludeId
        );

        setVideos(filtered);
        setLoading(false);
      } catch (error) {
        setError('Failed to load videos.');
        setLoading(false);
      }
    };

    fetchVideos();
  }, [creator, excludeId]);

  if (loading) return <div>Loading more videos from {creator}...</div>;
  if (error) return <div>{error}</div>;
  if (videos.length === 0) return <div>No more videos from {creator}.</div>;

  return (
    <div className="wrap">   
     <div className="video-grid" style={{paddingTop: '0'}}>
      <p
        className="heading"
        style={{ fontSize: '15px', fontWeight: '600'}}
      >
        More from {creator}
      </p>
      {videos.map((video) => (
        <div key={video.id} className="video-card">
          <Link to={`/watch/${video.id}`}>
            <div className="img-container">
              <img src={video.thumbnail} alt={video.title} />
              <div className="video-info">
                <div className="container-title">
                  <h5>{video.author}</h5>
                  <h3>{video.title}</h3>
                </div>
                <img
                  src={play}
                  className="playBtn"
                  style={{ width: '40px', height: '40px' }}
                  alt="Play"
                />
              </div>
            </div>
          </Link>
        </div>
      ))}

    </div>
    <Link to="/videos">
        <p className="see-all">See all</p>
      </Link>
    </div>

  );
};

export default MoreOfCreator;
