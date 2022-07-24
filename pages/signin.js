// import React, { useState, useEffect } from "react";
// import Input from "@/components/Input";
// import * as Yup from "yup";
// import { signIn } from "next-auth/react";
// import { toast } from "react-hot-toast";
// import { Formik, Form } from "formik";

// const SignInSchema = Yup.object().shape({
//   email: Yup.string()
//     .trim()
//     .email("Invalid email")
//     .matches(/^e[0-9]{7}@u\.nus\.edu$/, "Please use your NUS email to sign in")
//     .required("This field is required"),
// });

// const Signin = () => {
//   const [email, setEmail] = useState("");
//   const [disabled, setDisabled] = useState(false);

//   const signInWithEmail = async ({ email }) => {
//     let toastId;
//     try {
//       toastId = toast.loading('Loading...');
//       setDisabled(true);
//       // Perform sign in
//       await signIn('email', {
//         callbackUrl: "/",
//         email,
//       });
//       // Something went wrong
//       // if (error) {
//       //   console.log(error);
//       //   throw new Error(error);
//       // }
//       toast.dismiss(toastId);
//     } catch (err) {
//       console.log(err);
//       toast.error('Unable to sign in', { id: toastId });
//     } finally {
//       setDisabled(false);
//     }
//   };

//   // const signInWithEmail = (e) => {
//   //   // e.preventDefault();
//   //   let toastId;
//   //   try {
//   //     toastId = toast.loading("Loading...");
//   //     setDisabled(true);
//   //     const { error } = signIn("email", { redirect: false, callbackUrl: "/", email });
//   //     if (error) {
//   //       throw new Error(error);
//   //     }
//   //   } catch (error) {
//   //     toast.error("Unable to sign in", { id: toastId });
//   //   } finally {
//   //     setDisabled(false);
//   //   }
//   // };




//   return (
//     <div className="min-h-screen items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
//       <div className="mt-10">
//         <Formik
//           initialValues={{ email: "" }}
//           validationSchema={SignInSchema}
//           validateOnBlur={false}
//           onSubmit={signInWithEmail}
//         >
//           {({ isSubmitting, isValid }) => (
//           <Form className="mt-4">
//             <div className="absolute w-full h-full">
//               <div className="container mx-auto px-4 h-full">
//                 <div className="flex content-center items-center justify-center h-full">
//                   <div className="w-full lg:w-2/5 px-4">
//                     <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
//                       <div className="rounded-t mb-0 px-6 py-6">
//                         <div className="text-center mb-3">
//                           <h2 className="text-gray-600 text-lg font-bold">
//                             👋 Welcome! Please sign in with your NUS email
//                             address.
//                           </h2>
//                         </div>
//                         <hr className="mt-6 border-b-1 border-gray-400" />
//                       </div>
//                       <div className="mt-6 border-b-1 border-gray-400 flex-auto px-4 lg:px-10 py-10 pt-0">
//                         {/* <form onSubmit={signInWithEmail}> */}
//                           <div className="relative w-full mb-3">
//                             <label className="block uppercase text-gray-700 text-sm font-bold mb-2">
//                               Email Address
//                             </label>
//                             <Input
//                               name="email"
//                               type="email"
//                               // className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-med shadow focus:outline-none focus:ring w-full"
//                               placeholder="e*******@u.nus.edu"
//                               // styles="transition: all 0.15s ease 0s;"
//                               required
//                               disabled={disabled}
//                               spellCheck={false}
//                               // onChange={(e) => setEmail(e.target.value)}
//                             />
//                           </div>
//                           <div className="text-center mt-6">
//                             <button
//                               // onClick={signInWithEmail}
//                               className="bg-blue-600 text-white text-med px-6 py-3 rounded shadow hover:bg-blue-500 outline-none focus:outline-none mr-1 mb-1 w-full disabled:opacity-50 transition disabled:cursor-not-allowed"
//                               type="submit"
//                               disabled={disabled || !isValid}
//                               // styles="transition: all 0.15s ease 0s;"
//                             >
//                               {/* Sign In */}
//                               {isSubmitting ? "Loading..." : "Sign In"}
//                             </button>
//                           </div>
//                         {/* </form> */}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default Signin;


import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/router';
import { signIn, getSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { MailOpenIcon } from '@heroicons/react/outline';
import Input from '@/components/Input';
import { Formik, Form } from "formik";
import * as Yup from "yup";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}


const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email")
    // .matches(/^e[0-9]{7}@u\.nus\.edu$/, "Please use your NUS email to sign in")
    .required("This field is required"),
});


