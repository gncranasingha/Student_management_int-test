import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5004/api", 
  headers: {
    "Content-Type": "application/json",
  },
});


const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = token;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export { api, setAuthToken };