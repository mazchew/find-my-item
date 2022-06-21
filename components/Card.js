import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import { LocationMarkerIcon } from "@heroicons/react/solid";

const Card = ({ id = "", image = "", title = "", location = "" }) => (
  <Link href={`/index`}>
    <a className="block w-full">
      <div className="relative">
        <div className="bg-gray-200 rounded-lg shadow overflow-hidden aspect-w-9 aspect-h-9">
          {image ? (
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="hover:opacity-80 transition"
            />
          ) : null}
        </div>
      </div>
      <div className="mt-2 w-full text-gray-700 font-semibold leading-tight">
        {title ?? ""}
      </div>
      <div className="flex items-center">
        <LocationMarkerIcon className="h-4 w-4" />
        <div>{location}</div>
      </div>
    </a>
  </Link>
);

Card.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.string,
};

export default Card;