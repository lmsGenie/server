import { CATEGORY_TYPES, COURSE_LEVELS } from "@/enums";
import mongoose, { Document, model, Schema } from "mongoose";

import createSlug from "@/helpers/slugGenerator";
import CURRENCY_LIST from "@/utils/currency";
import LANGUAGE_LIST from "@/utils/language";

export interface ICourse extends Document {
  title: string;
  subTitle: string;
  category: Schema.Types.ObjectId[];
  subCategory: Schema.Types.ObjectId[];
  slug: string;
  language: string;
  topic: string;
  thumbnail?: string;
  trailer?: string;
  description?: string;
  courseOutline?: string[];
  targetAudience?: string[];
  preRequisites?: string[];
  welcomeMessage?: string;
  completionMessage?: string;
  completionRate?: number;
  averageRating?: number;
  sections?: Schema.Types.ObjectId[];
  tools?: Schema.Types.ObjectId[];
  courseLevel: string;
  listPrice?: {
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
  discountPercentage?: number;
  instructors?: Schema.Types.ObjectId[];
  totalEnrollments?: number;
  reviews?: Schema.Types.ObjectId[];
  courseDuration: {
    unit: string;
    value: number;
  };
}

export interface ICategory extends Document {
  type: CATEGORY_TYPES.MAIN_CATEGORY | CATEGORY_TYPES.SUB_CATEGORY;
  name: string;
}

const categorySchema = new Schema<ICategory>({
  type: {
    type: String,
    enum: Object.values(CATEGORY_TYPES),
    required: [true, "Category type is required"],
  },
  name: {
    type: String,
    required: [true, "Category name is required"],
    minlength: [8, "Category name must be atleast 8 characters long"],
    maxlength: [120, "Category name cannot be more than 120 characters"],
    trim: true,
  },
});

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
      required: [true, "Course Slug is required"],
      unique: true,
      lowercase: true,
    },
    language: {
      type: String,
      enum: LANGUAGE_LIST,
      required: [true, "Course language is required."],
    },
    topic: [
      {
        type: String,
        required: [true, "Course topic is required."],
        minlength: [2, "Course topic must be atleast 8 characters long"],
        maxlength: [80, "Course topic cannot be more than 120 characters"],
        trim: true,
      },
    ],
    thumbnail: {
      public_id: String,
      secure_url: String,
    },
    trailer: {
      public_id: String,
      secure_url: String,
    },
    description: {
      type: String,
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
    targetAudience: [String],
    preRequisites: [
      {
        type: String,
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
      min: [1, "Course rating must be atleast 1"],
      max: [5, "Course rating cannot be greater than 5"],
    },
    courseLevel: {
      type: String,
      enum: Object.values(COURSE_LEVELS),
    },
    listPrice: {
      price: Number,
      currencyName: {
        type: String,
        enum: CURRENCY_LIST.map((currency) => currency.name),
      },
      currencyCode: {
        type: String,
        enum: CURRENCY_LIST.map((currency) => currency.code),
      },
      currencySymbol: {
        type: String,
        enum: CURRENCY_LIST.map((currency) => currency.symbol),
      },
    },
    discountedPrice: {
      price: Number,
      currencyName: {
        type: String,
        enum: CURRENCY_LIST.map((currency) => currency.name),
      },
      currencyCode: {
        type: String,
        enum: CURRENCY_LIST.map((currency) => currency.code),
      },
      currencySymbol: {
        type: String,
        enum: CURRENCY_LIST.map((currency) => currency.symbol),
      },
    },
    discountPercentage: {
      type: Number,
      min: [1, "Course discount percentage must be atleast 1"],
      max: [100, "Course discount percentage cannot be greater than 100"],
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
      default: 0,
    },
    courseDuration: {
      type: Number,
      required: [true, "Course duration(in hrs) value is required"],
      min: [1, "Course duration(in hrs) value must be atleast 1"],
    },
  },
  {
    timestamps: true,
  },
);

// Method to create and update slug for course
courseSchema.pre("save", async function (next) {
  if (!this.isModified("title")) return next();

  const newSlug = createSlug(this.title);
  const result = await CourseModel.find({ slug: newSlug });

  if (result.length === 0) {
    this.slug = newSlug;
  } else {
    const uniqueString = new mongoose.Types.ObjectId().toString();
    this.slug = `${newSlug}-${uniqueString.slice(-6, uniqueString.length)}`;
  }

  next();
});

const CategoryModel = model<ICategory>("Category", categorySchema);
const CourseModel = model<ICourse>("Course", courseSchema);

export default CourseModel;
export { CategoryModel };
