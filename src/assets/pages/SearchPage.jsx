import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { news } from '../components/news';
import { creators } from '../components/creators';
import { videos as videoData } from '../components/data/videos'; 

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState({});
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const inputRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/search" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [location.pathname]);

  useEffect(() => {
  
    try {
      setVideos(videoData || []);
    } catch (err) {
      console.error('Error loading videos:', err);
      setError('Failed to load videos.');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase().trim();
    setQuery(searchQuery);

    if (!searchQuery) {
      setFilteredResults({});
      return;
    }

    const allData = [
      ...(videos?.map(item => ({ ...item, type: 'Video' })) || []),
      ...(news?.map(item => ({ ...item, type: 'News' })) || []),
      ...(creators?.map(item => ({ ...item, type: 'Creator' })) || [])
    ];

    const results = allData.filter(item =>
      (item.title && item.title.toLowerCase().includes(searchQuery)) ||
      (item.author && item.author.toLowerCase().includes(searchQuery)) ||
      (item.name && item.type.toLowerCase().includes(searchQuery))
    );

    const categorized = {};
    results.forEach(result => {
      if (!categorized[result.type]) {
        categorized[result.type] = [];
      }
      categorized[result.type].push(result);
    });

    setFilteredResults(categorized);
  };

  return (
    <main>
      <div className="search-container">
        <p className='heading-whats-new' style={{fontSize: '28px', marginBottom: '10px', marginTop: '1.5em'}}>Search</p>
        <input
          type="text"
          id="searchInput"
          placeholder="Search for news, content or content creators..."
          value={query}
          ref={inputRef}
          onChange={handleSearch}
        />

        <div id="single-image-container">
          {loading ? (
            <p className='search-text'>Loading...</p>
          ) : error ? (
            <p className='search-text'>{error}</p>
          ) : query.trim() === '' ? (
            <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* search icon path */}
            </svg>
          ) : Object.keys(filteredResults).length === 0 ? (
            <p className='search-text'>No results found for "{query}"</p>
          ) : (
            Object.keys(filteredResults).map(category => (
              <div key={category} className="category">
                <p className='heading-whats-new'>{category}</p>
                <div className="results-grid">
                  {filteredResults[category].map(result => (
                    <div key={result.id} className="result-item">
                      <Link
                        to={`/${category.toLowerCase()}/${result.id}`}
                        className="result-link"
                        aria-label={`View ${result.title || result.name}`}
                      >
                        {result.thumbnail && result.thumbnail.endsWith('.mp4') ? (
                          <video autoPlay muted loop>
                            <source src={result.thumbnail} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            src={result.image || result.thumbnail}
                            alt={result.title || result.name || 'Result'}
                            onError={(e) => {
                              e.target.src = 'path/to/fallback/image.jpg';
                            }}
                          />
                        )}
                        <p id="cover-name">{result.name || result.title}</p>
                        {result.content && <p id="story-description">{result.description}</p>}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
