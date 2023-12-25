import { ProtectedRequest } from "@/types/app-request";

import asyncHandler from "@/middlewares/asyncHandler.middleware";
import orderService from "@/services/order.service";
import HTTP_STATUS from "@/utils/httpStatus";

const create = asyncHandler(async (req: ProtectedRequest, res) => {
  const order = await orderService.create(req);

  return res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Order created successfully",
    data: order,
  });
});

export default {
  create,
};
