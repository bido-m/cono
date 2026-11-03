import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

export const orderModel = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    order_type: {
      type: DataTypes.ENUM("delivery", "pickup"),
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    reserve_phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    address_details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    delivery_zone_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    kitchen_notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    order_status: {
      type: DataTypes.ENUM(
        "pending",
        "recieved",
        "in preparation",
        "out for delivery",
        "delivered",
        "cancelled",
      ),
      defaultValue: "pending",
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    discount_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    delivery_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  },
);
