import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { branchModel } from "./branch.model.js";
import { deliveryZoneModel } from "./deliveryZone.model.js";
import { orderDetailsModel } from "./orderDetails.model.js";

export const orderModel = sequelize.define("order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_type: {
        type: DataTypes.ENUM(
            "delivery",
            "pickup"
        ),
        allowNull: false
    },
    full_name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    reserve_phone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    address_details: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    delivery_zone_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    kitchen_notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    order_status: {
        type: DataTypes.ENUM(
            "recieved",
            "in preparation",
            "out for delivery",
            "delivered",
            "cancelled"
        ),
        defaultValue: "pending",
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    delivery_fee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: true
});

orderModel.belongsTo(branchModel, {
    foreignKey: "branch_id",
    as: "branch"
});

orderModel.belongsTo(deliveryZoneModel, {
    foreignKey: "delivery_zone_id",
    as: "deliveryZone"
});

orderModel.hasMany(orderDetailsModel, {
    foreignKey: "order_id",
    as: "items"
});
