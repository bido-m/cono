import { branchModel } from "../../DB/Models/branch.model.js";
import { successCreate, successFetch, successUpdate, successDelete } from "../../services/success.response.js";

const add = async (req,res,next) => {
    try {
        const { name, phone, address, map_url } = req.body;
        const data = await branchModel.create({ name, phone, address, map_url });
        successCreate({res,data});
    } catch (error) {
        return next(error);
    }
}

const getAll = async (req,res,next) => {
    try {
        const data = await branchModel.findAndCountAll();
        successFetch({res,data});
    } catch (error) {
        return next(error);
    }
}

const getOne = async (req,res,next) => {
    try {
        const { id } = req.params;
        const data = await branchModel.findByPk(id);
        successFetch({res,data});
    } catch (error) {
        return next(error);
    }
}

const update = async (req,res,next) => {
    try {
        const { id } = req.params;
        const { name, phone, address, map_url } = req.body;
        const data = await branchModel.update({ name, phone, address, map_url },{where:{id},returning: true});
        successUpdate({res,data});
    } catch (error) {
        return next(error);
    }
}

const remove = async (req,res,next) => {
    try {
        const { id } = req.params;
        await branchModel.destroy({where:{id}});
        successDelete({res});
    } catch (error) {
        return next(error);
    }
}

const switchAccept = async (req,res,next) => {
    try {
        const { id } = req.params;
        const data = await branchModel.findByPk(id);
        if(data.accept_order == true){
            data.accept_order = false;
            await data.save();
        }else{
            data.accept_order = true;
            await data.save();
        }
        successUpdate({res,data:{accept_order:data.accept_order}});
    } catch (error) {
        return next(error);
    }
}

export{ add, getAll, getOne, update, remove, switchAccept };