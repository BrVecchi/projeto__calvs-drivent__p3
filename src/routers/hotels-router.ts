import { Router } from "express";

import { getHotelById, getHotels } from "@/controllers/hotels-controller";
import { authenticateToken } from "@/middlewares";
import { handleConfirmedStay } from "@/middlewares/confirmed-stay-middleware";

const hotelsRouter = Router();

hotelsRouter.all("/*", authenticateToken, handleConfirmedStay).get("/", getHotels).get("/:id", getHotelById);

export { hotelsRouter };
