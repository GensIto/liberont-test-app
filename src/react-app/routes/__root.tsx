import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className='p-2 flex justify-between gap-2'>
        <Link to='/' className='[&.active]:font-bold'>
          Home
        </Link>{" "}
        <Link to='/cart' className='[&.active]:font-bold'>
          Cart
        </Link>
      </div>
      <hr />
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </>
  ),
});
