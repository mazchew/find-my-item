import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { Formik, Form, yupToFormErrors } from "formik";
import Input from "./Input";

const NoticeSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .matches(/^[\.a-zA-Z0-9,!?'"/$#@:; ]*$/, "Invalid characters")
    .required(),
  location: Yup.string()
    .trim()
    .matches(/^[\.a-zA-Z0-9,!?'"/$#@:; ]*$/, "Invalid characters")
    .required(),
  description: Yup.string()
    .trim()
    .matches(/^[\.a-zA-Z0-9,!?'"/$#@:; ]*$/, "Invalid characters")
    .required(),
  category: Yup.string().required(),
});

const NoticeForm = ({
  initialValues = null,
  redirectPath = "",
  buttonText = "Submit",
  onSubmit = () => null,
}) => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  const { ...initialNoticeValues } = initialValues ?? {
    title: "",
    description: "",
    location: "",
    category: "",
  };

  const handleOnSubmit = async (values = null) => {
    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading("Submitting...");
      if (typeof onSubmit === "function") {
        await onSubmit({ ...values });
      }
      toast.success("Successfully submitted", { id: toastId });
      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (e) {
      toast.error("Unable to submit", { id: toastId });
      setDisabled(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialNoticeValues}
        validationSchema={NoticeSchema}
        validateOnBlur={false}
        onSubmit={handleOnSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="space-y-8">
            <div className="space-y-6">
              <Input
                name="title"
                type="text"
                label="Title"
                placeholder="Title of Notice"
                disabled={disabled}
              />
              <Input
                name="location"
                type="text"
                label="Location"
                placeholder="Location where the item was lost"
                disabled={disabled}
              />
              <Input
                name="description"
                type="textarea"
                label="Description"
                placeholder="Description of the lost item"
                rows={4}
                disabled={disabled}
              />
              <Input
                name="category"
                type="select"
                label="Category"
                disabled={disabled}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={disabled || !isValid}
                className="bg-blue-600 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
              >
                {isSubmitting ? "Submitting..." : buttonText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

NoticeForm.propTypes = {
  initialNoticeValues: PropTypes.shape({
    title: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
};

export default NoticeForm;
