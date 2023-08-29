/* eslint-disable no-unused-vars */
import CONFIG from "@/configs";
import { ROLES_LIST } from "@/enums";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Document, Model, model, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordChangedAt: number;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
  loginCount: number;
  refreshToken: string[];
  comparePassword: (password: string) => Promise<boolean>;
  generateVerificationToken(): string;
}

interface IUserMethod extends Model<IUser> {
  isEmailTaken(email: string): boolean;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      lowercase: true,
      minlength: [2, "First name must be atleast 2 characters long"],
      maxlength: [20, "First name cannot be more than 20 characters"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      lowercase: true,
      minlength: [2, "Last name must be atleast 2 characters long"],
      maxlength: [20, "Last name cannot be more than 20 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please fill in a valid email address",
      ],
    },
    phoneNumber: {
      type: String,
      unique: true,
      minlength: [10, "Phone number cannot be less than 10 digits"],
      maxlength: [15, "Phone number cannot be more than 15 digits"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be atleast 8 characters long"],
      select: false,
    },
    passwordChangedAt: Date,
    role: {
      type: String,
      enum: [
        ROLES_LIST.ADMIN,
        ROLES_LIST.INSTRUCTOR,
        ROLES_LIST.ASSISTANT,
        ROLES_LIST.STUDENT,
      ],
      default: ROLES_LIST.STUDENT,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    loginCount: {
      type: Number,
      default: 0,
    },
    refreshToken: [String],
  },
  {
    timestamps: true,
  },
);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now();

  next();
});

userSchema.methods = {
  comparePassword: async function (plainPassword: string) {
    return await bcrypt.compare(plainPassword, this.password);
  },
  generateVerificationToken: async function () {
    const verificationToken = await jwt.sign(
      { id: this._id },
      CONFIG.USER_VERIFICATION,
      { expiresIn: "7d" },
    );

    return verificationToken;
  },
};

userSchema.index({ email: 1 });

const UserModel = model<IUser, IUserMethod>("User", userSchema);

export default UserModel;
