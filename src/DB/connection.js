import { Sequelize } from "sequelize";
import "dotenv/config"

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true,
    },
  },
  logging: console.log,
});

export const DBconn = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Authenticated Successfully");
    await sequelize.sync({ alter: true });
    console.log("All Tables Created & Synced Successfully");
  } catch (err) {
    console.error("Failed to connect or sync DB:", err);
  }
};
