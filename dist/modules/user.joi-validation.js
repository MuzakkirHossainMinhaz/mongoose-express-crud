"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchemaValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const fullNameSchema = joi_1.default.object({
    firstName: joi_1.default.string().required().trim().max(25).messages({
        "string.base": "First Name must be a string",
        "string.empty": "First Name is required",
        "string.trim": "First Name cannot have leading or trailing whitespaces",
        "string.max": "First Name cannot be more than 25 characters",
    }),
    lastName: joi_1.default.string().required().trim().max(25).messages({
        "string.base": "Last Name must be a string",
        "string.empty": "Last Name is required",
        "string.trim": "Last Name cannot have leading or trailing whitespaces",
        "string.max": "Last Name cannot be more than 25 characters",
    }),
});
const addressSchema = joi_1.default.object({
    street: joi_1.default.string().required().messages({
        "string.base": "Street must be a string",
        "string.empty": "Street is required",
    }),
    city: joi_1.default.string().required().messages({
        "string.base": "City must be a string",
        "string.empty": "City is required",
    }),
    country: joi_1.default.string().required().messages({
        "string.base": "Country must be a string",
        "string.empty": "Country is required",
    }),
});
exports.orderSchemaValidation = joi_1.default.object({
    productName: joi_1.default.string().required().trim().messages({
        "string.base": "Product Name must be a string",
        "string.empty": "Product Name is required",
        "string.trim": "Product Name cannot have leading or trailing whitespaces",
    }),
    price: joi_1.default.number().required().min(0).messages({
        "number.base": "Price must be a number",
        "number.empty": "Price is required",
        "number.min": "Price never be nagative",
    }),
    quantity: joi_1.default.number().required().min(1).messages({
        "number.base": "Quantity must be a number",
        "number.empty": "Quantity is required",
        "number.min": "Quantity must be at least 1",
    }),
});
const userSchemaValidation = joi_1.default.object({
    userId: joi_1.default.number().required().messages({
        "number.base": "userId must be a number",
        "number.empty": "userId is required",
    }),
    username: joi_1.default.string().required().messages({
        "string.base": "Username must be a string",
        "string.empty": "Username is required",
    }),
    password: joi_1.default.string().required().max(25).messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.max": "Password cannot be more than 25 characters",
    }),
    fullName: fullNameSchema.required(),
    age: joi_1.default.number().required().min(1).messages({
        "number.base": "Age must be a number",
        "number.empty": "Age is required",
        "number.min": "Age never be nagative",
    }),
    email: joi_1.default.string().required().email().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
    }),
    isActive: joi_1.default.boolean().required().messages({
        "boolean.base": "Status must be a boolean",
        "boolean.empty": "Status is required",
    }),
    hobbies: joi_1.default.array().required().min(1).messages({
        "array.base": "Hobbies must be an array",
        "array.empty": "Hobbies is required",
        "array.min": "Hobbies must have at least 1 item",
    }),
    address: addressSchema.required(),
    orders: joi_1.default.array().items(exports.orderSchemaValidation).messages({
        "array.base": "Orders must be an array",
    }),
});
exports.default = userSchemaValidation;
