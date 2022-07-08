import Layout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";
import { getSession } from "next-auth/react";
import axios from "axios";
// import { prisma } from '@/lib/prisma';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);

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

  return {
    props: JSON.parse(JSON.stringify(item)),
  };
}


const Contact = (item = null) => {
  const handleOnSubmit = (data) =>
    axios.post(`/api/items/${item.id}/contact`, data);
  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">Contact Form</h1>
        <p className="text-grey-500">
          Fill in the form below to contact the poster. The poster will receive
          your Email and the Message below.
        </p>
        <div className="mt-8">
          {item ? (
            <ContactForm
              buttonText="Contact Poster"
              redirectPath={`/items/${item.id}`}
              onSubmit={handleOnSubmit}
            />
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
