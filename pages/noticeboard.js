import Layout from "@/components/Layout";
import NoticeGrid from "@/components/NoticeGrid";
import { prisma } from "@/lib/prisma";

// get data from database instead of json file
export async function getServerSideProps() {
  // get items
//   const items = await prisma.item.findMany({ orderBy: { createdAt: "desc" } });
  const notices = await prisma.notice.findMany({ orderBy: { createdAt: "desc" } });

  return {
    props: {
      notices: JSON.parse(JSON.stringify(notices)),
    },
  };
}

export default function Noticeboard({ notices = [] }) {
  return (
    <Layout>
      <div>
        <h1 className="text-xl font-medium text-gray-800">Noticeboard</h1>
        <p className="text-gray-500">Check out all posted notices</p>
      </div>
      <div className="mt-8">
        <NoticeGrid notices={notices} />
      </div>
    </Layout>
  );
}
