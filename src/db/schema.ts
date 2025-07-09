import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const productsTable = mysqlTable("products_table", {
  id: varchar("id", { length: 36 }).primaryKey(),
  productId: varchar("product_id", {
    length: 255,
  }).notNull(),
  productName: varchar("product_name", {
    length: 255,
  }).notNull(),
  category: varchar("category", {
    length: 255,
  }).notNull(),
  price: int("price").notNull(),
  stock: int("stock").notNull(),
});
