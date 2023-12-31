import { Types } from "mongoose";

import AppErr from "@/helpers/appErr";
import HTTP_STATUS from "@/utils/httpStatus";

import tokenService from "./token.service";
import userService from "./user.service";

const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  const user = await userService.createUser({
    firstName,
    lastName,
    email,
    password,
  });
  return user;
};

const loginUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  const user = await userService.getUserByEmail(email);

  if (!user || !(await user.comparePassword(password))) {
    throw new AppErr("Incorrect email or password", HTTP_STATUS.UNAUTHORIZED);
  }

  return user;
};

const verifyEmail = async (token: string) => {
  const tokenData = (await tokenService.verifyToken(token, "verify")) as {
    id: Types.ObjectId;
  };

  const user = await userService.verifyUser(tokenData.id);

  return user;
};

export default {
  registerUser,
  loginUserWithEmailAndPassword,
  verifyEmail,
};
