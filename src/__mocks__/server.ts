import { rest, setupWorker } from "msw";
import { responseMock } from "./apiMock";

export const worker = setupWorker(
  rest.get("https://rickandmortyapi.com/api/character", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(responseMock));
  })
);
