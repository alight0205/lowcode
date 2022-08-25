import axios from "axios";

const instance = axios.create({
  baseURL:"http://heiza.work:2277"
})

export default instance;