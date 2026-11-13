import getApiAuth from "../utils/apiAuth.js"; // لا تنسَ إضافة .js في نظام ES Modules
import { AppError } from "../utils/AppError.js";

const apiAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new AppError(401, "Authorization header is required"));
    }

    const isValid = getApiAuth(authHeader);

    if (!isValid) {
      return next(new AppError(401, "Invalid API credentials"));
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

export default apiAuth;
