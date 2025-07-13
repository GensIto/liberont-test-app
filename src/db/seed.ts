import { reset } from "drizzle-seed";
import { productsTable } from "./schema";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { readdirSync } from "node:fs";

const PRODUCTS_SEED_DATA = [
  {
    productId: "PROD0001",
    productName: "Product 1",
    category: "Electronics",
    price: 16295,
    stock: 24,
  },
  {
    productId: "PROD0002",
    productName: "Product 2",
    category: "Electronics",
    price: 45232,
    stock: 30,
  },
  {
    productId: "PROD0003",
    productName: "Product 3",
    category: "Electronics",
    price: 6765,
    stock: 92,
  },
  {
    productId: "PROD0004",
    productName: "Product 4",
    category: "Electronics",
    price: 37694,
    stock: 84,
  },
  {
    productId: "PROD0005",
    productName: "Product 5",
    category: "Books",
    price: 44631,
    stock: 33,
  },
  {
    productId: "PROD0006",
    productName: "Product 6",
    category: "Electronics",
    price: 2185,
    stock: 62,
  },
  {
    productId: "PROD0007",
    productName: "Product 7",
    category: "Food",
    price: 2933,
    stock: 73,
  },
  {
    productId: "PROD0008",
    productName: "Product 8",
    category: "Books",
    price: 39688,
    stock: 42,
  },
  {
    productId: "PROD0009",
    productName: "Product 9",
    category: "Books",
    price: 20269,
    stock: 31,
  },
  {
    productId: "PROD0010",
    productName: "Product 10",
    category: "Clothing",
    price: 27980,
    stock: 58,
  },
  {
    productId: "PROD0011",
    productName: "Product 11",
    category: "Electronics",
    price: 26158,
    stock: 51,
  },
  {
    productId: "PROD0012",
    productName: "Product 12",
    category: "Books",
    price: 3247,
    stock: 89,
  },
  {
    productId: "PROD0013",
    productName: "Product 13",
    category: "Electronics",
    price: 689,
    stock: 71,
  },
  {
    productId: "PROD0014",
    productName: "Product 14",
    category: "Electronics",
    price: 36273,
    stock: 60,
  },
  {
    productId: "PROD0015",
    productName: "Product 15",
    category: "Books",
    price: 1767,
    stock: 73,
  },
  {
    productId: "PROD0016",
    productName: "Product 16",
    category: "Clothing",
    price: 11894,
    stock: 60,
  },
  {
    productId: "PROD0017",
    productName: "Product 17",
    category: "Electronics",
    price: 31240,
    stock: 82,
  },
  {
    productId: "PROD0018",
    productName: "Product 18",
    category: "Electronics",
    price: 22277,
    stock: 13,
  },
  {
    productId: "PROD0019",
    productName: "Product 19",
    category: "Clothing",
    price: 43823,
    stock: 23,
  },
  {
    productId: "PROD0020",
    productName: "Product 20",
    category: "Food",
    price: 43501,
    stock: 18,
  },
  {
    productId: "PROD0021",
    productName: "Product 21",
    category: "Food",
    price: 3112,
    stock: 11,
  },
  {
    productId: "PROD0022",
    productName: "Product 22",
    category: "Books",
    price: 23983,
    stock: 80,
  },
  {
    productId: "PROD0023",
    productName: "Product 23",
    category: "Books",
    price: 17659,
    stock: 56,
  },
  {
    productId: "PROD0024",
    productName: "Product 24",
    category: "Electronics",
    price: 15041,
    stock: 90,
  },
  {
    productId: "PROD0025",
    productName: "Product 25",
    category: "Books",
    price: 2085,
    stock: 13,
  },
  {
    productId: "PROD0026",
    productName: "Product 26",
    category: "Food",
    price: 1521,
    stock: 15,
  },
  {
    productId: "PROD0027",
    productName: "Product 27",
    category: "Food",
    price: 13917,
    stock: 13,
  },
  {
    productId: "PROD0028",
    productName: "Product 28",
    category: "Food",
    price: 10192,
    stock: 72,
  },
  {
    productId: "PROD0029",
    productName: "Product 29",
    category: "Food",
    price: 7373,
    stock: 53,
  },
  {
    productId: "PROD0030",
    productName: "Product 30",
    category: "Food",
    price: 37565,
    stock: 71,
  },
  {
    productId: "PROD0031",
    productName: "Product 31",
    category: "Books",
    price: 33106,
    stock: 57,
  },
  {
    productId: "PROD0032",
    productName: "Product 32",
    category: "Electronics",
    price: 29627,
    stock: 87,
  },
  {
    productId: "PROD0033",
    productName: "Product 33",
    category: "Electronics",
    price: 26351,
    stock: 71,
  },
  {
    productId: "PROD0034",
    productName: "Product 34",
    category: "Books",
    price: 24776,
    stock: 89,
  },
  {
    productId: "PROD0035",
    productName: "Product 35",
    category: "Clothing",
    price: 9029,
    stock: 62,
  },
  {
    productId: "PROD0036",
    productName: "Product 36",
    category: "Books",
    price: 12685,
    stock: 98,
  },
  {
    productId: "PROD0037",
    productName: "Product 37",
    category: "Books",
    price: 39599,
    stock: 50,
  },
  {
    productId: "PROD0038",
    productName: "Product 38",
    category: "Clothing",
    price: 49716,
    stock: 98,
  },
  {
    productId: "PROD0039",
    productName: "Product 39",
    category: "Electronics",
    price: 3068,
    stock: 97,
  },
  {
    productId: "PROD0040",
    productName: "Product 40",
    category: "Clothing",
    price: 2527,
    stock: 17,
  },
  {
    productId: "PROD0041",
    productName: "Product 41",
    category: "Books",
    price: 48690,
    stock: 20,
  },
  {
    productId: "PROD0042",
    productName: "Product 42",
    category: "Electronics",
    price: 40004,
    stock: 17,
  },
  {
    productId: "PROD0043",
    productName: "Product 43",
    category: "Electronics",
    price: 13166,
    stock: 14,
  },
  {
    productId: "PROD0044",
    productName: "Product 44",
    category: "Food",
    price: 27354,
    stock: 50,
  },
  {
    productId: "PROD0045",
    productName: "Product 45",
    category: "Books",
    price: 23162,
    stock: 82,
  },
  {
    productId: "PROD0046",
    productName: "Product 46",
    category: "Books",
    price: 13567,
    stock: 43,
  },
  {
    productId: "PROD0047",
    productName: "Product 47",
    category: "Clothing",
    price: 24099,
    stock: 32,
  },
  {
    productId: "PROD0048",
    productName: "Product 48",
    category: "Food",
    price: 14539,
    stock: 46,
  },
  {
    productId: "PROD0049",
    productName: "Product 49",
    category: "Electronics",
    price: 19615,
    stock: 95,
  },
  {
    productId: "PROD0050",
    productName: "Product 50",
    category: "Electronics",
    price: 43030,
    stock: 74,
  },
];

async function main() {
  const fileNames = readdirSync(
    ".wrangler/state/v3/d1/miniflare-D1DatabaseObject"
  );

  const fileName = fileNames.find((fileName) => {
    return fileName.endsWith(".sqlite");
  });
  const sqlite = new Database(
    `.wrangler/state/v3/d1/miniflare-D1DatabaseObject/${fileName}`
  );
  const db = drizzle(sqlite);
  await reset(db, productsTable);
  await db.insert(productsTable).values(PRODUCTS_SEED_DATA);
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
