CREATE TABLE `products_table` (
	`id` varchar(36) NOT NULL,
	`product_id` varchar(255) NOT NULL,
	`product_name` varchar(255) NOT NULL,
	`category` varchar(255) NOT NULL,
	`price` int NOT NULL,
	`stock` int NOT NULL,
	CONSTRAINT `products_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `users_table`;