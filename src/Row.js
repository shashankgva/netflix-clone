import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const image_base_url = 'https://image.tmdb.org/t/p/original/';

function Row(props) {
  const { title, fetchUrl, isLargeRow } = props;

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(fetchUrl);
      console.log(response);
      setMovies(response.data.results);
    };

    fetchData();
    return () => {};
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const imgClickHandler = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      console.log(`movie name>>>>${movie?.name}`);
      movieTrailer(movie?.name || '')
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        })
        .catch((error) => console.log('movie trailer error :>> ', error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => imgClickHandler(movie)}
            src={`${image_base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
