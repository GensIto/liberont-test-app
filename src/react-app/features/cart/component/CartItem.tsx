import { Button } from "@/react-app/components/ui/button";
import { useDeleteCartItem } from "@/react-app/features/cart/hooks/useDeleteCartItem";
import { CartItems } from "@/react-app/features/cart/types";
import { Product } from "@/react-app/features/product/types";
import { Badge } from "@/react-app/components/ui/badge";
import { CartStockInput } from "@/react-app/features/cart/component/CartStockInput";

export const CartItem = ({
  product,
  cartItems,
}: {
  product: Product;
  cartItems: CartItems;
}) => {
  const { handleDelete } = useDeleteCartItem();

  return (
    <li
      key={product.id}
      className='border p-4 rounded-md flex justify-between items-end'
    >
      <div className='flex gap-2'>
        <div className='flex flex-col justify-between gap-1'>
          <h3 className='text-lg font-semibold'>{product.productName}</h3>
          <Badge>{product.category}</Badge>
          <p className='text-sm'>{product.price}</p>
          <p className='text-xs'>在庫: {product.stock}個</p>
          <CartStockInput product={product} cartItems={cartItems} />
          <Button
            onClick={() => handleDelete({ productId: product.id })}
            variant='destructive'
          >
            削除
          </Button>
        </div>
      </div>
      <h3 className='text-lg font-bold'>
        合計金額: ¥{product.price * cartItems.quantity}
      </h3>
    </li>
  );
};
