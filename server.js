import config from "./src/utils/config.js";
import apiAuth from "./src/utils/apiAuth.js";
const { API_USERNAME, API_PASSWORD } = config;

const token = btoa(`${API_USERNAME}:${API_PASSWORD}`);
console.log(token);

const realToken = `Basic ${token}`;
console.log(apiAuth(realToken));

