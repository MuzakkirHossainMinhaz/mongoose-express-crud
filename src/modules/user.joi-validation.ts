import Joi from "joi";

const fullNameSchema = Joi.object({
    firstName: Joi.string().required().trim().max(25).messages({
        "string.base": "First Name must be a string",
        "string.empty": "First Name is required",
        "string.trim": "First Name cannot have leading or trailing whitespaces",
        "string.max": "First Name cannot be more than 25 characters",
    }),
    lastName: Joi.string().required().trim().max(25).messages({
        "string.base": "Last Name must be a string",
        "string.empty": "Last Name is required",
        "string.trim": "Last Name cannot have leading or trailing whitespaces",
        "string.max": "Last Name cannot be more than 25 characters",
    }),
});

const addressSchema = Joi.object({
    street: Joi.string().required().messages({
        "string.base": "Street must be a string",
        "string.empty": "Street is required",
    }),
    city: Joi.string().required().messages({
        "string.base": "City must be a string",
        "string.empty": "City is required",
    }),
    country: Joi.string().required().messages({
        "string.base": "Country must be a string",
        "string.empty": "Country is required",
    }),
});

export const orderSchemaValidation = Joi.object({
    productName: Joi.string().required().trim().messages({
        "string.base": "Product Name must be a string",
        "string.empty": "Product Name is required",
        "string.trim":
            "Product Name cannot have leading or trailing whitespaces",
    }),
    price: Joi.number().required().min(0).messages({
        "number.base": "Price must be a number",
        "number.empty": "Price is required",
        "number.min": "Price never be nagative",
    }),
    quantity: Joi.number().required().min(1).messages({
        "number.base": "Quantity must be a number",
        "number.empty": "Quantity is required",
        "number.min": "Quantity must be at least 1",
    }),
});

const userSchemaValidation = Joi.object({
    userId: Joi.number().required().messages({
        "number.base": "userId must be a number",
        "number.empty": "userId is required",
    }),
    username: Joi.string().required().messages({
        "string.base": "Username must be a string",
        "string.empty": "Username is required",
    }),
    password: Joi.string().required().max(25).messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.max": "Password cannot be more than 25 characters",
    }),
    fullName: fullNameSchema.required(),
    age: Joi.number().required().min(1).messages({
        "number.base": "Age must be a number",
        "number.empty": "Age is required",
        "number.min": "Age never be nagative",
    }),
    email: Joi.string().required().email().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
    }),
    isActive: Joi.boolean().required().messages({
        "boolean.base": "Status must be a boolean",
        "boolean.empty": "Status is required",
    }),
    hobbies: Joi.array().required().min(1).messages({
        "array.base": "Hobbies must be an array",
        "array.empty": "Hobbies is required",
        "array.min": "Hobbies must have at least 1 item",
    }),
    address: addressSchema.required(),
    orders: Joi.array().items(orderSchemaValidation).messages({
        "array.base": "Orders must be an array",
    }),
});

export default userSchemaValidation;
