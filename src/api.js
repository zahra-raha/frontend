import axios from "axios";

const axiosRequest = axios.create({
  baseURL: "https://backend-market.herokuapp.com/",
  headers: {
    Authorization : `Token ${sessionStorage.getItem("token")}`,
  }
});

export { axiosRequest };

