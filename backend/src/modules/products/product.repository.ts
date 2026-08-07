import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const productRepository = {
  create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({
      data,
      include: {
        category: true,
        brand: true,
        images: true,
      },
    });
  },

  findAll() {
    return prisma.product.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        category: true,
        brand: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  findById(id: number) {
    return prisma.product.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        category: true,
        brand: true,
        images: true,
      },
    });
  },

  findBySlug(slug: string) {
    return prisma.product.findFirst({
      where: {
        slug,
        deletedAt: null,
      },
      include: {
        category: true,
        brand: true,
        images: true,
      },
    });
  },

  update(id: number, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({
      where: {
        id,
      },
      data,
      include: {
        category: true,
        brand: true,
        images: true,
      },
    });
  },

  softDelete(id: number) {
    return prisma.product.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  },

  exists(id: number) {
    return prisma.product.count({
      where: {
        id,
        deletedAt: null,
      },
    });
  },

  createImage(data: Prisma.ProductImageCreateInput) {
    return prisma.productImage.create({
      data,
    });
  },

  deleteImages(productId: number) {
    return prisma.productImage.deleteMany({
      where: {
        productId,
      },
    });
  },
};
