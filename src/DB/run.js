import { branchModel } from "./Models/branch.model.js";
import { userModel } from "./Models/user.model.js";
import { categoryModel } from "./Models/category.model.js";
import { deliveryZoneModel } from "./Models/deliveryZone.model.js";
import { sizeModel } from "./Models/size.model.js";
import { additionModel } from "./Models/addition.model.js";
import { productModel } from "./Models/product.model.js";
import { productSizeModel } from "./Models/productSize.model.js";
import { productAdditionModel } from "./Models/productAddition.model.js";
import { discountModel } from "./Models/discount.model.js";
import { orderModel } from "./Models/order.model.js";
import { orderDetailsModel } from "./Models/orderDetails.model.js";
import { orderDetailAdditionModel } from "./Models/orderDetailAddition.model.js";

export const setupRelation = () => {

branchModel.hasMany(userModel, { foreignKey: "branch_id", as: "users" });
userModel.belongsTo(branchModel, { foreignKey: "branch_id", as: "branch" });

branchModel.hasMany(categoryModel, { foreignKey: "branch_id", as: "categories" });
categoryModel.belongsTo(branchModel, { foreignKey: "branch_id", as: "branch" });

branchModel.hasMany(deliveryZoneModel, { foreignKey: "branch_id", as: "deliveryZones" });
deliveryZoneModel.belongsTo(branchModel, { foreignKey: "branch_id", as: "branch" });

branchModel.hasMany(orderModel, { foreignKey: "branch_id", as: "orders" });
orderModel.belongsTo(branchModel, { foreignKey: "branch_id", as: "branch" });

deliveryZoneModel.hasMany(orderModel, { foreignKey: "delivery_zone_id", as: "orders" });
orderModel.belongsTo(deliveryZoneModel, { foreignKey: "delivery_zone_id", as: "deliveryZone" });

userModel.hasMany(orderModel, { foreignKey: "user_id", as: "orders" });
orderModel.belongsTo(userModel, { foreignKey: "user_id", as: "user" });

categoryModel.hasMany(productModel, { foreignKey: "category_id", as: "products" });
productModel.belongsTo(categoryModel, { foreignKey: "category_id", as: "category" });

categoryModel.hasMany(discountModel, { foreignKey: "category_id", as: "discounts" });
discountModel.belongsTo(categoryModel, { foreignKey: "category_id", as: "category" });

productModel.hasMany(productSizeModel, { foreignKey: "product_id", as: "productSizes" });
productSizeModel.belongsTo(productModel, { foreignKey: "product_id", as: "product" });

productModel.hasMany(productAdditionModel, { foreignKey: "product_id", as: "productAdditions" });
productAdditionModel.belongsTo(productModel, { foreignKey: "product_id", as: "product" });

productModel.hasMany(orderDetailsModel, { foreignKey: "product_id", as: "orderDetails" });
orderDetailsModel.belongsTo(productModel, { foreignKey: "product_id", as: "product" });

productModel.hasMany(discountModel, { foreignKey: "product_id", as: "discounts" });
discountModel.belongsTo(productModel, { foreignKey: "product_id", as: "product" });


sizeModel.hasMany(productSizeModel, { foreignKey: "size_id", as: "productSizes" });
productSizeModel.belongsTo(sizeModel, { foreignKey: "size_id", as: "size" });

additionModel.hasMany(productAdditionModel, { foreignKey: "addition_id", as: "productAdditions" });
productAdditionModel.belongsTo(additionModel, { foreignKey: "addition_id", as: "addition" });

additionModel.hasMany(orderDetailAdditionModel, { foreignKey: "addition_id", as: "orderDetailAdditions" });
orderDetailAdditionModel.belongsTo(additionModel, { foreignKey: "addition_id", as: "addition" });

orderModel.hasMany(orderDetailsModel, { foreignKey: "order_id", as: "items" });
orderDetailsModel.belongsTo(orderModel, { foreignKey: "order_id", as: "order" });

orderDetailsModel.belongsTo(productSizeModel, { foreignKey: "product_size_id", as: "productSize" });
productSizeModel.hasMany(orderDetailsModel, { foreignKey: "product_size_id", as: "orderDetails" });

orderDetailsModel.belongsTo(discountModel, { foreignKey: "discount_id", as: "discount" });
discountModel.hasMany(orderDetailsModel, { foreignKey: "discount_id", as: "orderDetails" });

orderDetailsModel.hasMany(orderDetailAdditionModel, { foreignKey: "order_detail_id", as: "additions" });
orderDetailAdditionModel.belongsTo(orderDetailsModel, { foreignKey: "order_detail_id", as: "orderDetail" });
}

