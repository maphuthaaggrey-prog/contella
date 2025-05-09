import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import play from '../icons/HeroiconsSolidPlay.svg';
import { videos as videoData } from '../components/data/videos';
import { lekompo } from '../components/data/lekompo'; // 👈 import Lekompo data

const MoreOfCreator = ({ creator, excludeId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // 👇 Combine data sources
      const combinedData = [...videoData, ...lekompo];

      const filtered = combinedData.filter(
        (video) => video.author === creator && String(video.id) !== String(excludeId)
      );

      setVideos(filtered);
    } catch (err) {
      setError('Failed to load videos.');
    } finally {
      setLoading(false);
    }
  }, [creator, excludeId]);

  if (loading) return <div>Loading more videos from {creator}...</div>;
  if (error) return <div>{error}</div>;
  if (videos.length === 0) return <div>No more videos from {creator}.</div>;

  return (
    <div className="wrap">   
      <div className="video-grid" style={{ paddingTop: '0' }}>
        <p className="heading" style={{ fontSize: '15px', fontWeight: '600' }}>
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

        <p className="see-all" style={{visibility: 'hidden'}}>See all</p>

    </div>
  );
};

export default MoreOfCreator;
