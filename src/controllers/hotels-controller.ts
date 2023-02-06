import { Response } from "express";
import httpStatus from "http-status";

import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const listHotels = await hotelsService.getHotelsServ();
    return res.status(httpStatus.OK).send(listHotels);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const id = Number(req.params.id);

  try {
    const hotel = await hotelsService.getHotelByIdServ(id);
    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}
