import Layout from "@/components/Layout";
import { getSession } from "next-auth/react";
import axios from "axios";
import ItemForm from "@/components/ItemForm";

export async function getServerSideProps(context) {
  // Check if user is authenticated
  const session = await getSession(context);

  // If not, redirect to the homepage
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

const Create = () => {
  const addHome = (data) => axios.post("/api/items", data);

  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">List your home</h1>
        <p className="text-gray-500">
          Fill out the form below to add a found item.
        </p>
        <div className="mt-8">
          <ItemForm onSubmit={addHome} />
        </div>
      </div>
    </Layout>
  );
};

export default Create;
