import Layout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";
import { getSession } from "next-auth/react";
import axios from "axios";
import { prisma } from "@/lib/prisma";

export async function getServerSideProps(context) {
  const session = await getSession(context);

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

  const itemID = context.params.id;

  const poster = await prisma.item.findUnique({
    where: { id: itemID },
    select: { owner: true },
  });

  const item = await prisma.item.findUnique({
    where: { id: itemID },
  });

  const itemURL = process.env.VERCEL_URL + "items/" + itemID;
  const itemProps = JSON.parse(JSON.stringify(item));
  const posterProps = JSON.parse(JSON.stringify(poster));
  const urlProps = JSON.parse(JSON.stringify(itemURL));

  return {
    props: { itemProps, posterProps, urlProps },
  };
}

const Contact = (props) => {
  const handleOnSubmit = (data) =>
    axios.post(`/api/items/${props.itemProps.id}/contact`, {
      ...data,
      posterEmail: props.posterProps.owner.email,
      itemURL: props.urlProps,
    });
  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">Contact Form</h1>
        <p className="text-grey-500">
          Fill in the form below to contact the poster. The poster will receive
          your Email and the Message below.
        </p>
        <div className="mt-8">
          {props ? (
            <ContactForm
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
