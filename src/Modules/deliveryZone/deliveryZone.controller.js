import { deliveryZoneModel } from "../../DB/Models/deliveryZone.model.js";
import { successCreate, successFetch, successUpdate, successDelete } from "../../services/success.response.js";

const add = async (req,res,next) => {
    try {
        const { branch_id, name, price, delivery_time } = req.body;
        const data = await deliveryZoneModel.create({ branch_id, name, price, delivery_time });
        successCreate({res,data});
    } catch (error) {
        return next(error);
    }
}

const getAll = async (req,res,next) => {
    try {
        const data = await deliveryZoneModel.findAndCountAll();
        successFetch({res,data});
    } catch (error) {
        return next(error);
    }
}

const getOne = async (req,res,next) => {
    try {
        const { id } = req.params;
        const data = await deliveryZoneModel.findByPk(id);
        successFetch({res,data});
    } catch (error) {
        return next(error);
    }
}

const update = async (req,res,next) => {
    try {
        const { id } = req.params;
        const { branch_id, name, price, delivery_time } = req.body;
        const data = await deliveryZoneModel.update({ branch_id, name, price, delivery_time },{where:{id},returning: true});
        successUpdate({res,data});
    } catch (error) {
        return next(error);
    }
}

const remove = async (req,res,next) => {
    try {
        const { id } = req.params;
        await deliveryZoneModel.destroy({where:{id}});
        successDelete({res});
    } catch (error) {
        return next(error);
    }
}

const switchAvailable = async (req,res,next) => {
    try {
        const { id } = req.params;
        const data = await deliveryZoneModel.findByPk(id);
        if(data.is_available == true){
            data.is_available = false;
            await data.save();
        }else{
            data.is_available = true;
            await data.save();
        }
        successUpdate({res,data:{is_available:data.is_available}});
    } catch (error) {
        return next(error);
    }
}

export{ add, getAll, getOne, update, remove, switchAvailable };