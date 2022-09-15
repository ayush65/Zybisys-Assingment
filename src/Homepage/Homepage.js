/** @format */

import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { projectsReducer, initState } from "../Reducer/reducer";

import "./Homepage.css";

const Homepage = () => {
  const [anime, setAnime] = useState([]);
  const [projects, projectsDispatch] = useReducer(projectsReducer, initState);

  const [id, setId] = useState([]);
  // console.log(id);

  const [value, setValue] = useState("");

  const dragStared = (e, id) => {
    console.log("drag has started", id);
    e.dataTransfer.setData("mal_id", id);
  };

  const draggingOver = (e) => {
    e.preventDefault();
    console.log("Dragging Over Now");
  };

  const dragDrop = (e) => {
    let transferredId = e.dataTransfer.getData("mal_id");
    console.log("hi", transferredId);
    setId(transferredId);

    projectsDispatch({
      type: "FETCH_DRAGDATA",
      payload: { dragid: transferredId, dragable: anime },
    });
  };

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
            type: "FETCH_DATA",
            payload: { data: response.data.data, dragable: response.data.data },
          });

          //  console.log(anime[5].genres[0].name);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    initFetch();

    localStorage.setItem("id", JSON.stringify(id));
  }, [id]);

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
                    type: "FETCH_SEARCH_NAME",
                    payload: { search: value, data: anime },
                  });
                }}
              />
              <button
                className='search-button button'
                onClick={() =>
                  projectsDispatch({
                    type: "FETCH_SEARCH_NAME",
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
        <h1>click on th button to get genre</h1>{" "}
        <div>
          {" "}
          <button
            className='search-button'
            onClick={() => {
              projectsDispatch({
                type: "FETCH_DATA",
                payload: { data: anime },
              });
            }}>
            All
          </button>
        </div>
        <div>
          {" "}
          <button
            className='search-button'
            onClick={() => {
              projectsDispatch({
                type: "FETCH_GENRE_NAME",
                payload: { genre: "Comedy", data: anime },
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
              projectsDispatch({
                type: "FETCH_GENRE_NAME",
                payload: { genre: "Action", data: anime },
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
              projectsDispatch({
                type: "FETCH_GENRE_NAME",
                payload: { genre: "Adventure", data: anime },
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
              projectsDispatch({
                type: "FETCH_GENRE_NAME",
                payload: { genre: "Drama", data: anime },
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
              projectsDispatch({
                type: "FETCH_GENRE_NAME",
                payload: { genre: "Sports", data: anime },
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
              projectsDispatch({
                type: "FETCH_GENRE_NAME",
                payload: { genre: "Avant Garde", data: anime },
              });
            }}>
            Avant Garde
          </button>
        </div>
      </div>
      <div className='menu-container'>
        {projects.data.map((item, key) => {
          return (
            <div
              className='card'
              draggable
              onDragStart={(e) => dragStared(e, item.mal_id)}
              key={item.mal_id}>
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
      <div
        className='menuu-container'
        droppable
        onDrop={(e) => dragDrop(e)}
        onDragOver={(e) => draggingOver(e)}>
        <h1>WatchLater</h1>
        <h3>Drag and drop your movies here</h3>
        {console.log(projects.dragable)}
        {projects.dragable.map((item, key) => {
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
