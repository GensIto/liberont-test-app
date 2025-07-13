import { zValidator } from "@hono/zod-validator";
import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import z from "zod";
import { cartsTable, cartItemsTable, productsTable } from "../../db/schema";

export const usersApp = new Hono<{ Bindings: Env }>().post(
  "/cart",
  zValidator(
    "json",
    z.object({
      cartId: z.string().min(1),
    })
  ),
  async (c) => {
    const db = drizzle(c.env.DB);
    const validated = c.req.valid("json");
    const { cartId } = validated;

    if (!cartId) {
      return c.json({ error: "Cart ID is required" }, 400);
    }

    const cartItems = await db
      .select()
      .from(cartItemsTable)
      .innerJoin(productsTable, eq(cartItemsTable.productId, productsTable.id))
      .innerJoin(cartsTable, eq(cartItemsTable.cartId, cartsTable.id))
      .where(
        and(eq(cartItemsTable.cartId, cartId), eq(cartsTable.status, "active"))
      );

    if (!cartItems) {
      return c.json({ error: "Cart not found" }, 404);
    }

    return c.json({ cartItems });
  }
);
