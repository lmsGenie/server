import commonResponse from "@/helpers/commonResponse";
import asyncHandler from "@/middlewares/asyncHandler.middleware";
import courseService from "@/services/course.service";

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

  return commonResponse(res, "Course created successfully", course);
});

const createCategory = asyncHandler(async (req, res) => {
  const { type, name } = req.body;

  const category = await courseService.createCategory(type, name);

  return commonResponse(res, "Category created successfully", category);
});

export default {
  createCourse,
  createCategory,
};
