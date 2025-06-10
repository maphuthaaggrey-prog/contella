import React from 'react';
import { Link } from 'react-router-dom'
import { news } from './news'; 

const MainHero = () => {
  const filterType = 'News';
  const filteredVideos = news
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .filter(item => item.type === filterType);

  return (
    <>
      <div className="news-grid">
        {filteredVideos.slice(0, 1).map((newsItem) => (
          <div key={newsItem.id} className="news-card">
          <Link to={`/news/${newsItem.id}`}>
              <div className="main-container">
                {newsItem.thumbnail.endsWith('.mp4') ? (
                  <video 
                    src={newsItem.thumbnail}
                    autoPlay
                    muted
                    loop
                  />
                ) : (
                  <img 
                    src={newsItem.thumbnail} 
                    alt={newsItem.title} 
                  />
                )}
              </div>
              <div className="news-info" id="headline">
                <div className="news-title">
                  <h5>NEWS</h5>
                  <h3>{newsItem.title}</h3>
                </div>
                <div className="button-container">
                <Link to={`/news/${newsItem.id}`}>
                    <button className="read-post-btn">
                      Read post
                    </button>
                  </Link>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainHero;
