import { CategoryModel } from "@/models/course.model";

const createCategory = async (type: string, name: string) => {
  const category = await CategoryModel.create({
    type,
    name,
  });

  return category;
};

export default {
  createCategory,
};
