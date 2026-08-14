import { AppError } from "@/common/errors/AppError";
import { brandRepository } from "./brand.repository";
import { CreateBrandDto, UpdateBrandDto } from "./brand.types";

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export const brandService = {
  async create(dto: CreateBrandDto) {
    const slug = dto.slug ? slugify(dto.slug) : slugify(dto.name);

    const exists = await brandRepository.findBySlug(slug);

    if (exists) {
      throw new AppError("Brand already exists", 409);
    }

    return brandRepository.create({
      name: dto.name,
      slug,
    });
  },

  async findAll() { 
    return brandRepository.findAll();
  },

  async findById(id: number) {
    const brand = await brandRepository.findById(id);

    if (!brand) {
      throw new AppError("Brand not found", 404);
    }

    return brand;
  },

  async update(id: number, dto: UpdateBrandDto) {
    const brand = await brandRepository.findById(id);

    if (!brand) {
      throw new AppError("Brand not found", 404);
    }

    let slug: string | undefined;

    if (dto.slug) {
      slug = slugify(dto.slug);

      const exists = await brandRepository.findBySlug(slug);

      if (exists && exists.id !== id) {
        throw new AppError("Brand slug already exists", 409);
      }
    }

    return brandRepository.update(id, {
      name: dto.name,
      slug,
    });
  },

  async remove(id: number) {
    const brand = await brandRepository.findById(id);

    if (!brand) {
      throw new AppError("Brand not found", 404);
    }

    await brandRepository.softDelete(id);
  },
};
