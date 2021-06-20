import React, { useState, useEffect } from 'react';
import './Banner.css';
import requests from './requests';
import axios from './axios';

function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
    }

    fetchData();
    return () => {};
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner__contents">
        <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner__buttons">
          <div className="banner__button">Play</div>
          <div className="banner__button">My List</div>
        </div>
        <h2 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h2>
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
}

export default Banner;
