import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { userModel } from "./user.model.js";
import { categoryModel } from "./category.model.js";
import { deliveryZoneModel } from "./deliveryZone.model.js";
import { orderModel } from "./order.model.js";

export const branchModel = sequelize.define("branch", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    map_url: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    accept_order: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    timestamps: true
});

branchModel.hasMany(userModel, {
    foreignKey: "branch_id",
    as: "users"
});

branchModel.hasMany(categoryModel, {
    foreignKey: "branch_id",
    as: "categories"
});

branchModel.hasMany(deliveryZoneModel, {
    foreignKey: "branch_id",
    as: "deliveryZones"
});

branchModel.hasMany(orderModel, {
    foreignKey: "branch_id",
    as: "orders"
});