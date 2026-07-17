import { AppError } from "@/common/errors/AppError";
import { categoryRepository } from "./category.repository";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.types";

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export const categoryService = {
  async create(dto: CreateCategoryDto) {
    const slug = dto.slug ? slugify(dto.slug) : slugify(dto.name);

    const exists = await categoryRepository.findBySlug(slug);

    if (exists) {
      throw new AppError("Category slug already exists", 409);
    }

    if (dto.parentId) {
      const parent = await categoryRepository.findById(dto.parentId);

      if (!parent) {
        throw new AppError("Parent category not found", 404);
      }
    }

    return categoryRepository.create({
      name: dto.name,
      slug,
      parent: dto.parentId
        ? {
            connect: {
              id: dto.parentId,
            },
          }
        : undefined,
    });
  },

  async findAll() {
    return categoryRepository.findAll();
  },

  async findById(id: number) {
    const category = await categoryRepository.findById(id);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return category;
  },

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await categoryRepository.findById(id);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    let slug: string | undefined;

    if (dto.slug) {
      slug = slugify(dto.slug);

      const exists = await categoryRepository.findBySlug(slug);

      if (exists && exists.id !== id) {
        throw new AppError("Category slug already exists", 409);
      }
    }

    return categoryRepository.update(id, {
      name: dto.name,
      slug,
      parent: dto.parentId
        ? {
            connect: {
              id: dto.parentId,
            },
          }
        : dto.parentId === null
          ? {
              disconnect: true,
            }
          : undefined,
    });
  },

  async remove(id: number) {
    const category = await categoryRepository.findById(id);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    if (category.children.length > 0) {
      throw new AppError(
        "Cannot delete a category that has child categories",
        400,
      );
    }

    await categoryRepository.softDelete(id);
  },
};
