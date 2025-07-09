import { zValidator } from "@hono/zod-validator";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import z from "zod";
import { db } from "@/db/index";
import { productsTable } from "@/db/schema";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .get("/products", async (c) => {
    const products = await db.select().from(productsTable);
    return c.json({ products });
  })
  .post(
    "/",
    zValidator(
      "form",
      z.object({
        name: z.string(),
      })
    ),
    (c) => c.json({ message: `Hello ${c.req.valid("form").name}` })
  );

export type AppType = typeof routes;

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
