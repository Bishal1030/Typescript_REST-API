import { Request, Response } from "express";
import { prismaClient } from "..";
import { ProductSchema } from "../schema/products";

export const createProduct = async (req: Request, res: Response) => {
  ProductSchema.parse(req.body);

  // ["tea","india"] => "tea,india"

  const product = await prismaClient.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });

  res.json(product);
};

export const listProduct = async (req: Request, res: Response) => {
  const count = await prismaClient.product.count();
  const skip =
    typeof req.query.skip === "string" ? parseInt(req.query.skip, 10) : 0;

  const products = await prismaClient.product.findMany({
    skip,
    take: 5,
  });

  res.json({count, data: products})
};
