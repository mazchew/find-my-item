import { getSession } from 'next-auth/react';
import Layout from '@/components/Layout';
import Grid from '@/components/Grid';
import { prisma } from '@/lib/prisma';

export async function getServerSideProps(context) {
  // Check if user is authenticated
  const session = await getSession(context);

  // If not, redirect to the homepage
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // Get all homes from the authenticated user
  const items = await prisma.item.findMany({
    where: { owner: { email: session.user.email } },
    orderBy: { createdAt: 'desc' },
  });

  // Pass the data to the Homes component
  return {
    props: {
      items: JSON.parse(JSON.stringify(items)),
    },
  };
}
const Items = ({ items = [] }) => {
  return (
    <Layout>
      <h1 className="text-xl font-medium text-gray-800">Your posted items</h1>
      <p className="text-gray-500">
        Manage and update your posted items
      </p>
      <div className="mt-8">
        <Grid items={items} />
      </div>
    </Layout>
  );
};

export default Items;