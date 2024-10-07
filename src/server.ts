import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import { inferAsyncReturnType } from "@trpc/server";
import nextBuild from "next/dist/build"
import path from "path";
import { PayloadRequest } from "payload/types";
import { parse } from "url";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });

export type ExpressContext = inferAsyncReturnType<typeof createContext>;

const start = async () => {
  console.log("NEXT_PUBLIC_SERVER_URL:", process.env.NEXT_PUBLIC_SERVER_URL);
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info(
        'Next.js is building for production'
      )

      // @ts-expect-error
      await nextBuild(path.join(__dirname, '../'))

      process.exit()
    })

    return
  }

  const cartRouter = express.Router()

  cartRouter.use(payload.authenticate)

  cartRouter.get('/', (req, res) => {
    const request = req as PayloadRequest

    if (!request.user)
      return res.redirect('/sign-in?origin=cart')

    const parsedUrl = parse(req.url, true)
    const { query } = parsedUrl

    return nextApp.render(req, res, '/cart', query)
  })

  app.use('/cart', cartRouter)


  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({ router: appRouter, createContext })
  );

  app.get("/api/users/me", (req, res) => {
    console.log("API /users/me called"); // Log to track when this route is hit
    res.status(200).json({ message: "This is a test" }); // Simple test response
  });

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js started");

    app.listen(PORT, async () => {
      payload.logger.info(
        `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};

start();