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
      <div className="items-center justify-center items-center">
        <div>
          <div className="max-w-xs h-64 flex flex-col justify-between bg-white rounded-lg border border-gray-400 mb-6 py-5 px-4">
            <div>
              <div className="flex">
                <span
                  tabIndex="0"
                  className="focus:outline-none text-gray-800 font-bold mb-3"
                >
                  {title ?? ""}
                </span>
                <span className="ml-auto"> location </span>
              </div>

              <p
                tabIndex="0"
                className="focus:outline-none text-gray-800 text-sm break-words"
              >
                {description ?? ""}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between text-gray-800">
                <p tabIndex="0" className="focus:outline-none text-sm">
                  {moment(createdAt ?? "").fromNow()}
                </p>
                <button className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover: bg-gray-700">
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
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
