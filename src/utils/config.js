import "dotenv/config";
const config = {
  DATABASE_URL: process.env.DATABASE_URL,
  API_USERNAME: process.env.API_USERNAME,
  API_PASSWORD: process.env.API_PASSWORD,
};

export default config;