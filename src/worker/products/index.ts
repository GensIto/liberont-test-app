import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { productsTable } from "../../db/schema";

export const productsApp = new Hono<{ Bindings: Env }>()
  .get("/", async (c) => {
    const db = drizzle(c.env.DB);
    const products = await db.select().from(productsTable);
    return c.json({ products });
  })
  .get("/:id", async (c) => {
    const db = drizzle(c.env.DB);
    const id = c.req.param("id");

    if (!id) {
      return c.json({ error: "Product ID is required" }, 400);
    }

    const product = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id))
      .get();

    if (!product) {
      return c.json({ error: "Product not found" }, 404);
    }

    return c.json({ product });
  });
