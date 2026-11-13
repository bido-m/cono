export const validationMiddle = (schema) => {
  return (req, res, next) => {
    const validationSources = ["body", "params", "query"];
    const errors = [];

    for (const source of validationSources) {
      if (schema[source]) {
        const { error, value } = schema[source].validate(req[source], {
          abortEarly: false,
          convert: true, 
        });

        if (error) {
          error.details.forEach((detail) => errors.push(detail.message));
        } else {
          req[source] = value;
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation Error",
        errors,
      });
    }

    next();
  };
};
