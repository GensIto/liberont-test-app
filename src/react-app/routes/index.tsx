import { createFileRoute } from "@tanstack/react-router";
import { css } from "../styled-system/css";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className='p-2'>
      <div
        className={css({
          fontSize: "2xl",
          fontWeight: "bold",
          color: "blue.500",
        })}
      >
        Hello 🐼!
      </div>
    </div>
  );
}
