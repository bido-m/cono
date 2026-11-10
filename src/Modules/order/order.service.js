import { sequelize } from "../DB/connection.js";
import { orderModel } from "../DB/Models/order.model.js";
import { orderDetailsModel } from "../DB/Models/orderDetails.model.js";
import { orderDetailAdditionModel } from "../DB/Models/orderDetailAddition.model.js";
import { branchModel } from "../DB/Models/branch.model.js";
import { deliveryZoneModel } from "../DB/Models/deliveryZone.model.js";
import { AppError } from "../utils/AppError.js";


export const createOrderService = async (orderPayload) => {
  const {
    branch_id,
    order_type,
    full_name,
    phone,
    reserve_phone,
    address_details,
    delivery_zone_id,
    kitchen_notes,
    items,
  } = orderPayload;
  if (!items || !items.length) {
    throw new AppError(400, "Order must contain at least one item!");
  }
  const branch = await branchModel.findByPk(branch_id);
  if (!branch) throw new AppError(404, "Branch Not Found!");
  if (!branch.accept_order) throw new AppError(400, "This branch is currently not accepting orders!");
  let delivery_fee = 0;
  if (order_type === "delivery") {
    if (!delivery_zone_id) throw new AppError(400, "delivery_zone_id is required for delivery orders!");
    if (!address_details) throw new AppError(400, "address_details is required for delivery orders!");
    const zone = await deliveryZoneModel.findOne({
      where: { id: delivery_zone_id, branch_id, is_available: true },
    });
    if (!zone) throw new AppError(400, "Selected delivery zone is invalid or currently unavailable!");
    delivery_fee = Number(zone.price);
  }
  const transaction = await sequelize.transaction();
  try {
    let subtotal = 0;
    let discount_amount = 0;
    const order = await orderModel.create(
      {
        branch_id,
        order_type,
        full_name,
        phone,
        reserve_phone,
        address_details: order_type === "delivery" ? address_details : null,
        delivery_zone_id: order_type === "delivery" ? delivery_zone_id : null,
        kitchen_notes,
        order_status: "received",
        delivery_fee,
        subtotal: 0,
        discount_amount: 0,
        total_amount: 0,
      },
      { transaction }
    );
    for (const item of items) {
      const itemPrice = Number(item.product_price);
      const itemQty = Number(item.quantity);
      let additionsTotal = 0;
      if (item.additions && item.additions.length) {
        for (const add of item.additions) {
          additionsTotal += Number(add.price) * Number(add.quantity || 1);
        }
      }
      const itemTotal = (itemPrice * itemQty) + additionsTotal;
      subtotal += itemTotal;
      const orderDetail = await orderDetailsModel.create(
        {
          order_id: order.id,
          product_id: item.product_id,
          product_size_id: item.product_size_id || null,
          discount_id: item.discount_id || null,
          product_name: item.product_name,
          size_name: item.size_name || null,
          product_price: itemPrice,
          quantity: itemQty,
          total_price: itemTotal,
          has_discount: Boolean(item.discount_id),
        },
        { transaction }
      );
      if (item.additions && item.additions.length) {
        const additionsToInsert = item.additions.map((add) => ({
          order_detail_id: orderDetail.id,
          addition_id: add.addition_id || null,
          addition_name: add.addition_name,
          price: Number(add.price),
          quantity: Number(add.quantity || 1),
        }));

        await orderDetailAdditionModel.bulkCreate(additionsToInsert, { transaction });
      }
    }
    const total_amount = subtotal - discount_amount + delivery_fee;
    await order.update(
      {
        subtotal: subtotal.toFixed(2),
        discount_amount: discount_amount.toFixed(2),
        delivery_fee: delivery_fee.toFixed(2),
        total_amount: total_amount.toFixed(2),
      },
      { transaction }
    );
    await transaction.commit();
    return order;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};


export const getAllOrdersService = async ({ user, query }) => {
  const { status, order_type, branch_id } = query;
  const where = {};
  if (user.role === "branch_manager") {
    where.branch_id = user.branch_id;
  } else if (branch_id) {
    where.branch_id = branch_id;
  }
  if (status) where.order_status = status;
  if (order_type) where.order_type = order_type;
  const orders = await orderModel.findAndCountAll({
    where,
    order: [["createdAt", "DESC"]],
  });
  return orders;
};


export const getOneOrderService = async ({ id, user }) => {
  const order = await orderModel.findByPk(id, {
    include: [
      {
        model: orderDetailsModel,
        as: "order_details",
        include: [
          {
            model: orderDetailAdditionModel,
            as: "order_detail_addition",
          },
        ],
      },
    ],
  });
  if (!order) throw new AppError(404, "Order Not Found!");
  if (user.role === "branch_manager" && user.branch_id !== order.branch_id) {
    throw new AppError(403, "You are not authorized to view this order!");
  }
  return order;
};


export const updateOrderStatusService = async ({ id, status, user }) => {
  const validStatuses = ["received", "in preparation", "out for delivery", "delivered", "cancelled"];
  if (!validStatuses.includes(status)) {
    throw new AppError(400, "Invalid order status!");
  }
  const order = await orderModel.findByPk(id);
  if (!order) throw new AppError(404, "Order Not Found!");
  if (user.role === "branch_manager" && user.branch_id !== order.branch_id) {
    throw new AppError(403, "You are not authorized to update this order!");
  }
  if (["delivered", "cancelled"].includes(order.order_status)) {
    throw new AppError(400, `Cannot change status of an already ${order.order_status} order!`);
  }
  order.order_status = status;
  await order.save();
  return order;
};
