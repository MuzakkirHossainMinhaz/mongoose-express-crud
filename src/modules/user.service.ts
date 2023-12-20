import { IOrder, IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (userData: IUser) => {
    if (await User.isUserExists(userData.userId)) {
        throw new Error("User already exists!");
    }

    const result = await User.create(userData);

    return result;
};

const getAllUsers = async () => {
    // return only username, fullName, age, email, address
    const result = await User.find().select({
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    });

    return result;
};

const getUserById = async (userId: number) => {
    const result = await User.findOne({ userId });

    if (!result) {
        throw new Error("User not found");
    }

    return result;
};

const updateUserById = async (userId: number, userData: IUser) => {
    const user = await User.isUserExists(userId);
    if (!user) {
        throw new Error("User not found");
    }

    await User.updateOne({ userId }, userData);

    const result = await User.findOne({ userId });

    return result;
};

const deleteUserById = async (userId: number) => {
    if (!(await User.isUserExists(userId))) {
        throw new Error("User not found");
    }

    const result = await User.deleteOne({ userId });

    return result;
};

const addProductToOrders = async (userId: number, product: IOrder) => {
    if (!(await User.isUserExists(userId))) {
        throw new Error("User not found");
    }
    const result = await User.updateOne(
        { userId },
        { $push: { orders: product } },
    ); // add product to orders

    return result;
};

const getAllOrders = async (userId: number) => {
    if (!(await User.isUserExists(userId))) {
        throw new Error("User not found");
    }

    const result = await User.find({ userId }).select({ orders: 1 });

    return result[0].orders; // return orders only
};

const totalPriceOfOrders = async (userId: number) => {
    if (!(await User.isUserExists(userId))) {
        throw new Error("User not found");
    }

    const result = await User.aggregate([
        { $match: { userId } },
        { $project: { orders: 1 } },
    ]);

    if (!result.length) {
        return 0;
    }

    const products = result[0].orders;
    // sum of prices of all products
    let sum = 0;
    for (const product of products) {
        sum += product.price * product.quantity;
    }

    return sum.toFixed(2); // return rounded to 2 decimal places
};

export const UserServices = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    addProductToOrders,
    getAllOrders,
    totalPriceOfOrders,
};
