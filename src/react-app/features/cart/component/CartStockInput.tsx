import { Input } from "@/react-app/components/ui/input";
import { useAddCart } from "@/react-app/features/cart/hooks/useAddCart";
import { CartItems } from "@/react-app/features/cart/types";
import { Product } from "@/react-app/features/product/types";
import { useRouter } from "@tanstack/react-router";
import { FormEventHandler, useRef } from "react";
import { toast } from "sonner";

export const CartStockInput = ({
  product,
  cartItems,
}: {
  product: Product;
  cartItems: CartItems;
}) => {
  const { isLoading, handleAddToCart } = useAddCart({ product });

  const router = useRouter();
  const prevRef = useRef<number>(cartItems.quantity);

  const handleInput: FormEventHandler<HTMLInputElement> = async (e) => {
    const next = (e.target as HTMLInputElement).valueAsNumber;
    const prev = prevRef.current;
    if (Number.isNaN(next)) return;
    if (next > prev) {
      if (next > product.stock) {
        toast.error("在庫を超える数量は選択できません");
        return;
      }
      try {
        await handleAddToCart(1);
        toast.success("カートを更新しました");
      } catch (error) {
        toast.error("カートを更新できませんでした");
        console.error("Error adding to cart:", error);
      }
      cartItems.quantity = next;
      return;
    } else if (next < prev) {
      if (next < 1) {
        toast.error("数量は1以上を選択してください");
        return;
      }
      try {
        await handleAddToCart(-1);
        toast.success("カートを更新しました");
      } catch (error) {
        toast.error("カートを更新できませんでした");
        console.error("Error adding to cart:", error);
      }
      cartItems.quantity = next;
    }
    await router.invalidate();
    prevRef.current = next;
  };

  return (
    <Input
      type='number'
      min={1}
      max={product.stock}
      defaultValue={cartItems.quantity}
      onInput={handleInput}
      onKeyDown={(e) => {
        if (e.key !== "ArrowUp" && e.key !== "ArrowDown") {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      disabled={isLoading}
    />
  );
};
