import Layout from "@/components/Layout";
import Grid from "@/components/Grid";
import { prisma } from "@/lib/prisma";

// get data from database instead of json file
export async function getServerSideProps() {
  // get items
  const items = await prisma.item.findMany({ orderBy: { createdAt: "desc" } });

  return {
    props: {
      items: JSON.parse(JSON.stringify(items)),
    },
  };
}

export default function Home({ items = [] }) {
  return (
    <Layout>
      <div>
        <h1 className="text-xl font-medium text-gray-800">Item Gallery</h1>
        <p className="text-gray-500">Check out all found items</p>
      </div>
      <div className="mt-8">
        <Grid items={items} />
      </div>
    </Layout>
  );
}
