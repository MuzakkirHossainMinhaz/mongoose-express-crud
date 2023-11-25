import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { IFullName, IAddress, IOrder, IUser, UserModel } from '../interfaces/user.interface';

const fullNameSchema = new Schema<IFullName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [25, 'First Name can not be more than 25 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [15, 'Last Name can not be more than 15 characters'],
  },
});

const AddressSchema = new Schema<IAddress>({
  street: { type: String, required: [true, 'Street is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
});

const OrderSchema = new Schema<IOrder>({
  productName: { type: String, required: [true, 'Product Name is required'], trim: true },
  price: { type: Number, required: [true, 'Price is required'], min: 0 },
  quantity: { type: Number, required: [true, 'Quantity is required'], min: 1 },
});

const userSchema = new Schema<IUser, UserModel>(
  {
    userId: { type: Number, required: [true, 'userId is required'], unique: true },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      maxlength: [25, 'Password can not be more than 25 characters'],
    },
    fullName: {
      type: fullNameSchema,
      required: [true, 'Full Name is required'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [1, 'Age can not be less than 1'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    isActive: {
      type: Boolean,
      required: [true, 'Status is required'],
      default: true,
    },
    hobbies: {
      type: [String],
      required: [true, 'Hobbies is required'],
      validate: [arrayMinLength, 'At least one hobby is required']
    },
    address: {
      type: AddressSchema,
      required: [true, 'Address is required'],
    },
    orders: {
      type: [OrderSchema],
    }
  },
  {
    versionKey: false,
  },
);

function arrayMinLength(arr: any[]) {
  return arr && arr.length > 0;
}

// pre save middleware / hook
userSchema.pre('save', async function (next) {
  const user = this;

  // hashing password and save into DB
  user.password = await bcrypt.hash(user.password, Number(process.env.BCRYPT_SALT));
  next();
});

//creating a custom static method
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });

  return existingUser;
};

export const User = model<IUser, UserModel>('Users', userSchema);
