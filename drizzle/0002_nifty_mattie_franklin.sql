ALTER TABLE `users_table` DROP INDEX `users_table_email_unique`;--> statement-breakpoint
ALTER TABLE `users_table` ADD `product_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` ADD `product_name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` ADD `category` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` ADD `price` int NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` ADD `stock` int NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `users_table` DROP COLUMN `age`;--> statement-breakpoint
ALTER TABLE `users_table` DROP COLUMN `email`;