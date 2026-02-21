import axios from "axios";

const api = axios.create({
  baseURL: "https://eventdata.onrender.com",
  timeout: 60000, // 60 seconds wait
});

export const getStates = () => api.get("/states");

export const getCities = (state) =>
  api.get(`/cities/${state}`);

export const getEvents = (state, city) =>
  api.get(`/events?state=${state}&city=${city}`);