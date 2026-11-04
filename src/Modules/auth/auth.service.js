import { userModel } from "../../DB/Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        throw new Error("User already exist!");
    }

    if (password !== confirmPassword) {
        throw new Error("Password doesn't match");
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
        throw new Error("Invalid login credentials");
    }

    const isPasswordMatch = bcrypt.compareSync(
        password,
        user.password
    );

    if (!isPasswordMatch) {
        throw new Error("Invalid login credentials");
    }

    const token = jwt.sign(
        { id: user.id },
        "userToken",
        { expiresIn: "1d" }
    );

    return token;
};