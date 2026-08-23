import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const userRepository = {
  findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        addresses: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  update(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  delete(id: number) {
    return prisma.user.delete({
      where: { id },
    });
  },

  findAddresses(userId: number) {
    return prisma.address.findMany({
      where: {
        userId,
      },
      orderBy: [
        {
          isDefault: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });
  },

  createAddress(data: Prisma.AddressCreateInput) {
    return prisma.address.create({
      data,
    });
  },

  findAddressById(id: number, userId: number) {
    return prisma.address.findFirst({
      where: {
        id,
        userId,
      },
    });
  },

  updateAddress(id: number, data: Prisma.AddressUpdateInput) {
    return prisma.address.update({
      where: { id },
      data,
    });
  },

  deleteAddress(id: number) {
    return prisma.address.delete({
      where: { id },
    });
  },

  async clearDefaultAddresses(
    userId: number,
    tx: Prisma.TransactionClient = prisma,
  ) {
    return tx.address.updateMany({
      where: {
        userId,
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });
  },
};
