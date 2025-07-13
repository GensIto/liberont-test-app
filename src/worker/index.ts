import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { productsApp } from "./products";
import { cartsApp } from "./carts";
import { usersApp } from "./users";

const app = new Hono<{ Bindings: Env }>().basePath("/api");

app.use(
  logger(),
  prettyJSON(),
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const route = app
  .route("/products", productsApp)
  .route("/carts", cartsApp)
  .route("/users", usersApp);

export type AppType = typeof route;

export default route;
