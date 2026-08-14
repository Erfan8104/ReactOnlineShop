import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const cartRepository = {
  findByUserId(userId: number) {
    return prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
                category: true,
                brand: true,
              },
            },
          },
        },
      },
    });
  },

  create(userId: number) {
    return prisma.cart.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });
  },

  findItem(cartId: number, productId: number) {
    return prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
      include: {
        product: true,
      },
    });
  },

  addItem(data: Prisma.CartItemCreateInput) {
    return prisma.cartItem.create({
      data,
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    });
  },

  updateItem(id: number, quantity: number) {
    return prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    });
  },

  removeItem(id: number) {
    return prisma.cartItem.delete({
      where: {
        id,
      },
    });
  },

  clear(cartId: number) {
    return prisma.cartItem.deleteMany({
      where: {
        cartId,
      },
    });
  },
};
