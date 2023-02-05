import 'reflect-metadata';
import 'express-async-errors';

import cors from 'cors';
import express, { Express } from 'express';

import { connectDb, disconnectDB, loadEnv } from '@/config';
import { handleApplicationErrors } from '@/middlewares';
import {
    authenticationRouter,
    enrollmentsRouter,
    eventsRouter,
    paymentsRouter,
    ticketsRouter,
    usersRouter
} from '@/routers';

import { hotelsRouter } from './routers/hotels-router';

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/users", usersRouter)
  .use("/auth", authenticationRouter)
  .use("/event", eventsRouter)
  .use("/enrollments", enrollmentsRouter)
  .use("/tickets", ticketsRouter)
  .use("/payments", paymentsRouter)
  .use("/hotels", hotelsRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
