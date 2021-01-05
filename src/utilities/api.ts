import axios from "axios";
import https from "https";

const api = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  baseURL: "https://localhost:8000",
  timeout: 60000,
  timeoutErrorMessage: "Unable to reach server",
});

export default api;
