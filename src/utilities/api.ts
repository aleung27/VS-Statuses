import axios from "axios";
import https from "https";

// ! Change this to your locally running db for development!
export const baseUrl = "https://vsstatuses.ddns.net/";

/**
 * Create the new API from the suppliad base url
 */
const api = axios.create({
  // ! Uncomment this out for local running with a locally-hosted API
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false,
  // }),
  baseURL: baseUrl,
  timeout: 60000,
  timeoutErrorMessage: "Unable to reach server",
});

export default api;
