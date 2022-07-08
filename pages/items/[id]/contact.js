import Layout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";
import { getSession } from "next-auth/react";
import axios from "axios";
import { prisma } from '@/lib/prisma';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // console.log(session);

  const redirect = {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
  //Check if user is logged in
  if (!session) {
    return redirect;
  }
  //Get user
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { items: true },
  });
  //Id in URL
  const id = context.params.id;
  const item = user?.items?.find((item) => item.id === id);
  if (!item) {
    return redirect;
  }

  const poster = await prisma.user.findUnique({
    where: {
      id: item.ownerId
    },
    select: {
      email: true
    },
  })

  const itemProps = JSON.parse(JSON.stringify(item));
  const posterProps = JSON.parse(JSON.stringify(poster));

  return {
    props: { itemProps, posterProps },
  };
}


<<<<<<< HEAD
const Contact = (props) => {

  const handleOnSubmit = (data) => axios.post(`/api/items/${props.itemProps.id}/contact`, { ...data, posterEmail: props.posterProps.email });
=======
const Contact = (item = null) => {
  const handleOnSubmit = (data) =>
    axios.post(`/api/items/${item.id}/contact`, data);
>>>>>>> a376f9b53e63a4c6d3ac21e5ba113f56a9c11b66
  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">Contact Form</h1>
        <p className="text-grey-500">
          Fill in the form below to contact the poster. The poster will receive
          your Email and the Message below.
        </p>
        <div className="mt-8">
<<<<<<< HEAD
        {props ? (
            <ContactForm 
=======
          {item ? (
            <ContactForm
>>>>>>> a376f9b53e63a4c6d3ac21e5ba113f56a9c11b66
              buttonText="Contact Poster"
              redirectPath={`/items/${props.itemProps.id}`}
              onSubmit={handleOnSubmit}
            />
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
