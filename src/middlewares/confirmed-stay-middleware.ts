import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';

import hotelsService from '@/services/hotels-service';

import { AuthenticatedRequest } from './authentication-middleware';

 export async function handleConfirmedStay(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      await hotelsService.confirmedStay(req.userId);
      next();
    } catch (err) {
      console.error(err);
      if (err.name == "NotFoundError") {
        return generateNotFoundResponse(res)
      }
      return generatePaymentRequiredResponse(res)
    }
  }

function generateNotFoundResponse(res: Response){
    res.status(httpStatus.NOT_FOUND).send({});
}

function generatePaymentRequiredResponse(res: Response){
    res.status(httpStatus.PAYMENT_REQUIRED).send({});
}