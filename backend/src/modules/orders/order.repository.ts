import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const orderRepository = {
  create(tx: Prisma.TransactionClient, data: Prisma.OrderCreateInput) {
    return tx.order.create({
      data,
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                slug: true,
                images: true,
              },
            },
          },
        },
        payment: true,
      },
    });
  },

  findById(id: number) {
    return prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                slug: true,
                images: true,
              },
            },
          },
        },
        payment: true,
      },
    });
  },

  findByUserId(userId: number) {
    return prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                slug: true,
                images: true,
              },
            },
          },
        },
        payment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  findCartByUserId(tx: Prisma.TransactionClient, userId: number) {
    return tx.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  },

  updateProductStock(
    tx: Prisma.TransactionClient,
    productId: number,
    quantity: number,
  ) {
    return tx.product.update({
      where: {
        id: productId,
      },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });
  },

  clearCart(tx: Prisma.TransactionClient, cartId: number) {
    return tx.cartItem.deleteMany({
      where: {
        cartId,
      },
    });
  },

  updateStatus(id: number, status: Prisma.OrderUpdateInput["status"]) {
    return prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
      include: {
        items: true,
        payment: true,
      },
    });
  },
};
