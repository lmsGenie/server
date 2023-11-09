import courseController from "@/controllers/v1/course.controller";
import { Router } from "express";

import validate from "@/middlewares/validate.middleware";
import courseValidation from "@/validations/course.validation";

const courseRoute = Router();

/**
 * @ROUTE {{URL}}/api/v1/course
 */
courseRoute
  .route("/")
  .post(
    validate(courseValidation.createCourseSchema),
    courseController.createCourse,
  );

/**
 * @ROUTE {{URL}}/api/v1/course/category
 */
courseRoute
  .route("/category")
  .post(
    validate(courseValidation.createCategorySchema),
    courseController.createCategory,
  );

export default courseRoute;
