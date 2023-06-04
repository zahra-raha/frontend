import axios from "axios";

const axiosRequest = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    Authorization : `Token ${sessionStorage.getItem("token")}`,
  }
});

export { axiosRequest };

