import Image from "next/image";
import Layout from "@/components/Layout";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { prisma } from "@/lib/prisma";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const PostedNotice = (notice = null) => {
  const router = useRouter();

  const { data: session } = useSession();
  const [isOwner, setIsOwner] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      if (session?.user) {
        try {
          const owner = await axios.get(`/api/notices/${notice.id}/owner`);
          setIsOwner(owner?.data?.email === session?.user?.email);
        } catch (e) {
          setIsOwner(false);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user]);

  const deleteNotice = async () => {
    let toastId;
    console.log("deleting");
    try {
      toastId = toast.loading("Deleting...");
      setDeleting(true);
      // Delete home from DB
      await axios.delete(`/api/notices/${notice.id}`);
      // Redirect user
      toast.success("Successfully deleted", { id: toastId });
      router.push("/notices");
    } catch (e) {
      console.log(e);
      toast.error("Unable to delete notice", { id: toastId });
      setDeleting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold truncate">
              {notice?.title ?? ""}
            </h1>
            <ol className="inline-flex items-center space-x-1 text-gray-500">
              <li className="inline-flex items-center space-x-0.5">
                <LocationMarkerIcon className="h-4 w-4" />
                <span>{notice?.location ?? ""} ·</span>
              </li>
              <li>
                <span>{notice?.category?.replace("_", " ") ?? ""} ·</span>
              </li>
              <li>
                <span>
                  {moment(notice?.createdAt ?? "").format("DD/MM/YYYY")}
                </span>
              </li>
            </ol>
          </div>
          <div className="flex items-center space-x-2">
            {isOwner ? (
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  disabled={deleting}
                  onClick={() => router.push(`/notices/${notice.id}/edit`)}
                  className="px-4 py-1 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition rounded-md disabled:text-gray-800 disabled:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Edit
                </button>
                <button
                  type="button"
                  disabled={deleting}
                  onClick={deleteNotice}
                  className="rounded-md border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white focus:outline-none transition disabled:bg-rose-500 disabled:text-white disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (session?.user) {
                    router.push(`/notices/${notice.id}/contact`);
                  } else {
                    router.push("/signin");
                  }
                }}
                className="ml-4 px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white transition"
              >
                Contact
              </button>
            )}
          </div>
        </div>

        <p className="mt-14 text-lg">{notice?.description ?? ""}</p>
      </div>
    </Layout>
  );
};

// export async function getStaticPaths() {
//   const notices = await prisma.notice.findMany({
//     select: { id: true },
//   });

//   return {
//     paths: notices.map((notice) => ({
//       params: { id: notice.id },
//     })),
//     fallback: true,
//   };
// }

export async function getServerSideProps({ params }) {
  const notice = await prisma.notice.findUnique({
    where: { id: params.id },
  });

  if (notice) {
    return {
      props: JSON.parse(JSON.stringify(notice)),
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export default PostedNotice;
