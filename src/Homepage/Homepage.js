/** @format */

import axios from "axios";
import React, { useState } from "react";

import "./Homepage.css";

const Homepage = () => {
  const [anime, setAnime] = useState([]);

  const [value, setValue] = useState("");

  const [category, setCategory] = useState("");

  const ApiCallAnime = () => {
    const options = {
      method: "GET",
      url: "https://api.jikan.moe/v4/anime",
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.data);
        setAnime(response.data.data);
        console.log(anime[5].genres[0].name);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  if (value === "") {
    ApiCallAnime();
  }
  const getAnime = async () => {
    return await axios
      .get(`https://api.jikan.moe/v4/anime?q=${value}`)
      .then(function (response) {
        //console.log(response.data.data);
        setAnime(response.data.data);
      });
  };

  const getAnimeCat = async () => {
    return await axios
      .get(`https://api.jikan.moe/v4/anime?q=${value}?=${category}`)
      .then(function (response) {
        console.log(response.data.data[0].genres[0].name === category);

        if (response.data.data[0].genres[0].name === category) {
          setAnime(response.data.data);
        }

        anime.genres[0].name.filter((value) => {
          return value;
        });

        console.log(anime);
      });
  };

  return (
    <div>
      <div className='navbar-container'>
        <div className='navbar-logo'>
          <h1 className='navbar-h1s-header'>
            <h8>Zybisys Assignment</h8>
          </h1>
        </div>
        <div>
          <ul className='navbar-list-h1s'>
            <div className='form'>
              <input
                type='text'
                id='email'
                className='form__input'
                autoComplete='off'
                placeholder=' Search Name'
                onChange={(e) => setValue(e.target.value)}
              />
              <button className='search-button' onClick={() => getAnime()}>
                Search
              </button>
              <button
                className='search-button'
                onClick={() => {
                  ApiCallAnime();
                }}>
                Reset
              </button>
            </div>
          </ul>

          <div>
            {" "}
            <div>
              {" "}
              <button
                className='search-button'
                onClick={() => {
                  setCategory("Comedy");
                  getAnimeCat();
                }}>
                Comedy
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='menu-container'>
        {anime.map((item, key) => {
          return (
            <div className='card' key={item.mal_id}>
              <img
                className='img-grid'
                src={item.images.jpg.image_url}
                alt={item.photoAlt}
              />
              <h4>
                <b>{item.title}</b>
              </h4>
              <p>{item.rating}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;
