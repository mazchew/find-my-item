import Layout from "@/components/Layout";
import ItemForm from "@/components/ItemForm";
import axios from "axios";
import { getSession } from "next-auth/react";

const CreateItem = () => {
  const createItem = (data) =>
    axios.post("/api/items", data, {
      headers: { "Content-Type": "application/json" },
    });

  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">Post new item</h1>
        <p className="text-gray-500">
          Fill in the form below to post a new item.
        </p>
        <div className="mt-8">
          <ItemForm onSubmit={createItem} />
        </div>
      </div>
    </Layout>
  );
};

export default CreateItem;
