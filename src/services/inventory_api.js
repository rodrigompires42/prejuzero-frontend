import axios from "axios";

const inventory_api = axios.create({
  baseURL: process.env.REACT_APP_API_INVENTORY_URL,
});

export default inventory_api;
