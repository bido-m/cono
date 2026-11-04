export const validationMiddle = (schema) => {
    return(req,res,next) => {
        const data = schema.validate(req.body, { abortEarly: false });
        const result = schema.validate(data,{abortEarly:false});
        res.json({result});
        return next();
    }
}