import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { cartItemsTable, cartsTable } from "../../db/schema";
import { zValidator } from "@hono/zod-validator";
import z from "zod";

export const cartsApp = new Hono<{ Bindings: Env }>()
  .get("/", async (c) => {
    const db = drizzle(c.env.DB);

    try {
      const cart = await db
        .insert(cartsTable)
        .values({ userId: null })
        .returning();
      if (!cart) {
        return c.json({ error: "Failed to create cart" }, 500);
      }
      return c.json({ cartId: cart[0].id });
    } catch (error) {
      console.error("Error creating cart:", error);
      return c.json({ error: "Failed to create cart" }, 500);
    }
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        cartId: z.string().min(1),
        productId: z.string().min(1),
        quantity: z.number().min(-1).default(1),
      })
    ),
    async (c) => {
      const db = drizzle(c.env.DB);
      const validated = c.req.valid("json");
      const { cartId, productId, quantity } = validated;
      if (!cartId || !productId) {
        return c.json({ error: "Cart ID and Product ID are required" }, 400);
      }
      try {
        const userCart = await db
          .select()
          .from(cartItemsTable)
          .where(
            and(
              eq(cartItemsTable.cartId, cartId),
              eq(cartItemsTable.productId, productId)
            )
          )
          .get();

        if (userCart) {
          const updatedCartItem = await db
            .update(cartItemsTable)
            .set({ quantity: userCart.quantity + quantity })
            .where(
              and(
                eq(cartItemsTable.cartId, cartId),
                eq(cartItemsTable.productId, productId)
              )
            )
            .returning()
            .get();
          return c.json({ cartItem: updatedCartItem });
        }

        const cartItem = await db
          .insert(cartItemsTable)
          .values({ cartId, productId, quantity })
          .returning()
          .get();
        if (!cartItem) {
          return c.json({ error: "Failed to add item to cart" }, 500);
        }
        return c.json({ cartItem });
      } catch (error) {
        console.error("Error adding item to cart:", error);
        return c.json({ error: "Failed to add item to cart" }, 500);
      }
    }
  )
  .delete(
    "/items",
    zValidator(
      "json",
      z.object({
        cartId: z.string().min(1),
        productId: z.string().min(1),
      })
    ),
    async (c) => {
      const db = drizzle(c.env.DB);
      const validated = c.req.valid("json");
      const { cartId, productId } = validated;
      if (!cartId || !productId) {
        return c.json({ error: "Cart ID and Product ID are required" }, 400);
      }
      try {
        const result = await db
          .delete(cartItemsTable)
          .where(
            and(
              eq(cartItemsTable.cartId, cartId),
              eq(cartItemsTable.productId, productId)
            )
          )
          .returning();
        if (result.length === 0) {
          return c.json({ error: "Item not found in cart" }, 404);
        }
        return c.json({ message: "Item deleted successfully" });
      } catch (error) {
        console.error("Error deleting item from cart:", error);
        return c.json({ error: "Failed to delete item from cart" }, 500);
      }
    }
  )
  .post(
    "/buy",
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
        return c.json({ error: "Cart ID and User ID are required" }, 400);
      }
      try {
        const cartItems = await db
          .select()
          .from(cartItemsTable)
          .where(eq(cartItemsTable.cartId, cartId));
        if (cartItems.length === 0) {
          return c.json({ error: "Cart is empty" }, 400);
        }

        const orderedCart = await db
          .update(cartsTable)
          .set({ status: "ordered" })
          .where(eq(cartsTable.id, cartId))
          .returning()
          .get();
        if (!orderedCart) {
          return c.json({ error: "Failed to update cart status" }, 500);
        }

        return c.json({
          message: "Purchase successful",
          cartId: orderedCart.id,
        });
      } catch (error) {
        console.error("Error processing purchase:", error);
        return c.json({ error: "Failed to process purchase" }, 500);
      }
    }
  );
