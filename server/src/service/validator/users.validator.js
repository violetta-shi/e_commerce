const joi = require('joi');

const createUserSchema = joi.object({
    email: joi
        .string()
        .required()
        .email({tlds: false})
        .max(256),
    password: joi
        .string()
        .required()
        .min(4)
        .max(32),
});

const validationOptions = { abortEarly: false, allowUnknown: true, convert: false };

const validateCreateUser = (user) => {
    const { error } = createUserSchema.validate(user, validationOptions);
    if (error) {
        return error.details.map(({message, path}) => ({ message, field: path.join('.') }))
    }
}

module.exports = {
    validateCreateUser
}