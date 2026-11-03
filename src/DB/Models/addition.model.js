import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { productAdditionModel } from "./productAddition.model.js";
import { orderDetailAdditionModel } from "./orderDetailAddition.model.js";

export const additionModel = sequelize.define("addition", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true
});

additionModel.hasMany(productAdditionModel, {
    foreignKey: "addition_id",
    as: "productAdditions"
});

additionModel.hasMany(orderDetailAdditionModel, {
    foreignKey: "addition_id",
    as: "orderDetailAdditions"
});