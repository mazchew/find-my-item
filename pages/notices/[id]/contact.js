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

  const noticeID = context.params.id;

  const poster = await prisma.notice.findUnique({
    where: { id: noticeID },
    select: { owner: true },
  });

  const notice = await prisma.notice.findUnique({
    where: { id: noticeID },
  });

  const noticeURL = process.env.BASEURL + "/notices/" + noticeID;
  const noticeProps = JSON.parse(JSON.stringify(notice));
  const posterProps = JSON.parse(JSON.stringify(poster));
  const urlProps = JSON.parse(JSON.stringify(noticeURL));

  return {
    props: { noticeProps, posterProps, urlProps },
  };
}

const Contact = (props) => {
  const handleOnSubmit = (data) =>
    axios.post(`/api/notices/${props.noticeProps.id}/contact`, {
      ...data,
      posterEmail: props.posterProps.owner.email,
      noticeURL: props.urlProps,
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
              redirectPath={`/notices/${props.noticeProps.id}`}
              onSubmit={handleOnSubmit}
            />
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
