import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Formik, Form, yupToFormErrors } from "formik";
import Input from "./Input";
import ImageUpload from "./ImageUpload";

const ItemSchema = Yup.object().shape({
  title: Yup.string().trim().required(),
  location: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
  category: Yup.string().required(),
});

const ItemForm = ({ onSubmit = () => null }) => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const { image, ...initialItemValues } = {
    image: "",
    title: "",
    location: "",
    description: "",
    category: "",
  };

  const upload = async (image) => {};
  const handleOnSubmit = async (values = null) => {
    console.log(values);
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
                placeholder="Lost item"
                disabled={disabled}
              />
              <Input
                name="location"
                type="text"
                label="Location"
                placeholder="Where was the item found?"
                disabled={disabled}
              />
              <Input
                name="description"
                type="textarea"
                label="Description"
                placeholder="Item description"
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
                className="bg-rose-600 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-rose-600 focus:ring-opacity-50 hover:bg-rose-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-600"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ItemForm.PropTypes = {
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
