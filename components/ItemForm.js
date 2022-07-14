import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Formik, Form, yupToFormErrors } from "formik";
import Input from "./Input";
import ImageUpload from "./ImageUpload";
import { redirect } from "next/dist/server/api-utils";

const ItemSchema = Yup.object().shape({
  title: Yup.string().trim().matches(/^[\w\-\s]+$/, "Invalid characters").required(),
  location: Yup.string().trim().matches(/^[\w\-\s]+$/, "Invalid characters").required(),
  description: Yup.string().trim().matches(/^[\w\-\s]+$/, "Invalid characters").required(),
  category: Yup.string().required(),
});

const ItemForm = ({
  initialValues = null,
  redirectPath = "",
  buttonText = "Submit",
  onSubmit = () => null,
}) => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialValues?.image ?? "");

  const { image, ...initialItemValues } = initialValues ?? {
    image: "",
    title: "",
    description: "",
    location: "",
    category: "",
  };

  const upload = async (image) => {
    if (!image) return;
    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading("Uploading...");
      const { data } = await axios.post("/api/upload-image", { image });
      setImageUrl(data?.url);
      toast.success("Successfully uploaded", { id: toastId });
    } catch (e) {
      toast.error("Unable to upload", { id: toastId });
      setImageUrl("");
    } finally {
      setDisabled(false);
    }
  };
  const handleOnSubmit = async (values = null) => {
    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading("Submitting...");
      if (typeof onSubmit === "function") {
        await onSubmit({ image: imageUrl, ...values });
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
      <div className="mb-8 max-w-md">
        <ImageUpload
          initialImage={{ src: image, alt: initialItemValues.title }}
          onChangePicture={upload}
        />
      </div>
      <Formik
        initialValues={initialItemValues}
        validationSchema={ItemSchema}
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
                placeholder="Title of lost item"
                disabled={disabled}
              />
              <Input
                name="location"
                type="text"
                label="Location"
                placeholder="Location where the item was found"
                disabled={disabled}
              />
              <Input
                name="description"
                type="textarea"
                label="Description"
                placeholder="Description of the item found"
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

ItemForm.propTypes = {
  initialItemValues: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
};

export default ItemForm;
