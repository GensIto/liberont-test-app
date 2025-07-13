export type Product = {
  id: string;
  productId: string;
  productName: string;
  category: string;
  price: number;
  stock: number;
};

export type CartItem = Partial<Product>;

export type ProductWithCount = Product & { count: number };
