import CONFIG from "@/configs";
import jwt from "jsonwebtoken";
import moment, { Moment } from "moment";
import { Types } from "mongoose";

import { IUser } from "@/models/user.model";

type Token = "refreshToken" | "accessToken" | "verify";

const generateToken = (
  userId: Types.ObjectId,
  expires: Moment,
  secret: string,
) => {
  const payload = {
    _id: userId,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user: IUser) => {
  const accessTokenExpires = moment().add(
    CONFIG.JWT.ACCESS_TOKEN_EXPIRY_IN_MINS,
    "minutes",
  );
  const accessToken = generateToken(
    user._id,
    accessTokenExpires,
    CONFIG.JWT.ACCESS_TOKEN_SECRET,
  );

  const refreshTokenExpires = moment().add(
    CONFIG.JWT.REFRESH_TOKEN_EXPIRY_IN_DAYS,
    "days",
  );
  const refreshToken = generateToken(
    user._id,
    refreshTokenExpires,
    CONFIG.JWT.REFRESH_TOKEN_SECRET,
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const verifyToken = async (token: string, secret: Token) => {
  if (secret === "accessToken") {
    return await jwt.verify(token, CONFIG.JWT.ACCESS_TOKEN_SECRET);
  } else if (secret === "refreshToken") {
    return await jwt.verify(token, CONFIG.JWT.REFRESH_TOKEN_SECRET);
  } else if (secret === "verify") {
    return await jwt.verify(token, CONFIG.USER_VERIFICATION);
  }
};

export default { generateAuthTokens, verifyToken };
