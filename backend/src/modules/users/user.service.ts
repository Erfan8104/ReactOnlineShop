import { AppError } from "@/common/errors/AppError";
import { prisma } from "@/lib/prisma";
import { userRepository } from "./user.repository";
import type {
  UpdateProfileDto,
  CreateAddressDto,
  UpdateAddressDto,
} from "./user.types";

export const userService = {
  async getProfile(userId: number) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  },

  async updateProfile(userId: number, dto: UpdateProfileDto) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (dto.email && dto.email !== user.email) {
      const existingUser = await userRepository.findByEmail(dto.email);

      if (existingUser) {
        throw new AppError("Email is already in use", 409);
      }
    }

    return userRepository.update(userId, {
      ...(dto.email !== undefined && {
        email: dto.email,
      }),

      ...(dto.firstName !== undefined && {
        firstName: dto.firstName,
      }),

      ...(dto.lastName !== undefined && {
        lastName: dto.lastName,
      }),

      ...(dto.phone !== undefined && {
        phone: dto.phone,
      }),

      ...(dto.avatar !== undefined && {
        avatar: dto.avatar,
      }),
    });
  },

  async getAddresses(userId: number) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return userRepository.findAddresses(userId);
  },

  async createAddress(userId: number, dto: CreateAddressDto) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return prisma.$transaction(async (tx) => {
      if (dto.isDefault) {
        await userRepository.clearDefaultAddresses(userId, tx);
      }

      return tx.address.create({
        data: {
          title: dto.title,
          province: dto.province,
          city: dto.city,
          address: dto.address,
          postalCode: dto.postalCode,
          isDefault: dto.isDefault ?? false,

          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    });
  },

  async updateAddress(
    userId: number,
    addressId: number,
    dto: UpdateAddressDto,
  ) {
    const address = await userRepository.findAddressById(addressId, userId);

    if (!address) {
      throw new AppError("Address not found", 404);
    }

    return prisma.$transaction(async (tx) => {
      if (dto.isDefault) {
        await userRepository.clearDefaultAddresses(userId, tx);
      }

      return tx.address.update({
        where: {
          id: addressId,
        },
        data: dto,
      });
    });
  },

  async deleteAddress(userId: number, addressId: number) {
    const address = await userRepository.findAddressById(addressId, userId);

    if (!address) {
      throw new AppError("Address not found", 404);
    }

    await userRepository.deleteAddress(addressId);
  },
};
