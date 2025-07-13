import { Button } from "@/react-app/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const EmptyState = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[50vh] gap-6'>
      <ShoppingCart />
      <div className='text-center space-y-2'>
        <h3 className='text-2xl font-semibold'>カートが空です</h3>
        <p className='text-muted-foreground'>
          商品を追加して、ショッピングを始めましょう！
        </p>
        <Button>
          <Link to='/'>商品一覧へ</Link>
        </Button>
      </div>
    </div>
  );
};
