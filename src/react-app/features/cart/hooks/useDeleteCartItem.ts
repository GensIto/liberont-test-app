import { client } from "@/react-app/lib/hono";
import { useGuestCartId } from "@/react-app/store/useGuestCartId";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

export const useDeleteCartItem = () => {
  const cartId = useGuestCartId((state) => state.guestCartId);
  const router = useRouter();

  const handleDelete = async ({ productId }: { productId: string }) => {
    const response = await client.api.carts.items.$delete({
      json: {
        cartId: cartId ?? "",
        productId: productId ?? "",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete cart item");
    }

    toast.success("Item removed from cart");
    await router.invalidate();
  };

  return { handleDelete };
};
