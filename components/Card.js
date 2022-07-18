import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { ClockIcon } from "@heroicons/react/outline";
import moment from "moment";

const Card = ({
  id = "",
  image = "",
  title = "",
  location = "",
  category = "",
  createdAt = "",
}) => (
  <Link href={`/items/${id}`}>
    <a className="block w-full">
      <div className="relative flex flex-col flex-none">
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold z-10 absolute top-3 left-3 bg-blue-600 py-1 px-2 rounded-sm">
          {category.replace("_", " ")}
        </span>
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
      <div className="inline-flex items-center mt-2 w-full text-gray-700 leading-tight">
        <span className="font-semibold truncate">{title ?? ""}</span>
        <span className="text-sm ml-auto truncate" data-testid="post_date">
          {moment(createdAt ?? "").fromNow()}
        </span>
        {/* <div className="inline-flex ml-auto items-center space-x-1">
          <ClockIcon className="h-4 w-4 " />
          <div className="text-sm">
            {moment(createdAt ?? "").fromNow()}
          </div>
        </div> */}
      </div>
      <div className="inline-flex items-center space-x-1">
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
