import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { productModel } from "./product.model.js";
import { categoryModel } from "./category.model.js";
import { orderDetailsModel } from "./orderDetails.model.js";

export const discountModel = sequelize.define("discount", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM(
            "fixed",
            "percentage"
        ),
        allowNull: false
    },
    value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    starts_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    ends_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true
});

discountModel.belongsTo(productModel, {
    foreignKey: "product_id",
    as: "product"
});

discountModel.belongsTo(categoryModel, {
    foreignKey: "category_id",
    as: "category"
});

discountModel.hasMany(orderDetailsModel, {
    foreignKey: "discount_id",
    as: "orderDetails"
});