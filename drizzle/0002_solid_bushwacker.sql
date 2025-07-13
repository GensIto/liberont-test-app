CREATE TABLE `products_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` text NOT NULL,
	`product_name` text NOT NULL,
	`category` text NOT NULL,
	`price` integer NOT NULL,
	`stock` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_table_product_id_unique` ON `products_table` (`product_id`);--> statement-breakpoint
DROP TABLE `users_table`;