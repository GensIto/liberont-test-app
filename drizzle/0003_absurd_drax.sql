CREATE TABLE `cart_items_table` (
	`id` text PRIMARY KEY NOT NULL,
	`cart_id` text NOT NULL,
	`product_id` text NOT NULL,
	FOREIGN KEY (`cart_id`) REFERENCES `carts_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`product_id`) REFERENCES `products_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `carts_table` (
	`id` text PRIMARY KEY NOT NULL,
	`status` text DEFAULT 'active'
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_products_table` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`product_name` text NOT NULL,
	`category` text NOT NULL,
	`price` integer NOT NULL,
	`stock` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_products_table`("id", "product_id", "product_name", "category", "price", "stock") SELECT "id", "product_id", "product_name", "category", "price", "stock" FROM `products_table`;--> statement-breakpoint
DROP TABLE `products_table`;--> statement-breakpoint
ALTER TABLE `__new_products_table` RENAME TO `products_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `products_table_product_id_unique` ON `products_table` (`product_id`);