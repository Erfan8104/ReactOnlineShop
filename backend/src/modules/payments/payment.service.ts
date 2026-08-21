import { AppError } from "@/common/errors/AppError";
import { prisma } from "@/lib/prisma";
import { paymentRepository } from "./payment.repository";
import type { CreatePaymentDto, PaymentCallbackDto } from "./payment.types";

export const paymentService = {
  async create(userId: number, dto: CreatePaymentDto) {
    const order = await prisma.order.findUnique({
      where: {
        id: dto.orderId,
      },
      include: {
        payment: true,
      },
    });

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    if (order.userId !== userId) {
      throw new AppError("You do not have access to this order", 403);
    }

    if (order.status === "CANCELLED") {
      throw new AppError("Cancelled orders cannot be paid", 400);
    }

    if (order.payment) {
      if (order.payment.status === "SUCCESS") {
        throw new AppError("Order has already been paid", 400);
      }

      return order.payment;
    }

    return prisma.$transaction(async (tx) => {
      return paymentRepository.create(tx, {
        order: {
          connect: {
            id: order.id,
          },
        },

        status: "PENDING",

        gateway: "manual",
      });
    });
  },

  async getByOrderId(userId: number, orderId: number) {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    if (order.userId !== userId) {
      throw new AppError("You do not have access to this order", 403);
    }

    const payment = await paymentRepository.findByOrderId(orderId);

    if (!payment) {
      throw new AppError("Payment not found", 404);
    }

    return payment;
  },

  async callback(dto: PaymentCallbackDto) {
    const payment = await prisma.payment.findFirst({
      where: {
        authority: dto.authority,
      },
    });

    if (!payment) {
      throw new AppError("Payment not found", 404);
    }

    if (payment.status === "SUCCESS") {
      return payment;
    }

    const isSuccessful =
      dto.status.toUpperCase() === "OK" ||
      dto.status.toUpperCase() === "SUCCESS";

    return prisma.$transaction(async (tx) => {
      const updatedPayment = await tx.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          status: isSuccessful ? "SUCCESS" : "FAILED",

          transactionId: dto.transactionId,

          refId: dto.refId,
        },
      });

      if (isSuccessful) {
        await tx.order.update({
          where: {
            id: payment.orderId,
          },
          data: {
            status: "CONFIRMED",
          },
        });
      }

      return updatedPayment;
    });
  },
};
