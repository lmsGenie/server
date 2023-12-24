import commonResponse from "@/helpers/commonResponse";
import asyncHandler from "@/middlewares/asyncHandler.middleware";
import categoryService from "@/services/category.service";
import courseService from "@/services/course.service";

/**
 * Create a new course
 * @param {string} title - The title of the course (required)
 * @param {string} subTitle - The sub title of the course (required)
 * @param {string} category - The category of the course (required)
 * @param {string} subCategory - The sub category of the course (required)
 * @param {string} language - The language of the course (required)
 * @param {string} topic - The primary topic of the course (required)
 * @param {string} courseLevel - The difficulty level of the course (required)
 * @param {number} courseDuration - The duration of the course (required)
 * @returns {Object}  - An object containing success (boolean), message and course specific data}
 * @path {POST} /api/v1/courses
 * @access Protected
 */
const createCourse = asyncHandler(async (req, res) => {
  const {
    title,
    subTitle,
    category,
    subCategory,
    language,
    topic,
    courseLevel,
    courseDuration,
  } = req.body;

  const course = await courseService.createCourse(
    title,
    subTitle,
    category,
    subCategory,
    language,
    topic,
    courseLevel,
    courseDuration,
  );

  return commonResponse(res, "Course created successfully", course, 201);
});

/**
 * Create a new category/subcategory
 * @param {string} type - The category type[MAIN_CATEGORY, SUB_CATEGORY](required)
 * @param {string} name - The category name(required)
 * @returns {Object}  - an object containing success (boolean), message and category specific data
 * @path {POST} /api/v1/courses/category
 * @access Protected
 */
const createCategory = asyncHandler(async (req, res) => {
  const { type, name } = req.body;

  const category = await categoryService.createCategory(type, name);

  return commonResponse(res, "Category created successfully", category, 201);
});

export default {
  createCourse,
  createCategory,
};
