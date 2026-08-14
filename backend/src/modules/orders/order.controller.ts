import { Request, Response } from "express";
import { orderService } from "./order.service";
import { createOrderSchema, updateOrderStatusSchema } from "./order.validator";

export const orderController = {
  async create(req: Request, res: Response) {
    const userId = req.user!.id;

    const dto = createOrderSchema.parse(req.body);

    const order = await orderService.create(userId, dto);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  },

  async findMyOrders(req: Request, res: Response) {
    const userId = req.user!.id;

    const orders = await orderService.findMyOrders(userId);

    return res.status(200).json({
      success: true,
      data: orders,
    });
  },

  async findById(req: Request, res: Response) {
    const userId = req.user!.id;
    const orderId = Number(req.params.id);

    const order = await orderService.findById(userId, orderId);

    return res.status(200).json({
      success: true,
      data: order,
    });
  },

  async updateStatus(req: Request, res: Response) {
    const orderId = Number(req.params.id);

    const { status } = updateOrderStatusSchema.parse(req.body);

    const order = await orderService.updateStatus(orderId, status);

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  },
};
