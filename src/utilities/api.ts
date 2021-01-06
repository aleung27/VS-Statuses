import axios from "axios";
import https from "https";

export const baseUrl = "https://localhost:8000";

const api = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  baseURL: baseUrl,
  timeout: 60000,
  timeoutErrorMessage: "Unable to reach server",
});

export default api;
