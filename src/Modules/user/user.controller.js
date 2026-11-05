import { userModel } from "../../DB/Models/user.model.js";
import { successFetch, successUpdate, successDelete } from "../../services/success.response.js";

const profile = async (req,res,next) => {
    try {
        const { password, branch_id, ...userData } = req.user.toJSON();
        successFetch({res,data:userData});
    } catch (error) {
        return next(error);
    }
}

const getAll = async (req,res,next) => {
    try {
        const data = await userModel.findAndCountAll();
        successFetch({res,data});
    } catch (error) {
        return next(error);
    }
}

const getOne = async (req,res,next) => {
    try {
        const { id } = req.params;
        const data = await userModel.findByPk(id);
        successFetch({res,data});
    } catch (error) {
        return next(error);
    }
}

const update = async (req,res,next) => {
    try {
        const { branch_id,first_name,last_name,phone,email } = req.body;
        const data = await userModel.update({ branch_id,first_name,last_name,phone,email });
        successUpdate({res,data});
    } catch (error) {
        return next(error);
    }
}

const remove = async (req,res,next) => {
    try {
        const { id } = req.params;
        await userModel.destroy(id);
        successDelete({res});
    } catch (error) {
        return next(error);
    }
}

export{ profile, getAll, getOne, update, remove };