import React, { useState, useEffect } from 'react';
import './admin.css';

// Author metadata as a string
const authorInfoString = `{
  "Sonwabile": {
    "type": "Vlog",
    "profile": "https://yt3.googleusercontent.com/xcVx5LSUT5iv0DEN3RS0flOSqStdPYLdRIj9GjzPZYNh8x7QbQgl-9FjDe5UDs8FmdFga68ewQ=s160-c-k-c0x00ffffff-no-rj",
    "subscribers": "265K",
    "channel": "https://www.youtube.com/@SonwabileDovii"
  },
  "Domingos": {
    "type": "Vlog",
    "profile": "https://yt3.ggpht.com/ERbziNQhirEWXIn0vZ2B3-BvBbbf_fvJaHHMaZW6Evw0ZwgnVKma3yus2j_qu-5QcQb9Tj_UJw=s176-c-k-c0x00ffffff-no-rj-mo",
    "subscribers": "52K",
    "channel": "https://www.youtube.com/@justdomingos"
  },
  "Ghost Hlubi": {
    "type": "Vlog",
    "profile": "https://yt3.googleusercontent.com/ytc/AIdro_nnmJt61uxn8RTBIEr48i4GIWy0375Xl9kp26mfWf8zqVU=s176-c-k-c0x00ffffff-no-rj-mo",
    "subscribers": "1M",
    "channel": "https://www.youtube.com/@ghosthlubi"
  },
  "King Oumar": {
    "type": "Vlog",
    "profile": "https://yt3.googleusercontent.com/ytc/AIdro_ke4FVZ1ZdadFLXy-T3Qd7on4GboDJ0WTqWEcoguzWkgvDi=s176-c-k-c0x00ffffff-no-rj-mo",
    "subscribers": "350k",
    "channel": "https://www.youtube.com/@KINGOUMAR"
  },
  "Zillewizzy": {
    "type": "Vlog",
    "profile": "https://yt3.ggpht.com/CB74Ua7hqbGU-BI0GaQy9D6ygglegWMoW4vITgWAv2mJZ-jmG2jbu-QxBXUM-g0U943VKwhvtSA=s176-c-k-c0x00ffffff-no-rj-mo",
    "subscribers": "252k",
    "channel": "https://www.youtube.com/@zillewizzy"
  },
  "Brvce": {
    "type": "Vlog",
    "profile": "https://yt3.googleusercontent.com/7K-wsJIAg8Co5KjvJGg8JhgVRn72N1iR6rwCWx0x5ZbbYlvSgPDHjVxBLMoW6elj8hhStjzpmd8=s160-c-k-c0x00ffffff-no-rj",
    "subscribers": "58k",
    "channel": "https://www.youtube.com/@complaints.dep.artment"
  },
  "Podcast and Chill": {
    "type": "Podcast",
    "profile": "https://yt3.ggpht.com/oroxzEPE5giQ8hUcYUFqsmVcxZjxlP0KOzgOf1prL025Q-jxmhynAtQCZn0U2c3W0BdcTvs3=s176-c-k-c0x00ffffff-no-rj-mo",
    "subscribers": "1.57M",
    "channel": "https://www.youtube.com/@podcastandchillnetwork"
  },
  "Spreading Humours": {
    "type": "Podcast",
    "profile": "https://yt3.ggpht.com/oroxzEPE5giQ8hUcYUFqsmVcxZjxlP0KOzgOf1prL025Q-jxmhynAtQCZn0U2c3W0BdcTvs3=s176-c-k-c0x00ffffff-no-rj-mo",
    "subscribers": "1.57M",
    "channel": "https://www.youtube.com/@podcastandchillnetwork"
  },
  "Piano Pulse": {
    "type": "Podcast",
    "profile": "https://yt3.ggpht.com/oroxzEPE5giQ8hUcYUFqsmVcxZjxlP0KOzgOf1prL025Q-jxmhynAtQCZn0U2c3W0BdcTvs3=s176-c-k-c0x00ffffff-no-rj-mo",
    "subscribers": "1.57M",
    "channel": "https://www.youtube.com/@podcastandchillnetwork"
  },
  "Popcorn and Chill": {
    "type": "Podcast",
    "profile": "https://yt3.ggpht.com/oroxzEPE5giQ8hUcYUFqsmVcxZjxlP0KOzgOf1prL025Q-jxmhynAtQCZn0U2c3W0BdcTvs3=s176-c-k-c0x00ffffff-no-rj-mo",
    "subscribers": "1.57M",
    "channel": "https://www.youtube.com/@podcastandchillnetwork"
  },
  "Open Chats": {
    "type": "Podcast",
    "profile": "https://yt3.ggpht.com/1ZgfDEDiAEti-DOag95F5GvrcQAQb3P9Qtb5UWyIEjlawj4JNkC1YlPbU9wos-b_mG19nI0G=s176-c-k-c0x00ffffff-no-rj-mo",
    "subscribers": "320k",
    "channel": "https://www.youtube.com/@OpenChatsPodcast"
  },
  "L-Tido Podcast": {
    "type": "Podcast",
    "profile": "https://yt3.googleusercontent.com/CCgxa9yGpO5IjgKYXus_tza-wEwJkF8lLd7jhliMkqckA71tKecUMkIlk2YrtFPkeHV1yDBEfA=s176-c-k-c0x00ffffff-no-rj-mo",
    "subscribers": "137k",
    "channel": "https://www.youtube.com/@L-tidoNetwork"
  }
}`;

const authorInfo = JSON.parse(authorInfoString);

const AdminUpload = () => {
  const [formData, setFormData] = useState({
    author: "Sonwabile",
    title: "",
    thumbnail: "",
    url: "",
    date: ""
  });

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const PASSWORD = "109contella83";

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:3000/videos');
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const info = authorInfo[formData.author];

    const newVideo = {
      id: Date.now(),
      author: formData.author,
      type: info.type,
      title: formData.title,
      url: formData.url,
      profile: info.profile,
      thumbnail: formData.thumbnail,
      subscribers: info.subscribers,
      channel: info.channel,
      date: formData.date
    };

    try {
      const response = await fetch('http://localhost:3000/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVideo)
      });

      if (!response.ok) throw new Error('Failed to add video');

      const addedVideo = await response.json();
      setVideos(prev => [...prev, addedVideo]);

      setFormData({
        author: "Sonwabile",
        title: "",
        thumbnail: "",
        url: "",
        date: ""
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="wrap">
        <div className="admin-form">
          <h2>Enter Admin Password</h2>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter password"
              required
            />
            <button type="submit">Enter</button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="wrap">
      <div className='admin-form'>
        <h2>Upload Youtube Videos</h2>
        <form onSubmit={handleSubmit}>
          <label>Select Author:</label>
          <select name="author" value={formData.author} onChange={handleChange}>
            {Object.keys(authorInfo).map(author => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>

          <input
            name="title"
            placeholder="Video Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            name="url"
            placeholder="Video URL"
            value={formData.url}
            onChange={handleChange}
            required
          />

          <input
            name="thumbnail"
            placeholder="Thumbnail URL"
            value={formData.thumbnail}
            onChange={handleChange}
            required
          />

          <input
            name="date"
            placeholder="e.g. March 11, 2025"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default AdminUpload;
