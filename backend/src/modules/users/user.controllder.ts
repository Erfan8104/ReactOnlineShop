import { Request, Response } from "express";
import { userService } from "./user.service";
import {
  updateProfileSchema,
  createAddressSchema,
  updateAddressSchema,
} from "./user.validator";

export const userController = {
  async getProfile(req: Request, res: Response) {
    const userId = req.user!.id;

    const user = await userService.getProfile(userId);

    return res.status(200).json({
      success: true,
      data: user,
    });
  },

  async updateProfile(req: Request, res: Response) {
    const userId = req.user!.id;

    const dto = updateProfileSchema.parse(req.body);

    const user = await userService.updateProfile(userId, dto);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  },

  async getAddresses(req: Request, res: Response) {
    const userId = req.user!.id;

    const addresses = await userService.getAddresses(userId);

    return res.status(200).json({
      success: true,
      data: addresses,
    });
  },

  async createAddress(req: Request, res: Response) {
    const userId = req.user!.id;

    const dto = createAddressSchema.parse(req.body);

    const address = await userService.createAddress(userId, dto);

    return res.status(201).json({
      success: true,
      message: "Address created successfully",
      data: address,
    });
  },

  async updateAddress(req: Request, res: Response) {
    const userId = req.user!.id;
    const addressId = Number(req.params.id);

    const dto = updateAddressSchema.parse(req.body);

    const address = await userService.updateAddress(userId, addressId, dto);

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: address,
    });
  },

  async deleteAddress(req: Request, res: Response) {
    const userId = req.user!.id;
    const addressId = Number(req.params.id);

    await userService.deleteAddress(userId, addressId);

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  },
};
