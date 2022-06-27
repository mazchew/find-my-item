import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("This field is required"),
});

const Signin = () => {
  const [email, setEmail] = useState("");

  const signInWithEmail = (e) => {
    e.preventDefault();
    let toastId;
    try {
      toastId = toast.loading("Loading...");
      const { error } = signIn("email", { callbackUrl: "/", email });
      if (error) {
        throw new Error(error);
      }
    } catch (error) {
      toast.error("Unable to sign in", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="mt-10">
        <Formik
          initialValues={{ email: "" }}
          validationSchema={SignInSchema}
          onSubmit={signInWithEmail}
        >
          <Form className="mt-4">
            <div className="absolute w-full h-full">
              <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                  <div className="w-full lg:w-2/5 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                      <div className="rounded-t mb-0 px-6 py-6">
                        <div className="text-center mb-3">
                          <h2 className="text-gray-600 text-lg font-bold">
                            👋 Welcome! Please sign in with your NUS email
                            address.
                          </h2>
                        </div>
                        <hr className="mt-6 border-b-1 border-gray-400" />
                      </div>
                      <div className="mt-6 border-b-1 border-gray-400 flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form onSubmit={signInWithEmail}>
                          <div className="relative w-full mb-3">
                            <label className="block uppercase text-gray-700 text-sm font-bold mb-2">
                              Email Address
                            </label>
                            <input
                              name="email"
                              type="email"
                              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-med shadow focus:outline-none focus:ring w-full"
                              placeholder="e*******@u.nus.edu"
                              styles="transition: all 0.15s ease 0s;"
                              required
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="text-center mt-6">
                            <button
                              onClick={signInWithEmail}
                              className="bg-blue-600 text-white text-med px-6 py-3 rounded shadow hover:bg-blue-500 outline-none focus:outline-none mr-1 mb-1 w-full"
                              type="submit"
                              styles="transition: all 0.15s ease 0s;"
                            >
                              Sign In
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signin;
