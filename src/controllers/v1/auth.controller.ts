import commonResponse from "@/helpers/commonResponse";
import asyncHandler from "@/middlewares/asyncHandler.middleware";
import authService from "@/services/auth.service";
import emailService from "@/services/email.service";
import tokenService from "@/services/token.service";

const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await authService.registerUser(
    firstName,
    lastName,
    email,
    password,
  );

  const verificationToken = await user.generateVerificationToken();

  await emailService.sendVerificationMail(
    email,
    firstName + " " + lastName,
    verificationToken,
  );

  user.password = undefined as unknown as string;

  return commonResponse(res, "User register successfully", user);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUserWithEmailAndPassword(email, password);

  const token = await tokenService.generateAuthTokens(user);

  user.password = undefined as unknown as string;

  return commonResponse(res, "User login successfully", { user, ...token });
});

export default {
  register,
  login,
};
