import jwt from "jsonwebtoken";
import { userModel } from "../DB/Models/user.model.js";

export const authentication = async (req,res,next) => {
    try {
        const {x} = req.headers;
        const {id} = jwt.verify(x,"userToken");
        const user = await userModel.findByPk(id);
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(400).json({message:"failed to get user"});
    }
}