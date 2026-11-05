import { successFetch } from "../../services/success.response.js";

const profile = async (req,res,next) => {
    try {
        const { password, branch_id, ...userData } = req.user.toJSON();
        successFetch({res,data:userData});
    } catch (error) {
        return next(error);
    }
}

export{ profile };