const MagicLinkModal = ({ show = false }) => {
  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 z-10 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md backdrop-grayscale">
      <div className="min-h-screen px-6 flex flex-col items-center justify-center animate-zoomIn">
        <div className="flex flex-col items-center justify-center text-center max-w-sm">
          <MailOpenIcon className="flex-shrink-0 w-12 h-12 text-blue-500" />
          <h3 className="mt-2 text-2xl font-semibold">Confirm your email</h3>
          <p className="mt-4 text-lg">
            We&apos;ve emailed a magic link to you. Check your
            inbox and click the link in the email to sign in.
            <br />
            You may close this window.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

const SignIn = () => {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let intervalId, redirecting;

    if (showModal) {
      setInterval(async () => {
        const session = await getSession();
        if (session && !redirecting) {
          // User connected using the magic link -> redirect him/her
          redirecting = true;
          router.push(router.query?.callbackUrl || "/");
        }
      }, 1000);
    }

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [showModal, router]);

  const handleSignIn = async ({ email }) => {
    let toastId;
    try {
      toastId = toast.loading("Loading...");
      setDisabled(true);
      // Perform sign in
      const { error } = await signIn("email", {
        email,
        redirect: false,
        callbackUrl: "/",
      });
      // Something went wrong
      if (error) {
        throw new Error(error);
      }
      setShowModal(true);
      toast.success('Magic link successfully sent', { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error('Unable to send magic link', { id: toastId });
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="min-h-screen items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="mt-10">
        <Formik
        initialValues={{ email: "" }}
        validationSchema={SignInSchema}
        validateOnBlur={false}
        onSubmit={handleSignIn}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="mt-4 ">
              <div className="absolute w-full h-full">
                <div className="container mx-auto px-4 h-full">
                  <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-2/5 px-4">
                      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                          <div className="text-center mb-3"> 
                            <h2 className="text-gray-600 text-lg font-semibold">
                              👋 Welcome! Please sign in with your NUS email address.
                            </h2>
                          </div>
                          <hr className="mt-6 border-b-1 border-gray-400" />
                          <div className="relative w-full mb-3 mt-3 border-b-1 border-gray-400 flex-auto py-3">
                            <label className="block text-gray-500 text-sm mb-2">
                            Email Address
                            </label>        
                            <Input
                              name="email"
                              type="email"
                              placeholder="e*******@u.nus.edu"
                              required
                              disabled={disabled}
                              spellCheck={false}
                            />
                          </div>
                          <div className="text-center mt-6">
                            <button
                              className="bg-blue-600 text-white text-med px-6 py-3 rounded shadow hover:bg-blue-500 outline-none focus:outline-none mr-1 mb-1 w-full disabled:opacity-50 transition disabled:cursor-not-allowed"
                              type="submit"
                              disabled={disabled || !isValid}
                            >
                              {isSubmitting ? "Loading..." : "Sign In"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </Form>
          )}
        </Formik>
      </div>
      <MagicLinkModal show={showModal} />

      {/* <h2 className="text-gray-600 text-lg font-semibold">
        👋 Welcome! Please sign in with your NUS email address.
      </h2>
      <hr className="mt-6 border-b-1 border-gray-400" />
      <div className="relative w-full mb-3 mt-3 border-b-1 border-gray-400 flex-auto py-3">
        <label className="block text-gray-500 text-sm mb-2">
        Email Address
        </label>        
        <Input
          name="email"
          type="email"
          placeholder="e*******@u.nus.edu"
          required
          disabled={disabled}
          spellCheck={false}
          // onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="text-center mt-6">
        <button
          // onClick={signInWithEmail}
          className="bg-blue-600 text-white text-med px-6 py-3 rounded shadow hover:bg-blue-500 outline-none focus:outline-none mr-1 mb-1 w-full disabled:opacity-50 transition disabled:cursor-not-allowed"
          type="submit"
          disabled={disabled || !isValid}
          // styles="transition: all 0.15s ease 0s;"
        > */}
          {/* Sign In */}
          {/* {isSubmitting ? "Loading..." : "Sign In"}
        </button>
      </div> */}




      {/* <form
        onSubmit={handleSignIn}
        className="mt-8 rounded-lg shadow-md bg-white px-4 py-6 sm:px-8 sm:py-8 space-y-6 w-full max-w-md"
      >
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-gray-500 text-sm">
            Email address
          </label>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={SignInSchema}
            validateOnBlur={false}
            onSubmit={handleSignIn}
          >
          {({ isSubmitting, isValid }) => (
              <input
                id="email"
                type="email"
                required
                // onChange={e => setEmail(e.target.value)}
                placeholder="elon@spacex.com"
                disabled={disabled}
                className="py-2 px-4 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-4 focus:ring-opacity-20 focus:border-blue-400 focus:ring-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed "
              />
          )}
          </Formik>
        </div>
        <button
          type="submit"
          disabled={disabled}
          className="px-6 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500 transition"
        >
          {disabled ? 'Loading...' : 'Sign in'}
        </button>
      </form>

      <MagicLinkModal show={showModal} email={email} /> */}
    </div>
  );
};

export default SignIn;