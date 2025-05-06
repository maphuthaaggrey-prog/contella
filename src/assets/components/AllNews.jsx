import React from 'react';
import { news } from './news';
import { Link } from 'react-router-dom';

const AllNews = () => {
  const filterType = 'News';
  const filteredVideos = news.filter(item => item.type === filterType); 

  return (
    <div className="wrap">
          <p className="heading" style={{fontSize: '28px', marginBottom: '0', paddingTop: '1em'}}>News</p>
    <div className="allnews-grid" style={{   marginBottom: '1em'}}>
  
      {filteredVideos.map((newsItem) => (
        <div key={newsItem.id} className="allnews-card" style={{  marginBottom: '1em'}}>
          <Link to={`/news/${newsItem.id}`}>
            <div className="img-container">
                        {newsItem.thumbnail.endsWith('.mp4') ? (
                    <video autoPlay muted loop>
                        <source src={newsItem.thumbnail} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    ) : (
                    <img src={newsItem.thumbnail} alt={newsItem.title} />
                    )}
            </div>
            <div className="video-info">
              <div className="container-title">
                <h5>NEWS</h5>
                <h3>{newsItem.title}</h3>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
    </div>
  );
};

export default AllNews;
