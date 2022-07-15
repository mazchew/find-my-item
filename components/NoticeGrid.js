import PropTypes from "prop-types";
import NoticeCard from "./NoticeCard";
import { ExclamationIcon } from "@heroicons/react/outline";

export default function NoticeGrid({ notices = [] }) {
  const isEmpty = notices.length === 0;

  return isEmpty ? (
    <p className="text-amber-700 bg-amber-100 px-4 rounded-md py-2 max-w-max inline-flex items-center space-x-1">
      <ExclamationIcon className="shrink-0 w-5 h-5 mt-px" />
      <span>Unfortunately, there is nothing to display yet.</span>
    </p>
  ) : (
    <div className="grid place-content-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {notices.map((notice) => (
        <NoticeCard key={notice.id} {...notice} />
      ))}
    </div>
  );
}

NoticeGrid.propTypes = {
  notices: PropTypes.array,
};
