import React from 'react';
import { news } from './news';
import { Link } from 'react-router-dom';

const News = () => {
  const filterType = 'News';
  const filteredVideos = news.filter(item => item.type === filterType); 

  return (
    <div className="news-grid">
      {filteredVideos.slice(1, 2).map((newsItem) => (
        <div key={newsItem.id} className="news-card">
          <Link to={`/news/${newsItem.id}`}>
            <div className="container">
              <img src={newsItem.thumbnail} alt={newsItem.title} />
            </div>
            <div className="news-info">
              <div className="news-title">
                <h5>NEWS</h5>
                <h3>{newsItem.title}</h3>
              </div>
              <div className="button-container">
                <button className="read-more-btn">
                  Read More
                </button>
              </div>
            </div>
          </Link>
        </div>
      ))}
      <p className='more-stories'>More Stories</p>
    </div>
  );
};

export default News;
