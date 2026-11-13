import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

export const sizeModel = sequelize.define(
  "size",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    size_name: {
      type: DataTypes.STRING(55),
      allowNull: false,
      unique: true,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
  },
);
