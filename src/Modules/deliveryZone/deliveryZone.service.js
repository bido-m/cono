import { branchModel } from "../../DB/Models/branch.model.js";
import { deliveryZoneModel } from "../../DB/Models/deliveryZone.model.js";
import { AppError } from "../../utils/AppError.js";

export const addService = async (deliveryZoneData) => {
    const { branch_id, name, price, delivery_time } = deliveryZoneData;
    const existBranch = await branchModel.findByPk(branch_id);
    if(!existBranch){
        throw new AppError(404,"Branch Not Found!");
    }
    const existDeliveryZone = await deliveryZoneModel.findOne({where:{branch_id,name}});
    if(existDeliveryZone){
        throw new AppError(409,"Delivery zone exist!");
    }
    const data = await deliveryZoneModel.create({ branch_id, name, price, delivery_time });
    return data;
}

export const getOneService = async (id) => {
    const data = await deliveryZoneModel.findByPk(id,{
        include:[{
            model:branchModel,
            as:"branch",
            attributes:["name"]
        }]
    });
    if(!data){
        throw new AppError(404,"Delivery zone Not Found");
    }
    return data;
}

export const updateService = async ({id,deliveryZoneData}) => {
    const { name, price, delivery_time } = deliveryZoneData;
    const zone = await deliveryZoneModel.findByPk(id);
    if(!zone){
        throw new AppError(404, "Delivery zone Not Found!");
    }
    if (name && name !== zone.name) {
        const isExist = await deliveryZoneModel.findOne({
        where: { branch_id: zone.branch_id, name }
        });
        if (isExist) throw new AppError(409, "Delivery zone already exists!");
    }
    if (price !== undefined) {
        deliveryZoneData.price = Number(price).toFixed(2);
    }
    zone.set(deliveryZoneData);
    if (!zone.changed()) {
        throw new AppError(400, "No changes detected. Data is identical!");
    }
    await zone.save();
    return zone;
}

export const removeService = async (id) => {
  const deletedCount = await deliveryZoneModel.destroy({ where: { id } });
  if (!deletedCount) {
    throw new AppError(404, "Delivery zone Not Found");
  }
  return true;
};

export const switchAvailableService = async (id) => {
  const deliveryZone = await deliveryZoneModel.findByPk(id);
  if (!deliveryZone) {
    throw new AppError(404, "Delivery zone Not Found");
  }
  deliveryZone.is_available = !deliveryZone.is_available;
  await deliveryZone.save();
  return { is_available: deliveryZone.is_available };
};
