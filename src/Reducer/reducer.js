/** @format */

export const initState = {
  data: [],
  genre: "",
  url: "",
  search: "",
  dragable: [],
  id: [],
  dragid: [],
};

export const projectsReducer = (state, action) => {
  let filterStateCopy = { ...state };
  switch (action.type) {
    case "FETCH_DATA":
      let { data } = action.payload;
      console.log(action.payload);
      // console.log(data);
      return { ...filterStateCopy, data };

    case "FETCH_GENRE_NAME":
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

    case "FETCH_DRAGDATA":
      console.log(filterStateCopy);
      //console.log(action.payload.data, action.payload.dragable);

      // console.log(
      //   action.payload.dragable[0].mal_id.toString() === action.payload.id
      // );
      //   console.log(action.payload.dragable[0].mal_id);
      filterStateCopy = {
        ...filterStateCopy,

        dragable: action.payload.dragable.filter((value, i) => {
          if (
            action.payload.dragable[i].mal_id.toString() ===
            action.payload.dragid
          ) {
            return value;
          } else {
            return false;
          }
          //console.log(anime[i].genres[0].name);
        }),
      };
      return { ...filterStateCopy };

    case "FETCH_SEARCH_NAME":
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
