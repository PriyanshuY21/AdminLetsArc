import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:8001/backend",
  // baseURL: "https://app.letsarc.com/backend",
});

export default axios;
