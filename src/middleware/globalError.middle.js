import {
    badRequest,
    Unauthorized,
    Forbidden,
    notFound,
    conflict,
    serverErr
} from "../services/error.response.js";

export const globalError = (err, req, res, next) => {
    switch (err.statusCode) {
        case 400:
            return badRequest({ res, err: err.message });

        case 401:
            return Unauthorized({ res });

        case 403:
            return Forbidden({ res, err: err.message });

        case 404:
            return notFound({ res });

        case 409:
            return conflict({ res, message: err.message });

        default:
            return serverErr({ res });
    }
};