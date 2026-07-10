import { AppError } from "@/common/errors/AppError";
import { authRepository } from "./auth.repository";
import { RegisterDto, LoginDto } from "./auth.types";

import {
  comparePassword,
  generateTokens,
  hashPassword,
  verifyToken,
} from "./auth.utils";

export const authService = {
  async register(dto: RegisterDto) {
    const exists = await authRepository.findByEmail(dto.email);

    if (exists) {
      throw new AppError("Email already exists", 409);
    }

    const password = await hashPassword(dto.password);

    const user = await authRepository.create({
      email: dto.email,
      password,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });

    return user;
  },

  async login(dto: LoginDto) {
    const user = await authRepository.findByEmail(dto.email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    if (!user.isActive) {
      throw new AppError("Account has been disabled", 403);
    }

    const matched = await comparePassword(dto.password, user.password);

    if (!matched) {
      throw new AppError("Invalid email or password", 401);
    }

    const tokens = generateTokens({
      userId: user.id,
      role: user.role,
    });

    await authRepository.saveRefreshToken(
      user.id,
      tokens.refreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      ...tokens,
    };
  },

  async refresh(token: string) {
    const stored = await authRepository.findRefreshToken(token);

    if (!stored) {
      throw new AppError("Refresh token is invalid", 401);
    }

    if (stored.revoked) {
      throw new AppError("Refresh token revoked", 401);
    }

    if (stored.expiresAt < new Date()) {
      throw new AppError("Refresh token expired", 401);
    }

    verifyToken(token);

    const tokens = generateTokens({
      userId: stored.user.id,
      role: stored.user.role,
    });

    await authRepository.revokeRefreshToken(token);

    await authRepository.saveRefreshToken(
      stored.user.id,
      tokens.refreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );

    return tokens;
  },

  async me(userId: number) {
    const user = await authRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar,
    };
  },

  async logout(refreshToken: string) {
    await authRepository.revokeRefreshToken(refreshToken);
  },

  async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await authRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const matched = await comparePassword(currentPassword, user.password);

    if (!matched) {
      throw new AppError("Current password is incorrect", 400);
    }

    const password = await hashPassword(newPassword);

    await authRepository.updatePassword(userId, password);

    await authRepository.revokeAllRefreshTokens(userId);

    return;
  },
};
