import React from 'react';
import { creators } from './creators';
import { Link } from 'react-router-dom';

const ContentCreator = () => {
  const filterType = 'Creator';
  const filteredVideos = creators.filter(item => item.type === filterType); 

  return (
    <div className="wrap">
          <p className="heading" style={{fontSize: '28px', marginBottom: '0', paddingTop: '1em'}}>Content Creators</p>
    <div className="allnews-grid">
  
      {filteredVideos.map((newsItem) => (
        <div key={newsItem.id} className="allnews-card" style={{marginBottom:'1em'}}>
          <Link to={`/creator/${newsItem.id}`}>
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
            <div className="creator-info" style={{zIndex: '3'}}>
              <div className="content-title">
                <h5>Get to know:</h5>
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

export default ContentCreator;
