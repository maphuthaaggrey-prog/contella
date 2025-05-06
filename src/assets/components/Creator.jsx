import React from 'react';
import { creators } from './creators'; // Importing the news array

const Creator= () => {

  const filterType = 'Creator';
  const creator = creators.filter(item => item.type === filterType); 

  return (
    <>

    <div className="news-grid">
      {creator.slice(0, 1).map((newsItem) => (
        <div key={newsItem.id} className="news-card">
          <a href="" target="_blank" rel="noopener noreferrer">
            <div className="container">
              <img src={newsItem.thumbnail} alt={newsItem.title} />
            </div>
            <div className="creator-info">
              <div className="creator-title">
                <h5 style={{fontWeight: '800',  fontSize: '14px'}}>Get to know:</h5>
                <h3>{newsItem.title}</h3>
              </div>
              <div className="button-container">
                  <a href="" target="_blank" rel="noopener noreferrer">
                    <button className="read-more-btn">
                      Biography
                    </button>
                  </a>
                </div>
       
            </div>

          </a>
         
        </div>
      ))}
       <p className='more-stories'>More Creators</p>
      </div>
    </>
  );
};

export default Creator;
