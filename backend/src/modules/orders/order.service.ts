import { AppError } from "@/common/errors/AppError";
import { prisma } from "@/lib/prisma";
import { orderRepository } from "./order.repository";
import { CreateOrderDto } from "./order.types";

export const orderService = {
  async create(userId: number, dto: CreateOrderDto) {
    return prisma.$transaction(async (tx) => {
      const cart = await orderRepository.findCartByUserId(
        tx,
        userId
      );

      if (!cart || cart.items.length === 0) {
        throw new AppError("Cart is empty", 400);
      }

      let totalAmount = 0;

      const orderItems = cart.items.map((item) => {
        const product = item.product;

        if (!product.isActive || product.deletedAt) {
          throw new AppError(
            `Product "${product.title}" is no longer available`,
            400
          );
        }

        if (product.stock < item.quantity) {
          throw new AppError(
            `Insufficient stock for "${product.title}"`,
            400
          );
        }

        const price = Number(product.price);

        const discount =
          product.discountPercent ?? 0;

        const finalPrice =
          price - (price * discount) / 100;

        totalAmount +=
          finalPrice * item.quantity;

        return {
          product: {
            connect: {
              id: product.id,
            },
          },
          quantity: item.quantity,
          priceAtPurchase: finalPrice,
        };
      });

      const order = await orderRepository.create(tx, {
        user: {
          connect: {
            id: userId,
          },
        },

        status: "PENDING",

        totalAmount,

        shippingProvince: dto.shippingProvince,
        shippingCity: dto.shippingCity,
        shippingAddress: dto.shippingAddress,
        shippingPostalCode: dto.shippingPostalCode,

        items: {
          create: orderItems,
        },
      });

      for (const item of cart.items) {
        await orderRepository.updateProductStock(
          tx,
          item.productId,
          item.quantity
        );
      }

      await orderRepository.clearCart(
        tx,
        cart.id
      );

      return order;
    });
  },

  async findById(
    userId: number,
    orderId: number
  ) {
    const order = await orderRepository.findById(
      orderId
    );

    if (!order) {
      throw new AppError(
        "Order not found",
        404
      );
    }

    if (order.userId !== userId) {
      throw new AppError(
        "You do not have access to this order",
        403
      );
    }

    return order;
  },

  async findMyOrders(userId: number) {
    return orderRepository.findByUserId(
      userId
    );
  },

  async updateStatus(
    orderId: number,
    status: CreateOrderDto["status"]
  ) {
    const order = await orderRepository.findById(
      orderId
    );

    if (!order) {
      throw new AppError(
        "Order not found",
        404
      );
    }

    return orderRepository.updateStatus(
      orderId,
      status
    );
  },
};