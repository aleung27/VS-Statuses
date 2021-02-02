import axios from "axios";
import https from "https";

export const baseUrl = "https://localhost:8000";

/**
 * Create the new API from the suppliad base url
 * ! Remove the https agent for actual deployments!
 */
const api = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  baseURL: baseUrl,
  timeout: 60000,
  timeoutErrorMessage: "Unable to reach server",
});

export default api;
