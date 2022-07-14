import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { ChevronRightIcon } from "@heroicons/react/outline";
import moment from "moment";

const NoticeCard = ({
  id = "",
  description = "",
  title = "",
  location = "",
  category = "",
  createdAt = "",
}) => (
  <Link href={`/notices/${id}`}>
    <a className="block w-full">
      <div className="items-center justify-center">
        <div className="max-w-xs h-64 flex flex-col justify-between bg-white rounded-lg border border-gray-400 mb-6 py-5 px-4">
          <div className="flex flex-col gap-1.5">
            <span className="focus:outline-none text-gray-800 font-bold truncate text-lg">
              {title ?? ""}
            </span>
            <div className="inline-flex items-center">
              <LocationMarkerIcon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>

            <p className="focus:outline-none text-gray-800 text-sm line-clamp-5 ">
              {description ?? ""}
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between text-gray-800">
              <p className="focus:outline-none text-sm">
                {moment(createdAt ?? "").fromNow()}
              </p>
              <button className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover:">
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </a>
  </Link>
);

NoticeCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
};

export default NoticeCard;
