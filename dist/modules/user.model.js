"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const fullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        trim: true,
        maxlength: [25, "First Name can not be more than 25 characters"],
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Last Name is required"],
        maxlength: [25, "Last Name can not be more than 25 characters"],
    },
}, {
    _id: false,
});
const AddressSchema = new mongoose_1.Schema({
    street: { type: String, required: [true, "Street is required"] },
    city: { type: String, required: [true, "City is required"] },
    country: { type: String, required: [true, "Country is required"] },
}, {
    _id: false,
});
const OrderSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: [true, "Product Name is required"],
        trim: true,
    },
    price: { type: Number, required: [true, "Price is required"], min: 0 },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: 1,
    },
}, {
    _id: false,
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, "userId is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        maxlength: [25, "Password can not be more than 25 characters"],
    },
    fullName: {
        type: fullNameSchema,
        required: [true, "Full Name is required"],
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
        min: [1, "Age can not be less than 1"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    isActive: {
        type: Boolean,
        required: [true, "Status is required"],
        default: true,
    },
    hobbies: {
        type: [String],
        required: [true, "Hobbies is required"],
        validate: [arrayMinLength, "At least one hobby is required"],
    },
    address: {
        type: AddressSchema,
        required: [true, "Address is required"],
    },
    orders: {
        type: [OrderSchema],
    },
}, {
    versionKey: false,
});
function arrayMinLength(arr) {
    return arr && arr.length > 0;
}
// pre save middleware / hook
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // hashing password and save into DB
        this.password = yield bcrypt_1.default.hash(this.password, Number(process.env.BCRYPT_SALT));
        next();
    });
});
// creating a custom instance method
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user._id;
    delete user.orders;
    return user;
};
//creating a custom static method
userSchema.statics.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId });
        return existingUser;
    });
};
exports.User = (0, mongoose_1.model)("Users", userSchema);
