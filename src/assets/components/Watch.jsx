import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MoreOfCreator from './MoreOfCreator';

const Watch = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pendingUrl, setPendingUrl] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`http://localhost:3000/videos/${id}`);
        if (!response.ok) throw new Error('Video not found');
        const data = await response.json();
        setVideo(data);
      } catch (error) {
        setError('Failed to load video.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  useEffect(() => {
    const handleExternalLinkClick = (e) => {
      const link = e.target.closest('a[target="_blank"]');
      if (link && link.href && !link.href.includes(window.location.hostname)) {
        e.preventDefault();
        setPendingUrl(link.href);
        setShowModal(true);
      }
    };

    document.addEventListener('click', handleExternalLinkClick);
    return () => {
      document.removeEventListener('click', handleExternalLinkClick);
    };
  }, []);

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url?.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : '';
  };

  if (loading) return <div>Loading video...</div>;
  if (error) return <div>{error}</div>;
  if (!video) return <div>Video not found</div>;

  return (
    <div className="watch-page">
      <div className="video-player">
        <iframe
          src={getYouTubeEmbedUrl(video.url)}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={video.title}
        ></iframe>
      </div>

      <h1 className="video-title">{video.title}</h1>
      <p className="date">Date Uploaded: {video.date}</p>
      <div className="channel-details">
        <div className="author-container">
          <img src={video.profile} alt={`${video.author}'s profile`} />
          <div className="channel">
            <p className="video-author">{video.author}</p>
            <p className="subs">{video.subscribers} Subscribers</p>
          </div>
        </div>

        <div className="like-and-dislike">
          <button className="like">
            <i>
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.9 4.5C15.9 3 14.418 2 13.26 2c-.806 0-.869.612-.993 1.82-.055.53-.121 1.174-.267 1.93-.386 2.002-1.72 4.56-2.996 5.325V17C9 19.25 9.75 20 13 20h3.773c2.176 0 2.703-1.433 2.899-1.964l.013-.036c.114-.306.358-.547.638-.82.31-.306.664-.653.927-1.18.311-.623.27-1.177.233-1.67-.023-.299-.044-.575.017-.83.064-.27.146-.475.225-.671.143-.356.275-.686.275-1.329 0-1.5-.748-2.498-2.315-2.498H15.5S15.9 6 15.9 4.5zM5.5 10A1.5 1.5 0 0 0 4 11.5v7a1.5 1.5 0 0 0 3 0v-7A1.5 1.5 0 0 0 5.5 10z" fill="white"/></svg>  
              <span>Like</span>
            </i>
          </button>
          <button className="dislike">
            <i>
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.1 20.5c0 1.5 1.482 2.5 2.64 2.5.806 0 .869-.613.993-1.82.055-.53.121-1.174.267-1.93.386-2.002 1.72-4.56 2.996-5.325V8C15 5.75 14.25 5 11 5H7.227C5.051 5 4.524 6.432 4.328 6.964A15.85 15.85 0 0 1 4.315 7c-.114.306-.358.546-.638.82-.31.306-.664.653-.927 1.18-.311.623-.27 1.177-.233 1.67.023.299.044.575-.017.83-.064.27-.146.475-.225.671-.143.356-.275.686-.275 1.329 0 1.5.748 2.498 2.315 2.498H8.5S8.1 19 8.1 20.5zM18.5 15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-3 0v7a1.5 1.5 0 0 0 1.5 1.5z" fill="#ffffff"/></svg>
              <span>Dislike</span>
            </i>
          </button>
        </div>
      </div>

      <div className="open-youtube">
        <button className="like" style={{ width: '140px' }}>
          <a
            href={video.channel}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="23px" height="23px"><path fill="currentColor" d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"/></svg>
            Youtube
          </a>
        </button>
      </div>

      <div className="line"></div>
      <p className="comments-count">
        Comments (+50) <a href={video.url} target="_blank" rel="noopener noreferrer">View on YouTube</a>
      </p>

      <div className="comment-section">
        <p className="user">Me</p>
        <div className="open-youtube-comment">
          <textarea placeholder="You can only comment on YouTube" readOnly></textarea>
          <button className="comment" style={{ height: '38px' }}>
            <a
              href={video.channel}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <svg fill="#ffffff" width="30px" height="30px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 5.438h17.406c1.375 0 2.5 1.125 2.5 2.5v10.563c0 1.375-1.125 2.5-2.5 2.5h-3.313l0.156 4.281c0 1.031-0.563 1.281-1.313 0.563l-4.906-4.844h-8.031c-1.375 0-2.5-1.125-2.5-2.5v-10.563c0-1.375 1.125-2.5 2.5-2.5z"></path>
                      </svg>
              Comment on YouTube
            </a>
          </button>
        </div>
      </div>

      {video && (
        <MoreOfCreator creator={video.author} excludeId={video.id} />
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>You're leaving Contella</h2>
            <p>Are you sure you want to continue to YouTube?</p>
            <div className="modal-buttons">
              <button
                onClick={() => {
                  window.open(pendingUrl, '_blank');
                  setShowModal(false);
                }}
              >
                Continue
              </button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watch;
