import { seed } from "drizzle-seed";
import { usersTable } from "./schema";
import { db } from "./index";

async function main() {
  await db.delete(usersTable);
  await seed(db, { usersTable }).refine((funcs) => ({
    usersTable: {
      count: 5,
      columns: {
        id: funcs.uuid(),
        name: funcs.firstName(),
        email: funcs.email(),
        age: funcs.int({ minValue: 1, maxValue: 99 }),
      },
    },
  }));
}
main()
  .then(() => {
    console.log("Seeding completed successfully.");
  })
  .catch((error) => {
    console.error("Error during seeding:", error);
  })
  .finally(() => {
    process.exit(0);
  });
