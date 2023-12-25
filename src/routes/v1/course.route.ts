import courseController from "@/controllers/v1/course.controller";
import { ROLES_LIST } from "@/enums";
import { Router } from "express";

import { authorizeRoles, isLoggedIn } from "@/middlewares/auth.middleware";
import validate from "@/middlewares/validate.middleware";
import courseValidation from "@/validations/course.validation";

const courseRoute = Router();

/**
 * @ROUTE {{URL}}/api/v1/courses
 */
courseRoute
  .route("/")
  .post(
    isLoggedIn,
    authorizeRoles(ROLES_LIST.ADMIN, ROLES_LIST.INSTRUCTOR),
    validate(courseValidation.createCourseSchema),
    courseController.createCourse,
  );

/**
 * @ROUTE {{URL}}/api/v1/courses/category
 */
courseRoute
  .route("/category")
  .post(
    isLoggedIn,
    authorizeRoles(ROLES_LIST.ADMIN, ROLES_LIST.INSTRUCTOR),
    validate(courseValidation.createCategorySchema),
    courseController.createCategory,
  );

export default courseRoute;
