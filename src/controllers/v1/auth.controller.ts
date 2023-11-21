import commonResponse from "@/helpers/commonResponse";
import asyncHandler from "@/middlewares/asyncHandler.middleware";
import authService from "@/services/auth.service";
import emailService from "@/services/email.service";
import tokenService from "@/services/token.service";

/**
 * Register a new user in the system
 * @param {string} firstName - The first name of the user
 * @param {string} lastName - The last name of the user
 * @param {string} email - The email address of the user (required)
 * @param {string} password - The password for the user (required)
 * @returns {Promise<User[]>} - A promise that resolves to the registered user
 * @path {POST} /api/v1/auth/new
 * @access Public
 */
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

/**
 * Login a user in the system
 * @param {string} email - The email address of the user (required)
 * @param {string} password - The password for the user (required)
 * @returns {Promise<User[]>} - A promise that resolves once the login process is
 * completed
 * @path {POST} /api/v1/auth/
 * @access Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUserWithEmailAndPassword(email, password);

  const token = await tokenService.generateAuthTokens(user);

  user.password = undefined as unknown as string;

  return commonResponse(res, "User login successfully", { user, ...token });
});

const verify = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const user = await authService.verifyEmail(token);

  return commonResponse(res, "Email verified successfully", user);
});

export default {
  register,
  login,
  verify,
};
