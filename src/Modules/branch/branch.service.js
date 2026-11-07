import { branchModel } from "../../DB/Models/branch.model.js";
import { AppError } from "../../utils/AppError.js";

export const addService = async (branchData) => {
    const { name, phone, address, map_url } = branchData;
    const existBranch = await branchModel.findOne({where:{name}});
    if(existBranch){
        throw new AppError(409,"Branch already exist!");
    }
    const data = await branchModel.create({ name, phone, address, map_url });
    return data;
}

export const getOneService = async (id) => {
    const data = await branchModel.findByPk(id);
    if(!data){
        throw new AppError(404,"Branch Not Found");
    }
    return data;
}

export const updateService = async ({id,branchData}) => {
    const { name, phone, address, map_url } = branchData;
    const existBranch = await branchModel.findByPk(id);
    if(!existBranch){
        throw new AppError(409,"Branch Not Found!");
    }
    existBranch.set(branchData);
    if (!existBranch.changed()) {
        throw new AppError(400, "No changes detected. Data is identical!");
    }
    await existBranch.save();
    return existBranch;
}

export const removeService = async (id) => {
  const deletedCount = await branchModel.destroy({ where: { id } });
  if (!deletedCount) {
    throw new AppError(404, "Branch Not Found");
  }
  return true;
};

export const switchAcceptService = async (id) => {
  const branch = await branchModel.findByPk(id);
  if (!branch) {
    throw new AppError(404, "Branch Not Found");
  }
  branch.accept_order = !branch.accept_order;
  await branch.save();
  return { accept_order: branch.accept_order };
};
