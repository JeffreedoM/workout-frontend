import axios from "axios";

const BASE_URL = "https://workout-backend-oheu.onrender.com/";
export default axios.create({
  baseURL: BASE_URL,
});
