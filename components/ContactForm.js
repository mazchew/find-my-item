import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Formik, Form, yupToFormErrors } from "formik";
import Input from "./Input";
// import { prisma } from "@/lib/prisma";

const ContactSchema = Yup.object().shape({
    message: Yup.string().trim().max(200).matches(/^[\.a-zA-Z0-9,!? ]*$/, "Invalid characters").required(),
});

const ContactForm = ({
    initialValues = null,
    redirectPath = "",
    buttonText = "Submit",
    onSubmit = () => null,
}) => {
    const router = useRouter();
    const [disabled, setDisabled] = useState(false);
  
    const { ...initialFormValues } = initialValues ?? {
       message: "",
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
                initialValues={initialFormValues}
                validationSchema={ContactSchema}
                validateOnBlur={false}
                onSubmit={handleOnSubmit}
            >
                {({ isSubmitting, isValid }) => (
                <Form className="space-y-8">
                    <div className="space-y-6">
                        <Input
                            name="message"
                            type="textarea"
                            label="Message"
                            placeholder="Send a message to the poster!"
                            rows={4}
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
    )
}

ContactForm.propTypes = {
    initialFormValues: PropTypes.shape({
        message: PropTypes.string,
    }),
    onSubmit: PropTypes.func,
};
  
export default ContactForm;