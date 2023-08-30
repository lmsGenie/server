import { Types } from "mongoose";

import { ICreateUser } from "@/types/user.type";

import AppErr from "@/helpers/appErr";
import UserModel from "@/models/user.model";
import HTTP_STATUS from "@/utils/httpStatus";

const createUser = async (userBody: ICreateUser) => {
  if (await UserModel.isEmailTaken(userBody.email)) {
    throw new AppErr("User already exists", HTTP_STATUS.BAD_REQUEST);
  }
  return UserModel.create(userBody);
};

const getUserByEmail = async (email: string) => {
  return UserModel.findOne({ email });
};

const getUserById = async (id: Types.ObjectId) => {
  return UserModel.findById(id);
};

export default {
  createUser,
  getUserByEmail,
  getUserById,
};
