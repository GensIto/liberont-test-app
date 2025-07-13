import { EmptyState } from "@/react-app/features/cart/component/EmptyState";
import { client } from "@/react-app/lib/hono";
import { createFileRoute } from "@tanstack/react-router";
import { CartItem } from "@/react-app/features/cart/component/CartItem";
import { BuyCart } from "@/react-app/features/cart/component/BuyCart";

export const Route = createFileRoute("/cart")({
  component: Cart,
  loader: async () => {
    const cartId = window.localStorage.getItem("guestCartIdStorage");
    const json = JSON.parse(cartId ?? "null");
    const data = await client.api.users.cart.$post({
      json: {
        cartId: json.state.guestCartId ?? "",
      },
    });

    if (!data.ok) {
      console.error("Failed to fetch cart items");
      return { cartItems: [] };
    }

    const { cartItems } = await data.json();

    return { cartItems };
  },
});

function Cart() {
  const { cartItems } = Route.useLoaderData();

  if (!cartItems || cartItems?.length === 0) return <EmptyState />;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Your Cart</h1>
      <ul className='space-y-4'>
        {cartItems.map((item) => (
          <CartItem
            key={item.products_table.id}
            product={item.products_table}
            cartItems={item.cart_items_table}
          />
        ))}
      </ul>
      <div className='mt-6'>
        <BuyCart cartItems={cartItems} />
      </div>
    </div>
  );
}
