import { userModel } from "../DB/Models/user.model";
import bcrypt from "bcrypt";

const register = async (req,res,next) => {
    try {
        const {branch_id,first_name,last_name,phone,email,password,confirmPassword,role} = req.body;
        const existUser = await userModel.findOne({where:{phone}});
        if(existUser){
            return next(new Error("email is already exist"));
        }
        if(password!== confirmPassword){
            return next(new Error("Passwords do not match"));
        }
        const hashedPass = bcrypt.hashSync(password,12);
        const data = await userModel.create({branch_id,first_name,last_name,phone,email,password:hashedPass,role});
        return res.status(201).json({message:"created successfully",data});
    } catch (error) {
        return next(error);
    }
}

const login = async (req,res,next) => {
    try {} catch (error) {}
}

const logout = async (req,res,next) => {
    try {} catch (error) {}
}

const profile = async (req,res,next) => {
    try {} catch (error) {}
}

export{ register, login, logout, profile };