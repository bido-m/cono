import config from "./config.js";
const getApiAuth = (authHeader) => {
  const { API_USERNAME, API_PASSWORD } = config;
  if (!authHeader) return false;
  const [type, token] = authHeader.trim().split(" ");
  if (type != "Basic" || !token) return false;
  const decodedToken = Buffer.from(token, "base64").toString("utf-8");
  try {
      const colonIndex = decodedToken.indexOf(":");
      if (colonIndex === -1) return false;
      const username = decodedToken.substring(0, colonIndex);
      const password = decodedToken.substring(colonIndex + 1);
      return username === API_USERNAME && password === API_PASSWORD;
  } catch (err) {
    return false;
  }
};

export default getApiAuth;
