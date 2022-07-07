import Layout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";
import { getSession } from "next-auth/react";
import axios from "axios";
// import { prisma } from '@/lib/prisma';

const Contact = (item = null) => {
//   const handleOnSubmit = (data) => axios.post(`/api/items/${item.id}/contact`, data);
  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">Contact Form</h1>
        <p className="text-grey-500">
        Fill in the form below to contact the poster.
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
