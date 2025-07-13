import { Product } from "@/react-app/features/product/types";
import { client } from "@/react-app/lib/hono";
import { useGuestCartId } from "@/react-app/store/useGuestCartId";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const useAddCart = ({ product }: { product: Product }) => {
  const guestCartId = useGuestCartId((state) => state.guestCartId);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddToCart = async (quantity?: number) => {
    if (guestCartId === null) {
      console.error("Guest cart ID is not set.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await client.api.carts.$post({
        json: {
          cartId: guestCartId,
          productId: product.id,
          quantity: quantity || 1,
        },
      });

      if (!res.ok) {
        console.error("Failed to add product to cart");
        return;
      }
      toast.success(`Added ${product.productName} to cart!`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart");
    } finally {
      await router.invalidate();
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleAddToCart,
  };
};
