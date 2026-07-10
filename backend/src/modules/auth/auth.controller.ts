import { Request, Response } from "express";
import { authService } from "./auth.service";
import {
  loginSchema,
  registerSchema,
  changePasswordSchema,
} from "./auth.validator";

export const authController = {
  async register(req: Request, res: Response) {
    const dto = registerSchema.parse(req.body);

    const user = await authService.register(dto);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  },

  async login(req: Request, res: Response) {
    const dto = loginSchema.parse(req.body);

    const result = await authService.login(dto);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken: result.accessToken,
        user: result.user,
      },
    });
  },

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    const tokens = await authService.refresh(refreshToken);

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.json({
      success: true,
      data: {
        accessToken: tokens.accessToken,
      },
    });
  },

  async me(req: any, res: Response) {
    const user = await authService.me(req.user.userId);

    res.json({
      success: true,
      data: user,
    });
  },

  async logout(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    await authService.logout(refreshToken);

    res.clearCookie("refreshToken");

    res.json({
      success: true,
      message: "Logout successful",
    });
  },

  async changePassword(req: any, res: Response) {
    const dto = changePasswordSchema.parse(req.body);

    await authService.changePassword(
      req.user.userId,
      dto.currentPassword,
      dto.newPassword,
    );

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  },
};
