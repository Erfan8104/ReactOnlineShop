import { Request, Response } from "express";
import { brandService } from "./brand.service";
import { createBrandSchema, updateBrandSchema } from "./brand.validator";

export const brandController = {
  async create(req: Request, res: Response) {
    const dto = createBrandSchema.parse(req.body);

    const brand = await brandService.create(dto);

    return res.status(201).json({
      success: true,
      message: "Brand created successfully",
      data: brand,
    });
  },

  async findAll(_: Request, res: Response) {
    const brands = await brandService.findAll();

    return res.json({
      success: true,
      data: brands,
    });
  },

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const brand = await brandService.findById(id);

    return res.json({
      success: true,
      data: brand,
    });
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);

    const dto = updateBrandSchema.parse(req.body);

    const brand = await brandService.update(id, dto);

    return res.json({
      success: true,
      message: "Brand updated successfully",
      data: brand,
    });
  },

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);

    await brandService.remove(id);

    return res.json({
      success: true,
      message: "Brand deleted successfully",
    });
  },
};
