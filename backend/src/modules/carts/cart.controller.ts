import { Request, Response } from "express";
import { cartService } from "./cart.service";
import { addCartItemSchema, updateCartItemSchema } from "./cart.validator";

export const cartController = {
  async getCart(req: Request, res: Response) {
    const userId = req.user!.id;

    const cart = await cartService.getCart(userId);

    return res.status(200).json({
      success: true,
      data: cart,
    });
  },

  async addItem(req: Request, res: Response) {
    const userId = req.user!.id;

    const dto = addCartItemSchema.parse(req.body);

    const item = await cartService.addItem(userId, dto);

    return res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      data: item,
    });
  },

  async updateItem(req: Request, res: Response) {
    const userId = req.user!.id;
    const itemId = Number(req.params.itemId);

    const dto = updateCartItemSchema.parse(req.body);

    const item = await cartService.updateItem(userId, itemId, dto);

    return res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: item,
    });
  },

  async removeItem(req: Request, res: Response) {
    const userId = req.user!.id;
    const itemId = Number(req.params.itemId);

    await cartService.removeItem(userId, itemId);

    return res.status(200).json({
      success: true,
      message: "Cart item removed successfully",
    });
  },

  async clearCart(req: Request, res: Response) {
    const userId = req.user!.id;

    await cartService.clearCart(userId);

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  },
};
