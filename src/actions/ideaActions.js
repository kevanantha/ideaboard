import axios from 'axios';

const apiUrl = "http://localhost:3001/api/v1/ideas.json";

export const loadAlldIdeas = () => {
  return (dispatch) => {
    return axios.get(`${apiUrl}`)
    .then(res => {
      dispatch({
        type: "IDEA/LOAD_ALL_IDEAS",
        payload: res.data
      })
    })
  }
}
