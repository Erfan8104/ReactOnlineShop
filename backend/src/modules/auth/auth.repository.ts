import { Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const authRepository = {
  findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
      },
    });
  },

  saveRefreshToken(userId: number, token: string, expiresAt: Date) {
    return prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  },

  findRefreshToken(token: string) {
    return prisma.refreshToken.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });
  },

  revokeRefreshToken(token: string) {
    return prisma.refreshToken.update({
      where: {
        token,
      },
      data: {
        revoked: true,
      },
    });
  },

  revokeAllRefreshTokens(userId: number) {
    return prisma.refreshToken.updateMany({
      where: {
        userId,
        revoked: false,
      },
      data: {
        revoked: true,
      },
    });
  },

  updatePassword(id: number, password: string) {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  },

  update(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  },
};
