import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const categoryRepository = {
  create(data: Prisma.CategoryCreateInput) {
    return prisma.category.create({
      data,
    });
  },

  findAll() {
    return prisma.category.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        children: {
          where: {
            deletedAt: null,
          },
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  findById(id: number) {
    return prisma.category.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        parent: true,
        children: {
          where: {
            deletedAt: null,
          },
        },
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
    return prisma.category.findFirst({
      where: {
        slug,
        deletedAt: null,
      },
    });
  },

  update(id: number, data: Prisma.CategoryUpdateInput) {
    return prisma.category.update({
      where: {
        id,
      },
      data,
    });
  },

  softDelete(id: number) {
    return prisma.category.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  },

  exists(id: number) {
    return prisma.category.count({
      where: {
        id,
        deletedAt: null,
      },
    });
  },
};
