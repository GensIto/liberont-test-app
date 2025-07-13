import { Button } from "@/react-app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/react-app/components/ui/card";
import { client } from "@/react-app/lib/hono";
import { useGuestCartId } from "@/react-app/store/useGuestCartId";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

export const BuyCart = ({
  cartItems,
}: {
  cartItems: {
    products_table: {
      id: string;
      productId: string;
      productName: string;
      category: string;
      price: number;
      stock: number;
    };
    cart_items_table: {
      id: string;
      cartId: string;
      productId: string;
      quantity: number;
    };
  }[];
}) => {
  const router = useRouter();
  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum + item.products_table.price * item.cart_items_table.quantity,
    0
  );

  const guestCartId = useGuestCartId((state) => state.guestCartId);
  const setGuestCartId = useGuestCartId((state) => state.setGuestCartId);
  const clearGuestCartId = useGuestCartId((state) => state.clearGuestCartId);

  const handleOrder = async () => {
    const res = await client.api.carts.buy.$post({
      json: {
        cartId: guestCartId ?? "",
      },
    });

    if (!res.ok) {
      toast.error("Failed to process purchase");
      console.error("Failed to process purchase", res);
      return;
    }

    const { message } = await res.json();
    toast.success(message);
    await router.invalidate();
    clearGuestCartId();
    const response = await client.api.carts.$get();
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    setGuestCartId(data.cartId);
    router.navigate({ to: "/" });
  };
  return (
    <Card>
      <CardContent>
        <h3 className='text-lg font-semibold mt-2'>合計金額</h3>
        <div className='flex items-baseline justify-between gap-2 mt-2'>
          <p>¥{totalPrice}</p>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col gap-2'>
        <Button
          variant='outline'
          className='w-full cursor-pointer'
          onClick={handleOrder}
        >
          購入
        </Button>
      </CardFooter>
    </Card>
  );
};
