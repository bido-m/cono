import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { orderModel } from "./order.model.js";
import { productModel } from "./product.model.js";
import { productSizeModel } from "./productSize.model.js";
import { discountModel } from "./discount.model.js";
import { orderDetailAdditionModel } from "./orderDetailAddition.model.js";

export const orderDetailsModel = sequelize.define("order_details", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_size_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    discount_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    product_name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    size_name: {
        type: DataTypes.STRING(55),
        allowNull: true
    },
    product_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    has_discount: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true
});

orderDetailsModel.belongsTo(orderModel, {
    foreignKey: "order_id",
    as: "order"
});

orderDetailsModel.belongsTo(productModel, {
    foreignKey: "product_id",
    as: "product"
});

orderDetailsModel.belongsTo(productSizeModel, {
    foreignKey: "product_size_id",
    as: "productSize"
});

orderDetailsModel.belongsTo(discountModel, {
    foreignKey: "discount_id",
    as: "discount"
});

orderDetailsModel.hasMany(orderDetailAdditionModel, {
    foreignKey: "order_detail_id",
    as: "additions"
});