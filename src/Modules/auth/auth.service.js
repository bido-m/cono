import { userModel } from "../../DB/Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/AppError.js";

export const registerService = async (userData) => {
    const {
        branch_id,
        first_name,
        last_name,
        phone,
        email,
        password,
        confirmPassword,
        role
    } = userData;

    const existUser = await userModel.findOne({
        where: { phone }
    });

    if (existUser) {
        throw new AppError(409,"User already exist!");
    }

    if (password !== confirmPassword) {
        throw new AppError(400,"Password doesn't match");
    }

    const hashedPass = bcrypt.hashSync(password, 12);

    const data = await userModel.create({
        branch_id,
        first_name,
        last_name,
        phone,
        email,
        password: hashedPass,
        role
    });

    return data;
};

export const loginService = async ({ phone, password }) => {

    const user = await userModel.findOne({
        where: { phone }
    });

    if (!user) {
        throw new AppError(401, "Invalid credentials");
    }

    const isPasswordMatch = bcrypt.compareSync(
        password,
        user.password
    );

    if (!isPasswordMatch) {
        throw new AppError(401, "Invalid credentials");
    }

    const token = jwt.sign(
        { id: user.id },
        "userToken",
        { expiresIn: "1d" }
    );

    return token;
};