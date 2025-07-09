import { hc } from "hono/client";
import { AppType } from "../../worker/index";

export const client = hc<AppType>(process.env.API_URL + "/api");
