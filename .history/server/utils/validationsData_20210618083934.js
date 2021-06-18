import Joi from 'joi';
import JoiID from 'joi-oid';

module.export const validationProduct = (data) => {
    const sch = Joi.object({
        name: Joi.string().trim().required,
        image: Joi.string().trim().required,
        brand: Joi.string().trim().required,
        description: Joi.string().trim().required,
        category: Joi.string().trim().required,
        price: Joi.number().trim().required
    })
    return sch.validate(data);
}