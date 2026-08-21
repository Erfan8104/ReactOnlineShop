import { Request, Response } from "express";
import { paymentService } from "./payment.service";
import {
  createPaymentSchema,
  paymentCallbackSchema,
} from "./payment.validator";

export const paymentController = {
  async create(req: Request, res: Response) {
    const userId = req.user!.id;

    const dto = createPaymentSchema.parse(req.body);

    const payment = await paymentService.create(userId, dto);

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment,
    });
  },

  async getByOrderId(req: Request, res: Response) {
    const userId = req.user!.id;
    const orderId = Number(req.params.orderId);

    const payment = await paymentService.getByOrderId(userId, orderId);

    return res.status(200).json({
      success: true,
      data: payment,
    });
  },

  async callback(req: Request, res: Response) {
    const dto = paymentCallbackSchema.parse(req.body);

    const payment = await paymentService.callback(dto);

    return res.status(200).json({
      success: true,
      message: "Payment callback processed successfully",
      data: payment,
    });
  },
};
