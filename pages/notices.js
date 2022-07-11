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

  // Get all items from the authenticated user
//   const items = await prisma.item.findMany({
//     where: { owner: { email: session.user.email } },
//     orderBy: { createdAt: 'desc' },
//   });

  // Get all notices from the authenticated user
  const notices = await prisma.notice.findMany({
    where: { owner: { email: session.user.email } },
    orderBy: { createdAt: 'desc' },
  });

  // Pass the data to the component
  return {
    props: {
      notices: JSON.parse(JSON.stringify(notices)),
    },
  };
}
const Notices = ({ notices = [] }) => {
  return (
    <Layout>
      <h1 className="text-xl font-medium text-gray-800">Your posted notices</h1>
      <p className="text-gray-500">
        Manage and update your posted notices
      </p>
      <div className="mt-8">
        <Grid notices={notices} />
      </div>
    </Layout>
  );
};

export default Items;