import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "neondb",
  "neondb_owner",
  "npg_5qAW1czeCwVH",
  {
    host: "ep-tiny-forest-b47aqlur-pooler.c-6.us-east-2.aws.neon.tech",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
      },
    },
    logging: false,
  }
);

export const DBconn = async () => {
  return await sequelize.sync({alter:true})
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch((err) => {
    console.log("Failed to connect to DB",err);
  })
};
