import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";

const app = new Hono<{ Bindings: Env }>().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .get("/", (c) => c.json({ name: "Cloudflare" }))
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

export default app;
