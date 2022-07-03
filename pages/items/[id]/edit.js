import Layout from "@/components/Layout";
import ItemForm from "@/components/ItemForm";
import { getSession } from "next-auth/react";
import axios from "axios";
import { prisma } from '@/lib/prisma';

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

const Edit = (item = null) => {
  const handleOnSubmit = (data) => axios.patch(`/api/items/${item.id}`, data);
  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">Edit your Item</h1>
        <p className="text-grey-500">
          Fill out the form below to update your item.
        </p>
        <div className="mt-8">
          {item ? (
            <ItemForm
              initialValues={item}
              buttonText="Update Item"
              redirectPath={`/items/${item.id}`}
              onSubmit={handleOnSubmit}
            />
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default Edit;
