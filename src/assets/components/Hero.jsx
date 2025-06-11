import React from 'react';
import { creators } from './creators'; 
import { news } from './news.js'; 
import { Link } from 'react-router-dom'

const ContentDisplay = () => {

  const filterTypeCreator = 'Creator';
  const filterTypeNews = 'News';

  const filteredCreators = creators.filter(item => item.type === filterTypeCreator);
  const filteredNews = news.filter(item => item.type === filterTypeNews);

  return (
    <>
    <p className="heading-whats-new">Stay updated!</p>
      <div className="content-grid">
        
        {filteredCreators.slice(0, 1).map((item) => (
          <div>
          <div key={item.id} className="content-card">
            <Link to={`/creator/${item.id}`}>
              <div className="container">
                <img src={item.thumbnail} alt={item.title} />
                <div className="creator-info">
                <div className="creator-title">
                  <h5 style={{ fontWeight: '800', fontSize: '14px' }}>Get to know:</h5>
                  <h3>{item.title}</h3>
                </div>
                <div className="button-container">
                  <Link to={`/creator/${item.id}`}>
                    <button className="read-more-btn">Biography</button>
                  </Link>
                </div>
              </div>
              </div>    
            </Link>
          </div>
          <Link to="/creators"><p className='see-all'>See all</p></Link> 

          </div>
        ))}         
        {filteredNews.slice(1, 2).map((item) => (
          <div>
          <div key={item.id} className="content-card">
            <Link to={`/news/${item.id}`}>
              <div className="container">
                <img src={item.thumbnail} alt={item.title} />
                
                <div className="news-info">
                <div className="news-title">
                  <h5>NEWS</h5>
                  <h3>{item.title}</h3>
                </div>
                <div className="button-container">
                  <Link to={`/news/${item.id}`}>
                    <button className="read-more-btn">Read More</button>
                  </Link>
                </div>
              </div>
              </div>
             
            </Link>
          </div>
          <Link to="/news"><p className='see-all'>See all</p></Link> 

          </div>
        ))}
        
      </div>
    </>
  );
};

export default ContentDisplay;
