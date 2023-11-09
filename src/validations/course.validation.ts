import { CATEGORY_TYPES, COURSE_LEVELS, DURATION_UNITS } from "@/enums";
import { z } from "zod";

import LANGUAGE_LIST from "@/utils/language";

const createCourseSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Course title is required",
        invalid_type_error: "Course title must be a string",
      })
      .min(2, {
        message: "Course title must be at least 2 characters",
      })
      .max(80, {
        message: "Course title cannot be more than 80 characters ",
      })
      .trim(),

    subTitle: z
      .string({
        required_error: "Course subtitle is required",
        invalid_type_error: "Course subtitle must be a string",
      })
      .min(8, {
        message: "Course subtitle must be at least 2 characters",
      })
      .max(120, {
        message: "Course subtitle cannot be more than 80 characters ",
      })
      .trim(),

    category: z
      .string({
        required_error: "Course category is required",
        invalid_type_error: "Course category must be a string",
      })
      .trim(),

    subCategory: z
      .string({
        required_error: "Course subcategory is required",
        invalid_type_error: "Course subcategory must be a string",
      })
      .trim(),

    language: z.enum(LANGUAGE_LIST as [string, ...string[]], {
      required_error: "Course language is required",
      invalid_type_error: `Course language must be one of  ${LANGUAGE_LIST})}`,
    }),

    topic: z
      .string({
        required_error: "Course topic is required",
        invalid_type_error: "Course topic must be a string",
      })
      .min(2, {
        message: "Course topic must be at least 2 characters",
      })
      .max(80, {
        message: "Course topic cannot be more than 80 characters ",
      })
      .trim(),

    courseLevel: z.enum(
      [
        COURSE_LEVELS.BEGINNER,
        COURSE_LEVELS.INTERMEDIATE,
        COURSE_LEVELS.ADVANCE,
      ],
      {
        required_error: "Course level is required",
        invalid_type_error: `Course level must be a one of ${Object.values(
          COURSE_LEVELS,
        )}`,
      },
    ),

    courseDuration: z.object({
      unit: z.enum(
        [
          DURATION_UNITS.MINUTES,
          DURATION_UNITS.HOURS,
          DURATION_UNITS.DAYS,
          DURATION_UNITS.MONTHS,
        ],
        {
          required_error: "Course duration unit is required",
          invalid_type_error: `Course duration unit must be one of ${Object.values(
            DURATION_UNITS,
          )}`,
        },
      ),
      value: z
        .number({
          required_error: "Course duration value is required",
          invalid_type_error: "Course duration value must be number",
        })
        .min(1, {
          message: "Course duration value must be atleast 1",
        }),
    }),
  }),
});

const createCategorySchema = z.object({
  body: z.object({
    type: z.enum([CATEGORY_TYPES.MAIN_CATEGORY, CATEGORY_TYPES.SUB_CATEGORY], {
      required_error: "Category type is required",
      invalid_type_error: `Category type must be one of ${Object.values(
        CATEGORY_TYPES,
      )}`,
    }),

    name: z
      .string({
        required_error: "Category name is required",
        invalid_type_error: "Category name must be a string",
      })
      .min(8, {
        message: "Category name must be at least 8 characters",
      })
      .max(120, {
        message: "Category name cannot be more than 120 characters ",
      })
      .trim(),
  }),
});

type CreateCourseSchema = z.infer<typeof createCourseSchema>["body"];
type CreateCategorySchema = z.infer<typeof createCategorySchema>["body"];

export default { createCourseSchema, createCategorySchema };
export type { CreateCourseSchema, CreateCategorySchema };
