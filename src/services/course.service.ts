import CourseModel from "@/models/course.model";

const createCourse = async (
  title: string,
  subTitle: string,
  category: string,
  subCategory: string,
  language: string,
  topic: string,
  courseLevel: string,
  courseDuration: string,
) => {
  const slug = title.split(" ").join("-");

  const course = await CourseModel.create({
    title,
    subTitle,
    category,
    subCategory,
    language,
    topic,
    courseLevel,
    courseDuration,
    slug,
  });

  return course;
};

export default {
  createCourse,
};
