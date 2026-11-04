import { registerService, loginService } from "./auth.service.js";
import { successCreate, successLogged } from "../../services/success.response.js";

const register = async (req,res,next) => {
    try {
        const data = await registerService(req.body);
        successCreate({ res, data });
    } catch (error) {
        return next(error);
    }
}

const login = async (req,res,next) => {
    try {
        const token = await loginService(req.body);
        successLogged({ res, token });
    } catch (error) {
        return next(error);
    }
}

const logout = async (req,res,next) => {
    try {} catch (error) {}
}

const profile = async (req,res,next) => {
    try {} catch (error) {}
}

export{ register, login, logout, profile };