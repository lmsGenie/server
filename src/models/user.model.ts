/* eslint-disable no-unused-vars */
import CONFIG from "@/configs";
import { ROLES_LIST } from "@/enums";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Document, Model, model, Schema } from "mongoose";

export interface IWishlist extends Document {
  courses: Schema.Types.ObjectId[];
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordChangedAt?: number | undefined;
  role: string;
  biography?: string;
  socialProfiles?: string[];
  profilePicture?: string;
  slug: string;
  rating?: number;
  totalStudents?: number;
  enrolledCourses?: Schema.Types.ObjectId[];
  wishlist: IWishlist;
  isActive: boolean;
  isEmailVerified: boolean;
  loginCount: number;
  refreshToken: string[];
  comparePassword: (password: string) => Promise<boolean>;
  generateVerificationToken(): string;
}

interface IEnrolledCourse extends Document {
  courses: Schema.Types.ObjectId[];
  progress: {
    currentSection: Schema.Types.ObjectId;
    currentLecture: Schema.Types.ObjectId;
    watchedLectures: Schema.Types.ObjectId[];
    completed: boolean;
  };
}

interface IUserMethod extends Model<IUser> {
  isEmailTaken(email: string): boolean;
}

const wishlistSchema = new Schema<IWishlist>({
  courses: {
    type: [Schema.Types.ObjectId],
    ref: "Course",
  },
});

const enrolledCoursesSchema = new Schema<IEnrolledCourse>({
  courses: [
    {
      course: { type: Schema.Types.ObjectId, ref: "Course" },
      progress: {
        currentSection: { type: Schema.Types.ObjectId, ref: "Section" },
        currentLecture: { type: Schema.Types.ObjectId, ref: "Lecture" },
        lecturesWatched: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
        completed: Boolean,
      },
    },
  ],
});

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
    biography: {
      type: String,
      maxlength: [150, "Biography must be less than 150 characters"],
    },
    socialProfiles: [
      {
        type: String,
        profileUrl: String,
      },
    ],
    profilePicture: {
      public_id: String,
      secure_url: String,
    },
    slug: {
      type: String,
      required: [true, "Slug is required."],
      unique: true,
      lowercase: true,
    },
    rating: {
      type: Number,
      min: [1, "Rating must be atleast 1"],
      max: [5, "Rating must be less than or equal to 5"],
      // default: 0,
    },
    totalStudents: {
      type: Number,
      default: 0,
    },
    enrolledCourses: enrolledCoursesSchema,
    wishlist: wishlistSchema,
    isActive: {
      type: Boolean,
      default: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: [String],
  },
  {
    timestamps: true,
  },
);

// Static method to check if the email is already taken or not
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

// Hash password everytime if the password field is modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

// Update passwordChangedAt field when password is changed
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
