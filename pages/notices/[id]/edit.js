import Layout from "@/components/Layout";
import NoticeForm from "@/components/NoticeForm";
import { getSession } from "next-auth/react";
import axios from "axios";
import { prisma } from "@/lib/prisma";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const redirect = {
    redirect: {
      destination: "/noticeboard",
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
    select: { notices: true },
  });
  //Id in URL
  const id = context.params.id;
  const notice = user?.notices?.find((notice) => notice.id === id);
  if (!notice) {
    return redirect;
  }

  return {
    props: JSON.parse(JSON.stringify(notice)),
  };
}

const Edit = (notice = null) => {
  const handleOnSubmit = (data) =>
    axios.patch(`/api/notices/${notice.id}`, data);
  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">Edit your Item</h1>
        <p className="text-grey-500">
          Fill out the form below to update your notice.
        </p>
        <div className="mt-8">
          {notice ? (
            <NoticeForm
              initialValues={notice}
              buttonText="Update Notice"
              redirectPath={`/notices/${notice.id}`}
              onSubmit={handleOnSubmit}
            />
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default Edit;
