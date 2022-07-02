import Layout from "@/components/Layout";
import ItemForm from "@/components/ItemForm";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  const session = await getSession(context);
}
const Edit = () => {
  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">Edit your Item</h1>
        <p className="text-grey-500">
          Fill out the form below to update your item.
        </p>
        <div className="mt-8">
          <ItemForm buttonText="Update Item" />
        </div>
      </div>
    </Layout>
  );
};

export default Edit;
