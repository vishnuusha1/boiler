const Joi = require('joi');

const baseSchema = Joi.object({
    title: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    description: Joi.string().required(),
}).required()

module.exports = {
    list(req,res,next) {
        return next();
    },
    create(req,res,next) {
        return global.utils.validateJoi({baseSchema, data:req.body, next})
    },
};