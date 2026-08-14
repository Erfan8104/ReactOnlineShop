import { AppError } from "@/common/errors/AppError";
import { productRepository } from "@/modules/products/product.repository";
import { cartRepository } from "./cart.repository";
import { AddCartItemDto, UpdateCartItemDto } from "./cart.types";

export const cartService = {
  async getCart(userId: number) {
    let cart = await cartRepository.findByUserId(userId);

    if (!cart) {
      cart = await cartRepository.create(userId);
    }

    return cart;
  },

  async addItem(userId: number, dto: AddCartItemDto) {
    const product = await productRepository.findById(dto.productId);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    if (!product.isActive) {
      throw new AppError("Product is not available", 400);
    }

    if (product.stock < dto.quantity) {
      throw new AppError(`Only ${product.stock} items are available`, 400);
    }

    let cart = await cartRepository.findByUserId(userId);

    if (!cart) {
      cart = await cartRepository.create(userId);
    }

    const existingItem = await cartRepository.findItem(cart.id, dto.productId);

    const newQuantity = existingItem
      ? existingItem.quantity + dto.quantity
      : dto.quantity;

    if (newQuantity > product.stock) {
      throw new AppError(`Only ${product.stock} items are available`, 400);
    }

    if (existingItem) {
      return cartRepository.updateItem(existingItem.id, newQuantity);
    }

    return cartRepository.addItem({
      quantity: dto.quantity,

      cart: {
        connect: {
          id: cart.id,
        },
      },

      product: {
        connect: {
          id: dto.productId,
        },
      },
    });
  },

  async updateItem(userId: number, itemId: number, dto: UpdateCartItemDto) {
    const cart = await cartRepository.findByUserId(userId);

    if (!cart) {
      throw new AppError("Cart not found", 404);
    }

    const item = cart.items.find((cartItem) => cartItem.id === itemId);

    if (!item) {
      throw new AppError("Cart item not found", 404);
    }

    if (!item.product.isActive) {
      throw new AppError("Product is not available", 400);
    }

    if (dto.quantity > item.product.stock) {
      throw new AppError(`Only ${item.product.stock} items are available`, 400);
    }

    return cartRepository.updateItem(itemId, dto.quantity);
  },

  async removeItem(userId: number, itemId: number) {
    const cart = await cartRepository.findByUserId(userId);

    if (!cart) {
      throw new AppError("Cart not found", 404);
    }

    const item = cart.items.find((cartItem) => cartItem.id === itemId);

    if (!item) {
      throw new AppError("Cart item not found", 404);
    }

    await cartRepository.removeItem(itemId);
  },

  async clearCart(userId: number) {
    const cart = await cartRepository.findByUserId(userId);

    if (!cart) {
      throw new AppError("Cart not found", 404);
    }

    await cartRepository.clear(cart.id);
  },
};
