import React from 'react';
import { useParams } from 'react-router-dom';
import { news } from './news';
import { useState } from 'react';
const NewsDetail = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageClick = (image) => {
        setSelectedImage(image);
      };
    
      const handleClose = () => {
        setSelectedImage(null);
      };
  const { id } = useParams();
  const newsItem = news.find(item => item.id === parseInt(id));

  if (!newsItem) return <p>News not found</p>;



  return (
<>
  
      
        {newsItem.thumbnail.endsWith('.mp4') ? (
          <div className="news-details-container">
          <video autoPlay muted loop>
            <source src={newsItem.thumbnail} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="news-info">
            <h1>{newsItem.title}</h1>
            <h4>NEWS • {newsItem.date} </h4>

        </div>
          </div>
        ) : (
          <div className="news-details-container">
          <img src={newsItem.thumbnail} alt={newsItem.title} />
          <div className="news-info">
            <h1>{newsItem.title}</h1>
            <h4>NEWS • {newsItem.date} </h4>

        </div>
          </div>
        )}

      
    <div className="news-detail">
      <div className="news-details-texts">

        <div id="updates-content">
  {Array.isArray(newsItem.content) ? (
    <>

      {newsItem.content.map((contentItem, index) => {
        if (typeof contentItem === 'string') {
          if (contentItem.startsWith('https://open.spotify.com')) {
            return (
              <iframe
                key={index}
                src={contentItem.replace('/album/', '/embed/album/')}
                frameBorder="0"
                allow="encrypted-media"
                allowTransparency="true"
                title={`Spotify embed ${index}`}
              ></iframe>
            );
          } else if (
            contentItem.includes('youtube.com') ||
            contentItem.includes('youtu.be')
          ) {
            const embedUrl = contentItem
              .replace('watch?v=', 'embed/')
              .replace('&t=', '?start=')
              .replace('youtu.be/', 'youtube.com/embed/');
            return (
              <iframe
                key={index}
                src={embedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`YouTube embed ${index}`}

              ></iframe>
            );
          } else {
            return <p id="updates-content-parag" key={index}>{contentItem}</p>;
          }
        }
        return null;
      })}
    </>
  ) : (
    <p>{newsItem.content}</p>
  )}
</div>


      </div>
      <p style={{marginBottom: '5px', marginTop: '2em'}} className='see-photos'>See photos</p>
      <div className="media-container">
        
        {newsItem.content.map((contentItem, index) => {
          if (typeof contentItem !== 'string' && contentItem.image) {
            return (
              <img
                key={index}
                className="media"
                src={contentItem.image}
                alt="visual"
                onClick={() => handleImageClick(contentItem.image)}
                style={{ borderRadius: '2px', height: 'auto' }}
              />
            );
          }
          return null;
        })}
      </div>
                                {selectedImage && (
                                    <div className="img-modal" onClick={handleClose}>
                                    <img src={selectedImage} alt="Full Size Poster" className="modal-image"  />

                                    </div>

                                )}
    </div>
</>
  );
};

export default NewsDetail;
