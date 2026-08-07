import { AppError } from "@/common/errors/AppError";
import { brandRepository } from "@/modules/brands/brand.repository";
import { categoryRepository } from "@/modules/categories/category.repository";
import { productRepository } from "./product.repository";
import { CreateProductDto, UpdateProductDto } from "./product.types";

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export const productService = {
  async create(dto: CreateProductDto) {
    const slug = dto.slug ? slugify(dto.slug) : slugify(dto.title);

    const exists = await productRepository.findBySlug(slug);

    if (exists) {
      throw new AppError("Product slug already exists", 409);
    }

    const category = await categoryRepository.findById(dto.categoryId);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    if (dto.brandId) {
      const brand = await brandRepository.findById(dto.brandId);

      if (!brand) {
        throw new AppError("Brand not found", 404);
      }
    }

    const product = await productRepository.create({
      title: dto.title,
      slug,
      description: dto.description,
      sku: dto.sku,
      price: dto.price,
      discountPercent: dto.discountPercent,
      stock: dto.stock,
      weight: dto.weight,
      isActive: dto.isActive,

      category: {
        connect: {
          id: dto.categoryId,
        },
      },

      brand: dto.brandId
        ? {
            connect: {
              id: dto.brandId,
            },
          }
        : undefined,
    });

    if (dto.images?.length) {
      for (const image of dto.images) {
        await productRepository.createImage({
          url: image.url,
          isPrimary: image.isPrimary,

          product: {
            connect: {
              id: product.id,
            },
          },
        });
      }
    }

    return productRepository.findById(product.id);
  },

  async findAll() {
    return productRepository.findAll();
  },

  async findById(id: number) {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  },

  async update(id: number, dto: UpdateProductDto) {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    let slug: string | undefined;

    if (dto.slug) {
      slug = slugify(dto.slug);

      const exists = await productRepository.findBySlug(slug);

      if (exists && exists.id !== id) {
        throw new AppError("Product slug already exists", 409);
      }
    }

    if (dto.categoryId) {
      const category = await categoryRepository.findById(dto.categoryId);

      if (!category) {
        throw new AppError("Category not found", 404);
      }
    }

    if (dto.brandId) {
      const brand = await brandRepository.findById(dto.brandId);

      if (!brand) {
        throw new AppError("Brand not found", 404);
      }
    }

    const updatedProduct = await productRepository.update(id, {
      title: dto.title,
      slug,
      description: dto.description,
      sku: dto.sku,
      price: dto.price,
      discountPercent: dto.discountPercent,
      stock: dto.stock,
      weight: dto.weight,
      isActive: dto.isActive,

      category: dto.categoryId
        ? {
            connect: {
              id: dto.categoryId,
            },
          }
        : undefined,

      brand:
        dto.brandId === null
          ? {
              disconnect: true,
            }
          : dto.brandId
            ? {
                connect: {
                  id: dto.brandId,
                },
              }
            : undefined,
    });

    if (dto.images) {
      await productRepository.deleteImages(id);

      for (const image of dto.images) {
        await productRepository.createImage({
          url: image.url,
          isPrimary: image.isPrimary,
          product: {
            connect: {
              id,
            },
          },
        });
      }
    }

    return updatedProduct;
  },

  async remove(id: number) {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    await productRepository.softDelete(id);
  },
};
