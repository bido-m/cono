import { branchModel } from "../../DB/Models/branch.model.js";
import { successCreate, successFetch, successUpdate, successDelete } from "../../services/success.response.js";
import { addService, getOneService, removeService, switchAcceptService, updateService } from "./branch.service.js";

const add = async (req,res,next) => {
    try {
        const data = await addService(req.body);
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
        const data = await getOneService(id);
        successFetch({res,data});
    } catch (error) {
        return next(error);
    }
}

const update = async (req,res,next) => {
    try {
        const { id } = req.params;
        const data = await updateService({id,branchData:req.body});
        successUpdate({res,data});
    } catch (error) {
        return next(error);
    }
}

const remove = async (req,res,next) => {
    try {
        const { id } = req.params;
        await removeService(id);
        successDelete({res});
    } catch (error) {
        return next(error);
    }
}

const switchAccept = async (req,res,next) => {
    try {
        const { id } = req.params;
        const data = await switchAcceptService(id);
        successUpdate({res,data});
    } catch (error) {
        return next(error);
    }
}

export{ add, getAll, getOne, update, remove, switchAccept };