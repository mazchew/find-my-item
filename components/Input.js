import PropTypes from "prop-types";
import classNames from "classnames";
import { useField } from "formik";
import { Category } from "@prisma/client";

const Input = ({ type = "", label = "", className = "", ...props }) => {
  const [field, meta] = useField(props);
  const error = meta?.touched && meta?.error;
  let com;

  if (type == "text" || type == "textarea" || type == "email") {
    com = (
      <div className="flex-1">
        {type === "textarea" ? (
          <textarea
            {...field}
            {...props}
            className={classNames(
              "w-full shadow-sm rounded-md py-2 pl-4 border focus:outline-none focus:ring-4 focus:ring-opacity-20 transition disabled:opacity-50 disabled:cursor-not-allowed",
              error
                ? "border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400"
                : "border-gray-300 focus:border-gray-400 focus:ring-gray-400"
            )}
          />
        ) : (
          <div className="relative">
            <input
              {...field}
              {...props}
              type={type}
              className={classNames(
                "w-full shadow-sm rounded-md py-2 pl-4 truncate border focus:outline-none focus:ring-4 focus:ring-opacity-20 transition disabled:opacity-50 disabled:cursor-not-allowed",
                error
                  ? "border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:border-gray-400 focus:ring-gray-400"
              )}
            />
          </div>
        )}
      </div>
    );
  } else {
    com = (
      <select
        {...field}
        {...props}
        className="w-full shadow-sm rounded-md py-2 pl-4 truncate border focus:outline-none focus:ring-4 focus:ring-opacity-20 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="">Choose...</option>
        <option value="ELECTRONICS">Electronics</option>
        <option value="JEWELLERY">Jewellery</option>
        <option value="WATER_BOTTLE">Water Bottle</option>
        <option value="PERSONAL_CARDS">Personal Cards</option>
        <option value="STUDENT_CARDS">Student Cards</option>
        <option value="CLOTHING">Clothing</option>
        <option value="WALLET">Wallet</option>
        <option value="BAG">Bag</option>
        <option value="MISCELLANEOUS">Miscellaneous</option>
      </select>
    );
  }

  return (
    <div className={classNames(className, "flex flex-col space-y-1")}>
      {label ? (
        <label htmlFor="email" className="text-grey-600">
          {label}
        </label>
      ) : null}
      {com}
      {error ? (
        <p name="email" className="text-red-600 text-sm first-letter:uppercase">
          {error}
        </p>
      ) : null}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
