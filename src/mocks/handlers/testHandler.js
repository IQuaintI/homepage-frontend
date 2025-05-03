import { rest } from "msw";

export const testHandlers = [
  rest.get("/api/test", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: "MSW test successful!" })
    );
  }),
];

