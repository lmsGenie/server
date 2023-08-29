import { Response } from "express";

import HTTP_STATUS from "@/utils/httpStatus";

const commonResponse = (
  res: Response,
  message: string,
  data?: unknown,
  statusCode: HTTP_STATUS = HTTP_STATUS.OK,
  success = true,
) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export default commonResponse;
