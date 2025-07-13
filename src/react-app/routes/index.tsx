import { ProductCard } from "@/react-app/features/product/components/ProductCard";
import { client } from "@/react-app/lib/hono";
import { useGuestCartId } from "@/react-app/store/useGuestCartId";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  loader: async () => {
    const data = await client.api.products.$get();
    if (!data) {
      throw new Error("Failed to fetch products");
    }
    const { products } = await data.json();
    return { products };
  },
});

function Index() {
  const { products } = Route.useLoaderData();
  const guestCartId = useGuestCartId((state) => state.guestCartId);
  const setGuestCartId = useGuestCartId((state) => state.setGuestCartId);

  useEffect(() => {
    const createCart = async () => {
      const response = await client.api.carts.$get();
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      setGuestCartId(data.cartId);
    };

    if (guestCartId === null) {
      createCart();
    }
  }, [guestCartId, setGuestCartId]);

  return (
    <div className='grid grid-cols-3 gap-4 p-4'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
