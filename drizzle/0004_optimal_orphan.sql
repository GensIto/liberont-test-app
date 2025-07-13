PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_carts_table` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`status` text DEFAULT 'active' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_carts_table`("id", "user_id", "status") SELECT "id", "user_id", "status" FROM `carts_table`;--> statement-breakpoint
DROP TABLE `carts_table`;--> statement-breakpoint
ALTER TABLE `__new_carts_table` RENAME TO `carts_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;