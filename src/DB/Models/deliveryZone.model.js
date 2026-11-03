import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { branchModel } from "./branch.model.js";
import { orderModel } from "./order.model.js";

export const deliveryZoneModel = sequelize.define("delivery_zone", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    delivery_time: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true
});

deliveryZoneModel.belongsTo(branchModel, {
    foreignKey: "branch_id",
    as: "branch"
});

deliveryZoneModel.hasMany(orderModel, {
    foreignKey: "delivery_zone_id",
    as: "orders"
});