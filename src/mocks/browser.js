import { setupWorker } from "msw";
import { recipesHandlers } from "./handlers/recipesHandlers";

export const worker = setupWorker(...recipesHandlers);
