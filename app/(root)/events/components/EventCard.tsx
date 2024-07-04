import Image from "next/image";
import art from "@/public/assets/art-exhibition.webp"
import Link from "next/link";
import { Event } from "@/types/datatypes";
import { formatDate } from "@/utils/formatDate";
import { MdMapsHomeWork } from "react-icons/md";
import { GiTicket } from "react-icons/gi"; 

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const priceDisplay =
    event.ticketTier.length > 1
      ? `start Rp${event.ticketTier[0].price}`
      : `Rp${event.ticketTier[0].price}`;

  const imageUrl = event.image ? `/assets/${event.image}` : art;

  return (
    <div
      key={event.id}
      className=" bg-white shadow-eventBox hover:shadow-dspLightGray rounded-2xl flex flex-col gap-2 justify-start hover:scale-105 transition-all duration-500"
    >
      <div className="relative rounded-t-2xl overflow-hidden">
        <Image
          src={imageUrl}
          alt="image"
          width={1000}
          height={500}
          className="rounded-t-2xl object-cover max-w-fit h-[200px] object-center hover:scale-105 transition-all duration-500"
        />
        <div className="absolute bottom-0 bg-transparent rounded-bl-2xl rounded-tr-2xl py-1 px-5 backdrop-blur-md">
          <p className="text-tMd text-white font-medium">{event.category}</p>
        </div>
      </div>
      <div className="px-5 py-2">
        <h3 className=" font-bold text-tXl ">
          <Link href={`/events/${event.id}`}>{event.title}</Link>
        </h3>
        <div className="flex justify-between gap-1">
          <div>
            <p>
              {formatDate(event.date)} {event.time}{" "}
            </p>
            <p className=" flex gap-2 items-center "><MdMapsHomeWork />{event.city} </p>
            <p className="text-tMd font-bold flex gap-2 items-center "><GiTicket/>{priceDisplay} </p>
            <div className="flex items-center gap-2 my-5">
              <Image
                src={`/assets/${event.organizerAvatar}`}
                alt="organizer"
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="text-dspLightGray">{event.organizerName} </p>
            </div>
            <p className="text-tXs font-bold">
              {" "}
              {event.ticketsAvailable}{" "}
              <span className="text-dspLightGray">from {event.ticketsTotal}</span>{" "}
              available{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
