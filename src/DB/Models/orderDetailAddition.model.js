import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

export const orderDetailAdditionModel = sequelize.define(
  "order_detail_addition",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_detail_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    addition_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    addition_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);
