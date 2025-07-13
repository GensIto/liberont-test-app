import { Button } from "@/react-app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/react-app/components/ui/card";
import { useAddCart } from "@/react-app/features/cart/hooks/useAddCart";
import { client } from "@/react-app/lib/hono";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/react-app/components/ui/badge";
import { Input } from "@/react-app/components/ui/input";
import { useState } from "react";

export const Route = createFileRoute("/product/$id")({
  component: RouteComponent,
  loader: async ({ params: { id } }: { params: { id: string } }) => {
    const res = await client.api.products[":id"].$get({ param: { id } });
    if (!res) {
      throw new Error("Failed to fetch products");
    }

    if (!res.ok) {
      console.error("Failed to fetch cart items");
      throw new Error("Failed to fetch product details");
    }

    const { product } = await res.json();
    return { product };
  },
});

function RouteComponent() {
  const { product } = Route.useLoaderData();
  const [quantity, setQuantity] = useState(1);
  const { productName, category, price, stock } = product;
  const { isLoading, handleAddToCart } = useAddCart({ product });
  return (
    <div className='p-4'>
      <Card>
        <CardContent>
          <div className='bg-amber-400 h-32 w-full rounded-sm' />
          <h3 className='text-lg font-semibold mt-2'>{productName}</h3>
          <Badge>{category}</Badge>
          <div className='flex items-baseline justify-between gap-2 mt-2'>
            <p>¥{price}</p>
            <p className='text-xs'>在庫: {stock}個</p>
          </div>
          <Input
            type='number'
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key !== "ArrowUp" && e.key !== "ArrowDown") {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            min={1}
            max={stock}
            className='mt-2 w-24'
          />
        </CardContent>
        <CardFooter className='flex flex-col gap-2'>
          <Button
            variant='outline'
            className='w-full cursor-pointer'
            onClick={() => handleAddToCart(quantity)}
            disabled={isLoading || stock <= 0}
          >
            {isLoading ? "追加中..." : "カートに追加"}
          </Button>
          <Link to='/'>
            <Button variant='link' className='w-full mt-2'>
              一覧に戻る
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
