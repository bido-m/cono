import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { branchModel } from "./branch.model.js";
import { productModel } from "./product.model.js";
import { discountModel } from "./discount.model.js";

export const categoryModel = sequelize.define("category", {
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
    }
}, {
    timestamps: true
});

categoryModel.belongsTo(branchModel, {
    foreignKey: "branch_id",
    as: "branch"
});

categoryModel.hasMany(productModel, {
    foreignKey: "category_id",
    as: "products"
});

categoryModel.hasMany(discountModel, {
    foreignKey: "category_id",
    as: "discounts"
});