import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { news } from '../components/news';
import { creators } from '../components/creators';

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
        const fetchVideos = async () => {
            try {
                const response = await fetch('http://localhost:3000/videos');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setVideos(data.videos || []);
            } catch (err) {
                console.error('Error fetching videos:', err);
                setError('Failed to load videos.');
                setVideos([]);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
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
                            <path  d="M11.0002 20.01C15.9763 20.01 20.0102 15.9761 20.0102 11C20.0102 6.0239 15.9763 1.98999 11.0002 1.98999C6.02415 1.98999 1.99023 6.0239 1.99023 11C1.99023 15.9761 6.02415 20.01 11.0002 20.01Z" fill="currentColor"/>
                            <path d="M14 10.25H8C7.59 10.25 7.25 9.91 7.25 9.5C7.25 9.09 7.59 8.75 8 8.75H14C14.41 8.75 14.75 9.09 14.75 9.5C14.75 9.91 14.41 10.25 14 10.25Z" fill="white"/>
                            <path d="M11 13.25H8C7.59 13.25 7.25 12.91 7.25 12.5C7.25 12.09 7.59 11.75 8 11.75H11C11.41 11.75 11.75 12.09 11.75 12.5C11.75 12.91 11.41 13.25 11 13.25Z" fill="white"/>
                            <path d="M21.9901 18.95C21.6601 18.34 20.9601 18 20.0201 18C19.3101 18 18.7001 18.29 18.3401 18.79C17.9801 19.29 17.9001 19.96 18.1201 20.63C18.5501 21.93 19.3001 22.22 19.7101 22.27C19.7701 22.28 19.8301 22.28 19.9001 22.28C20.3401 22.28 21.0201 22.09 21.6801 21.1C22.2101 20.33 22.3101 19.56 21.9901 18.95Z" fill="currentColor"/>
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
                                                    <video
                                                        autoPlay
                                                        muted
                                                        loop
                                                        >
                                                        <source 
                                                             src={result.thumbnail} 
                                                             type="video/mp4" />
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
