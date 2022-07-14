import Layout from "@/components/Layout";
import ItemForm from "@/components/ItemForm";
import axios from "axios";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
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

const CreateNotice = () => {
  const createNotice = (data) =>
    axios.post("/api/notices", data, {
      headers: { "Content-Type": "application/json" },
    });

  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">Post new notice</h1>
        <p className="text-gray-500">
          Fill in the form below to post a new notice.
        </p>
        <div className="mt-8">
          <ItemForm onSubmit={createNotice} redirectPath="/noticeboard" />
        </div>
      </div>
    </Layout>
  );
};

export default CreateNotice;
