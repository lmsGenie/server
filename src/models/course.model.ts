import { Document, model, Schema } from "mongoose";

import CURRENCY_LIST from "@/utils/currency";

export interface ICourse extends Document {
  title: string;
  subTitle: string;
  category: Schema.Types.ObjectId[];
  subCategory: Schema.Types.ObjectId[];
  slug: string;
  language: string;
  topic: string;
  thumbnail: string;
  trailer?: string;
  description: string;
  courseOutline: string[];
  targetAudience: string[];
  preRequisites: string[];
  welcomeMessage?: string;
  completionMessage?: string;
  completionRate?: number;
  averageRating: number;
  sections: Schema.Types.ObjectId[];
  tools: Schema.Types.ObjectId[];
  courseLevel: string;
  listPrice: {
    price: number;
    currencyName: string;
    currencyCode: string;
    currencySymbol: string;
  };
  discountedPrice?: {
    price: number;
    currencyName: string;
    currencyCode: string;
    currencySymbol: string;
  };
  discountPercentage: number;
  instructors: Schema.Types.ObjectId[];
  totalEnrollments?: number;
  reviews?: Schema.Types.ObjectId[];
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      minlength: [2, "Course title must be atleast 2 characters long"],
      maxlength: [80, "Course title cannot be more than 80 characters"],
      trim: true,
    },
    subTitle: {
      type: String,
      required: [true, "Course title is required"],
      minlength: [8, "Course title must be atleast 8 characters long"],
      maxlength: [120, "Course title cannot be more than 120 characters"],
      trim: true,
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Course category is required"],
      },
    ],
    subCategory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Course sub category is required"],
      },
    ],
    slug: {
      type: String,
      required: [true, "Slug is required."],
      unique: true,
      lowercase: true,
    },
    language: {
      type: String,
      required: [true, "Course language is required."],
      lowercase: true,
    },
    topic: [
      {
        type: String,
        required: [true, "Course language is required."],
        trim: true,
      },
    ],
    thumbnail: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    trailer: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
      minlength: [100, "Course description must be at least 100 characters"],
      maxlength: [
        2500,
        "Course description cannot be more than 2500 characters",
      ],
      trim: true,
    },
    // Key points about the course
    courseOutline: {
      type: [
        {
          type: String,
          required: [true, "Course outline is required"],
          maxlength: [40, "Course outline cannot be more than 40 characters"],
        },
      ],
      validate: {
        validator: function (array: string[]) {
          return array.length <= 15;
        },
        message: "Course outline field cannot contain more than 15 points",
      },
    },
    // This field is who is this course for?
    targetAudience: [
      {
        type: String,
        required: [true, "Target audience is required"],
      },
    ],
    preRequisites: [
      {
        type: String,
        required: [true, "Course pre requisites is required"],
        trim: true,
      },
    ],
    welcomeMessage: {
      type: String,
      trim: true,
      lowercase: true,
    },
    completionMessage: {
      type: String,
      trim: true,
      lowercase: true,
    },
    completionRate: Number,
    averageRating: {
      type: Number,
      default: 0,
      min: [1, "Course rating must be atleast 1"],
      max: [5, "Course rating cannot be greater than 5"],
    },
    courseLevel: {
      type: String,
      required: [true, "Course level is required"],
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    listPrice: {
      price: {
        type: Number,
        required: [true, "Course price is required"],
      },
      currencyName: {
        type: String,
        enum: CURRENCY_LIST.map((currency) => currency.name),
        required: true,
      },
      currencyCode: {
        type: String,
        enum: CURRENCY_LIST.map((currency) => currency.code),
        required: true,
      },
      currencySymbol: {
        type: String,
        enum: CURRENCY_LIST.map((currency) => currency.symbol),
        required: true,
      },
    },
    discountedPrice: {
      price: Number,
      currencyName: {
        type: String,
        enum: CURRENCY_LIST.map((currency) => currency.name),
        required: true,
      },
      currencyCode: {
        type: String,
        enum: CURRENCY_LIST.map((currency) => currency.code),
        required: true,
      },
      currencySymbol: {
        type: String,
        enum: CURRENCY_LIST.map((currency) => currency.symbol),
        required: true,
      },
    },
    discountPercentage: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    instructors: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    totalEnrollments: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const CourseModel = model<ICourse>("Course", courseSchema);

export default CourseModel;
