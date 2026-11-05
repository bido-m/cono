import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

export const userModel = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "branch_manager"),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);
