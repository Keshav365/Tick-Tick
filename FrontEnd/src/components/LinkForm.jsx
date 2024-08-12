import React, { useState } from 'react';
import axios from 'axios';
import './CSS/card.css';

export default function LinkForm({ onClose, userId, fetchLink }) {
  const [nameLength, setNameLength] = useState(0);
  const [link, setLink] = useState({
    name: '',
    url: '',
    type: 'video' // Default to 'video'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLink({ ...link, [name]: value });

    if (name === 'name') {
      setNameLength(value.length);
    }
  };

  const handleTypeChange = (type) => {
    setLink({ ...link, type });
  };

  const isValidYouTubeLink = (url) => {
    const videoRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&=%]{11})/;
    const playlistRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/.*[?&]list=([^&=%]+)/;
    return videoRegex.test(url) || playlistRegex.test(url);
  };

  const extractId = (url) => {
    const videoRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const playlistRegex = /[?&]list=([^&]+)/;

    const match = link.type === 'video' ? url.match(videoRegex) : url.match(playlistRegex);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if (!isValidYouTubeLink(link.url)) {
      alert(`Please enter a valid YouTube ${link.type} link.`);
      return;
    }

    const id = extractId(link.url);
    if (!id) {
      alert(`Unable to extract ${link.type} ID. Please check the URL.`);
      return;
    }

    const embeddedUrl =
      link.type === 'video'
        ? `https://www.youtube.com/embed/${id}?enablejsapi=1`
        : `https://www.youtube.com/embed/videoseries?list=${id}&enablejsapi=1`;

    const linkWithUserId = {
      name: link.name,
      link: embeddedUrl,
      userId: userId
    };

    console.log('link object being sent:', linkWithUserId);

    try {
      const baseUrl = "http://localhost:8081/api/links";
      const method = "PUT";
      const contentType = "application/json";

      console.log('Sending request:', {
        method,
        url: `${baseUrl}/${userId}`,
        headers: {
          'Content-Type': contentType
        },
        data: linkWithUserId
      });
      fetchLink();

      const res = await axios({
        method: method,
        url: `${baseUrl}/${userId}`,
        headers: {
          'Content-Type': contentType
        },
        data: linkWithUserId
      });
      const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidYouTubeLink(link.url)) {
          alert(`Please enter a valid YouTube ${link.type} link.`);
          return;
        }

        const id = extractId(link.url);
        if (!id) {
          alert(`Unable to extract ${link.type} ID. Please check the URL.`);
          return;
        }

        const embeddedUrl =
          link.type === 'video'
            ? `https://www.youtube.com/embed/${id}?enablejsapi=1`
            : `https://www.youtube.com/embed/videoseries?list=${id}&enablejsapi=1`;

        const linkWithUserId = {
          name: link.name,
          link: embeddedUrl,
          userId: userId
        };

        console.log('link object being sent:', linkWithUserId);

        try {
          const baseUrl = "http://localhost:8081/api/links";
          const method = "PUT";
          const contentType = "application/json";

          console.log('Sending request:', {
            method,
            url: `${baseUrl}/${userId}`,
            headers: {
              'Content-Type': contentType
            },
            data: linkWithUserId
          });
          fetchLink()
          const res = await axios({
            method: method,
            url: `${baseUrl}/${userId}`,
            headers: {
              'Content-Type': contentType
            },
            data: linkWithUserId
          });
          fetchLink()
          console.log('Response from server:', res.data);
          onClose();
        } catch (error) {
          console.log('Error adding link:', error);
          if (error.response) {
            console.log('Error response data:', error.response.data);
            console.log('Error response status:', error.response.status);
            console.log('Error response headers:', error.response.headers);
          } else if (error.request) {
            console.log('Error request data:', error.request);
          } else {
            console.log('Error message:', error.message);
          }
        }
      };

      console.log('Response from server:', res.data);
      onClose();
    } catch (error) {
      console.log('Error adding link:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
        console.log('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.log('Error request data:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
    }
    fetchLink()
  };


  return (
    <div className="loginDiv">
      <h3 className="text-whitesmoke">Add YouTube Link</h3>
      <div className="container-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={handleChange}
              placeholder="Title"
              value={link.name}
              required
              maxLength={1000}
            />
            <small>{nameLength}/1000</small>
          </div>
          <div className="form-group">
            <input
              type="url"
              className="form-control"
              name="url"
              onChange={handleChange}
              placeholder="Link URL"
              value={link.url}
              required
            />
          </div>
          <div className="form-group">
            <div className="btn-group">
              <button
                type="button"
                className={` ${link.type === 'video' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleTypeChange('video')}
              >
                Video
              </button>
              <button
                type="button"
                className={` ${link.type === 'playlist' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleTypeChange('playlist')}
              >
                Playlist
              </button>
            </div>
          </div>
          <button type="submit" className="form-button button-l margin-b">Add Link</button>
          <button type="button" className="form-button button-l margin-b" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
