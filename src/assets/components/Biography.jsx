import React from 'react';
import { useParams } from 'react-router-dom';
import { creators } from './creators';
import { useState } from 'react';
const Biography = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageClick = (image) => {
        setSelectedImage(image);
      };
    
      const handleClose = () => {
        setSelectedImage(null);
      };
  const { id } = useParams();
  const newsItem = creators.find(item => item.id === parseInt(id));

  if (!newsItem) return <p>News not found</p>;



  return (

<>
      <div className="bio-details-container">
        {newsItem.thumbnail.endsWith('.mp4') ? (
          <video autoPlay muted loop>
            <source src={newsItem.thumbnail} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="news-details-container">
          <img src={newsItem.thumbnail} alt={newsItem.title} />
          <div className="news-info">
          <h4>GET TO KNOW:</h4>
            <h1>{newsItem.title}</h1>
                  

              </div>
              
                </div>
                
        )}

      </div>
    <div className="news-detail">
      <div className="bio-image-dektop"> 
    <img src={newsItem.thumbnail} alt={newsItem.title} />
    </div>
    
    <div className="social-links">

                  {newsItem.youtube && (
                      <button className="like" style={{ width: '120px' }}>
                        <a
                          href={newsItem.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="23px" height="23px"><path fill="currentColor" d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"/></svg>
                          Youtube
                        </a>
                      </button>
                  )}
                  {newsItem.instagram && (
                      <button className="like" style={{ width: '120px' }}>
                        <a
                          href={newsItem.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                                    <svg width="19px" height="19px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#ffffff"/>
                                    <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#0ffffff"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="#ffffff"/>
                                    </svg>
                          Instagram
                        </a>
                      </button>

                  )}
</div>
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
                style={{ marginTop: '2em' }}
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

export default Biography;
