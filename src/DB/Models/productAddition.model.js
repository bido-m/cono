import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { productModel } from "./product.model.js";
import { additionModel } from "./addition.model.js";

export const productAdditionModel = sequelize.define("product_addition", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    addition_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: true
});

productAdditionModel.belongsTo(productModel, {
    foreignKey: "product_id",
    as: "product"
});

productAdditionModel.belongsTo(additionModel, {
    foreignKey: "addition_id",
    as: "addition"
});