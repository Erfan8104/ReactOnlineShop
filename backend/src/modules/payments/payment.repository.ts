import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const paymentRepository = {
  findByOrderId(orderId: number) {
    return prisma.payment.findUnique({
      where: {
        orderId,
      },
      include: {
        order: {
          select: {
            id: true,
            userId: true,
            status: true,
            totalAmount: true,
          },
        },
      },
    });
  },

  create(tx: Prisma.TransactionClient, data: Prisma.PaymentCreateInput) {
    return tx.payment.create({
      data,
      include: {
        order: true,
      },
    });
  },

  update(id: number, data: Prisma.PaymentUpdateInput) {
    return prisma.payment.update({
      where: {
        id,
      },
      data,
      include: {
        order: true,
      },
    });
  },

  updateByOrderId(orderId: number, data: Prisma.PaymentUpdateInput) {
    return prisma.payment.update({
      where: {
        orderId,
      },
      data,
      include: {
        order: true,
      },
    });
  },
};
