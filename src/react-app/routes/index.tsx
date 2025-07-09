import { Button } from "@/react-app/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className='p-2'>
      <div>Hello!</div>
      <Button>
        <a href='/about'>Go to About</a>
      </Button>
    </div>
  );
}
