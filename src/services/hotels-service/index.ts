import { notFoundError } from '@/errors';
import { ApplicationError } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelRepository from '@/repositories/hotels-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { Hotel, TicketStatus } from '@prisma/client';

async function confirmedStay(userId: number): Promise<ApplicationError | boolean> {

  const isThereEnrollment = await enrollmentRepository.findByUserId(userId);
  if (!isThereEnrollment) throw notFoundError();

  const isThereTicket = await ticketRepository.findTicketByEnrollmentId(isThereEnrollment.id);
  if (!isThereTicket) throw notFoundError();

  if(isThereTicket.status !== TicketStatus.PAID) throw { name: "Ticket was not paid" };
  if(isThereTicket.TicketType.isRemote === true) throw { name: "Ticket id remote" };
  if(isThereTicket.TicketType.includesHotel === false) throw { name: "Hotel not include" };

  return null;
}

async function getHotelsServ(): Promise<Hotel[]> {
  const hotels = await hotelRepository.findHotelsList();
  if (!hotels) throw notFoundError();

  return hotels;
}

async function getHotelByIdServ(idSearch: number): Promise<Hotel> {
  const hotel = await hotelRepository.findHotelById(idSearch);
  if (!hotel) throw notFoundError();

  return hotel;
}

const hotelsService = {
  getHotelsServ,
  getHotelByIdServ,
  confirmedStay,
};

export default hotelsService;
