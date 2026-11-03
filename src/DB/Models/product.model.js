import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { categoryModel } from "./category.model.js";
import { productSizeModel } from "./productSize.model.js";
import { productAdditionModel } from "./productAddition.model.js";
import { orderDetailsModel } from "./orderDetails.model.js";
import { discountModel } from "./discount.model.js";

export const productModel = sequelize.define("product", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image_url: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true
});

productModel.belongsTo(categoryModel, {
    foreignKey: "category_id",
    as: "category"
});

productModel.hasMany(productSizeModel, {
    foreignKey: "product_id",
    as: "productSizes"
});

productModel.hasMany(productAdditionModel, {
    foreignKey: "product_id",
    as: "productAdditions"
});

productModel.hasMany(orderDetailsModel, {
    foreignKey: "product_id",
    as: "orderDetails"
});

productModel.hasMany(discountModel, {
    foreignKey: "product_id",
    as: "discounts"
});