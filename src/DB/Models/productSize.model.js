import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { productModel } from "./product.model.js";
import { sizeModel } from "./size.model.js";
import { orderDetailsModel } from "./orderDetails.model.js";

export const productSizeModel = sequelize.define("product_size", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    size_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    timestamps: true
});

productSizeModel.belongsTo(productModel, {
    foreignKey: "product_id",
    as: "product"
});

productSizeModel.belongsTo(sizeModel, {
    foreignKey: "size_id",
    as: "size"
});

productSizeModel.hasMany(orderDetailsModel, {
    foreignKey: "product_size_id",
    as: "orderDetails"
});