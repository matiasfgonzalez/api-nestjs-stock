import { Request, Response } from "express";
import pool from "../db";
import { QueryResult } from "pg";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const result: QueryResult = await pool.query("SELECT * FROM products");
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  try {
    const result: QueryResult = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );
    if (result.rows.length > 0) {
      return res.status(200).json(result.rows[0]);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching product" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, price, quantity } = req.body;
  try {
    const result: QueryResult = await pool.query(
      "INSERT INTO products (name, price, quantity) VALUES ($1, $2, $3) RETURNING *",
      [name, price, quantity]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating product" });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const { name, price, quantity } = req.body;
  try {
    const result: QueryResult = await pool.query(
      "UPDATE products SET name = $1, price = $2, quantity = $3 WHERE id = $4 RETURNING *",
      [name, price, quantity, id]
    );
    if (result.rows.length > 0) {
      return res.status(200).json(result.rows[0]);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  try {
    const result: QueryResult = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length > 0) {
      return res.status(200).json(result.rows[0]);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting product" });
  }
};
