import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const brandRepository = {
  create(data: Prisma.BrandCreateInput) {
    return prisma.brand.create({
      data,
    });
  },

  findAll() {
    return prisma.brand.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  findById(id: number) {
    return prisma.brand.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        products: {
          where: {
            deletedAt: null,
          },
          select: {
            id: true,
            title: true,
            slug: true,
            price: true,
            stock: true,
            isActive: true,
          },
        },
      },
    });
  },

  findBySlug(slug: string) {
    return prisma.brand.findFirst({
      where: {
        slug,
        deletedAt: null,
      },
    });
  },

  update(id: number, data: Prisma.BrandUpdateInput) {
    return prisma.brand.update({
      where: {
        id,
      },
      data,
    });
  },

  softDelete(id: number) {
    return prisma.brand.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  },

  exists(id: number) {
    return prisma.brand.count({
      where: {
        id,
        deletedAt: null,
      },
    });
  },
};
    