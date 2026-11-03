import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { productSizeModel } from "./productSize.model.js";

export const sizeModel = sequelize.define("size", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    size_name: {
        type: DataTypes.STRING(55),
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true
});

sizeModel.hasMany(productSizeModel, {
    foreignKey: "size_id",
    as: "productSizes"
});