import AppErr from "@/helpers/appErr";
import HTTP_STATUS from "@/utils/httpStatus";

import userService from "./user.service";

const registerUser = async (name: string, email: string, password: string) => {
  const user = await userService.createUser({ name, email, password });
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

export default {
  registerUser,
  loginUserWithEmailAndPassword,
};
