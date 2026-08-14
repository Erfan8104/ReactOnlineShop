import { Request, Response } from "express";
import { productService } from "./product.service";
import { createProductSchema, updateProductSchema } from "./product.validator";

export const productController = {
  async create(req: Request, res: Response) {
    const dto = createProductSchema.parse(req.body);

    const product = await productService.create(dto);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  },

  async findAll(_: Request, res: Response) {
    const products = await productService.findAll();

    return res.status(200).json({
      success: true,
      data: products,
    });
  },

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const product = await productService.findById(id);

    return res.status(200).json({
      success: true,
      data: product,
    });
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);

    const dto = updateProductSchema.parse(req.body);

    const product = await productService.update(id, dto);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  },

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);

    await productService.remove(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  },
};
    