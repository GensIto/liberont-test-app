import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

export const productsTable = sqliteTable("products_table", {
  id: text()
    .primaryKey()
    .notNull()
    .$defaultFn(() => uuid()),
  productId: text("product_id").notNull().unique(),
  productName: text("product_name").notNull(),
  category: text("category").notNull(),
  price: int("price").notNull(),
  stock: int("stock").notNull(),
});

export const cartsTable = sqliteTable("carts_table", {
  id: text()
    .primaryKey()
    .notNull()
    .$defaultFn(() => uuid()),
  userId: text("user_id"),
  status: text("status", { enum: ["active", "ordered"] })
    .notNull()
    .default("active"),
});

export const cartItemsTable = sqliteTable("cart_items_table", {
  id: text()
    .primaryKey()
    .notNull()
    .$defaultFn(() => uuid()),
  cartId: text("cart_id")
    .notNull()
    .references(() => cartsTable.id, {
      onDelete: "cascade",
    }),
  productId: text("product_id")
    .notNull()
    .references(() => productsTable.id),
  quantity: int("quantity").notNull().default(1),
});
