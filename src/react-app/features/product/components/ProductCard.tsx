import { Badge } from "@/react-app/components/ui/badge";
import { Button } from "@/react-app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/react-app/components/ui/card";
import { useAddCart } from "@/react-app/features/cart/hooks/useAddCart";
import { Product } from "@/react-app/features/product/types";
import { Link } from "@tanstack/react-router";

export const ProductCard = ({ product }: { product: Product }) => {
  const { productName, category, price, stock } = product;
  const { isLoading, handleAddToCart } = useAddCart({ product });

  return (
    <Card>
      <CardContent>
        <div className='bg-amber-400 h-32 w-full rounded-sm' />
        <h3 className='text-lg font-semibold mt-2'>{productName}</h3>
        <Badge>{category}</Badge>
        <div className='flex items-baseline justify-between gap-2 mt-2'>
          <p>¥{price}</p>
          <p className='text-xs'>在庫: {stock}個</p>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col gap-2'>
        <Button
          variant='outline'
          className='w-full cursor-pointer'
          onClick={() => handleAddToCart()}
          disabled={isLoading || stock <= 0}
        >
          {isLoading ? "追加中..." : "カートに追加"}
        </Button>
        <Link to='/product/$id' params={{ id: product.id }}>
          <Button variant='link' className='w-full mt-2'>
            詳細を見る
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
