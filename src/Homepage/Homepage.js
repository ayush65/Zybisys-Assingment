/** @format */

import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";

import "./Homepage.css";

const initState = { data: [], genre: "", url: "", search: "" };

const projectsReducer = (state, action) => {
  let filterStateCopy = { ...state };
  switch (action.type) {
    case "FETCH_PROJECTS":
      let { data } = action.payload;
      // console.log(action.payload);
      // console.log(data);
      return { ...filterStateCopy, data };

    case "FETCH_PROJECTSs":
      // console.log(filterStateCopy);
      // console.log(action.payload.data);
      filterStateCopy = {
        ...filterStateCopy,

        data: action.payload.data.filter((value, i) => {
          if (action.payload.data[i].genres[0].name === action.payload.genre) {
            return value;
          } else {
            return false;
          }
          //console.log(anime[i].genres[0].name);
        }),
      };
      return { ...filterStateCopy };

    case "FETCH_PROJECTSss":
      console.log(action.payload);
      console.log(action.payload.data[0].title);
      filterStateCopy = {
        ...filterStateCopy,

        data: action.payload.data.filter((value, i) => {
          if (
            action.payload.data[i].title
              .toLowerCase()
              .includes(action.payload.search)
          ) {
            return value;
          } else {
            return false;
          }

          //console.log(anime[i].genres[0].name);
        }),
      };
      return { ...filterStateCopy };

    default:
      return state;
  }
};

const Homepage = () => {
  const [anime, setAnime] = useState([]);
  const [projects, projectsDispatch] = useReducer(projectsReducer, initState);

  const [value, setValue] = useState("");

  const [category, setCategory] = useState("");

  useEffect(() => {
    const initFetch = async () => {
      const options = {
        method: "GET",
        url: "https://api.jikan.moe/v4/anime",
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data.data);
          setAnime(response.data.data);

          projectsDispatch({
            type: "FETCH_PROJECTS",
            payload: { data: response.data.data },
          });

          //  console.log(anime[5].genres[0].name);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    initFetch();
  }, []);

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
                onChange={(e) => {
                  setValue(e.target.value);
                  projectsDispatch({
                    type: "FETCH_PROJECTSss",
                    payload: { search: value, data: anime },
                  });
                }}
              />
              <button
                className='search-button'
                onClick={() =>
                  projectsDispatch({
                    type: "FETCH_PROJECTSss",
                    payload: { search: value, data: anime },
                  })
                }>
                Search
              </button>
            </div>
          </ul>
        </div>
      </div>
      <div>
        {" "}
        <div>
          {" "}
          <button
            className='search-button'
            onClick={() => {
              setCategory("Comedy");
              projectsDispatch({
                type: "FETCH_PROJECTSs",
                payload: { genre: category, data: anime },
              });
            }}>
            Comedy
          </button>
        </div>
        <div>
          {" "}
          <button
            className='search-button'
            onClick={() => {
              setCategory("Action");
              projectsDispatch({
                type: "FETCH_PROJECTSs",
                payload: { genre: category, data: anime },
              });
            }}>
            Action
          </button>
        </div>
        <div>
          {" "}
          <button
            className='search-button'
            onClick={() => {
              setCategory("Adventure");
              projectsDispatch({
                type: "FETCH_PROJECTSs",
                payload: { genre: category, data: anime },
              });
            }}>
            Adventure
          </button>
        </div>
        <div>
          {" "}
          <button
            className='search-button'
            onClick={() => {
              setCategory("Drama");
              projectsDispatch({
                type: "FETCH_PROJECTSs",
                payload: { genre: category, data: anime },
              });
            }}>
            Drama
          </button>
        </div>
        <div>
          {" "}
          <button
            className='search-button'
            onClick={() => {
              setCategory("Sports");
              projectsDispatch({
                type: "FETCH_PROJECTSs",
                payload: { genre: category, data: anime },
              });
            }}>
            Sports
          </button>
        </div>
        <div>
          {" "}
          <button
            className='search-button'
            onClick={() => {
              setCategory("Avant Garde");
              projectsDispatch({
                type: "FETCH_PROJECTSs",
                payload: { genre: category, data: anime },
              });
            }}>
            Avant Garde
          </button>
        </div>
      </div>
      <div className='menu-container'>
        {projects.data.map((item, key) => {
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
              <p>{item.genres[0].name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;
