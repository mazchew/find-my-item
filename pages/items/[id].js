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

const PostedItem = (item = null) => {
  const router = useRouter();

  const { data: session } = useSession();
  const [isOwner, setIsOwner] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      if (session?.user) {
        try {
          const owner = await axios.get(`/api/items/${item.id}/owner`);
          setIsOwner(owner?.id === session.user.id);
        } catch (e) {
          setIsOwner(false);
        }
      }
    })();
  }, [session?.user, item?.id]);

  const deleteItem = async () => {
    let toastId;
    console.log("deleting");
    try {
      toastId = toast.loading("Deleting...");
      setDeleting(true);
      // Delete home from DB
      await axios.delete(`/api/items/${item.id}`);
      // Redirect user
      toast.success("Successfully deleted", { id: toastId });
      router.push("/items");
    } catch (e) {
      console.log(e);
      toast.error("Unable to delete home", { id: toastId });
      setDeleting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold truncate">
              {item?.title ?? ""}
            </h1>
            <ol className="inline-flex items-center space-x-1 text-gray-500">
              <li className="inline-flex items-center space-x-0.5">
                <LocationMarkerIcon className="h-4 w-4" />
                <span>{item?.location ?? ""} ·</span>
              </li>
              <li>
                <span>{item?.category?.replace("_", " ") ?? ""} ·</span>
              </li>
              <li>
                <span>
                  {moment(item?.createdAt ?? "").format("DD/MM/YYYY")}
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
                  onClick={() => router.push(`/items/${item.id}/edit`)}
                  className="px-4 py-1 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition rounded-md disabled:text-gray-800 disabled:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Edit
                </button>
                <button
                  type="button"
                  disabled={deleting}
                  onClick={deleteItem}
                  className="rounded-md border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white focus:outline-none transition disabled:bg-rose-500 disabled:text-white disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            ) : null}
            <button
              onClick={() => {
                if (session?.user) {
                  router.push(`/items/${item.id}/contact`);
                } else {
                  router.push("/signin");
                }
              }}
              className="ml-4 px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white transition"
            >
              Contact
            </button>
          </div>
        </div>

        <div className="mt-6 relative aspect-w-9 aspect-h-9 bg-gray-200 max-h-8 rounded-lg shadow-md overflow-hidden">
          {item?.image ? (
            <Image
              src={item.image}
              alt={item.title}
              layout="fill"
              objectFit="cover"
            />
          ) : null}
        </div>

        <p className="mt-8 text-lg">{item?.description ?? ""}</p>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const items = await prisma.item.findMany({
    select: { id: true },
  });

  return {
    paths: items.map((item) => ({
      params: { id: item.id },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const item = await prisma.item.findUnique({
    where: { id: params.id },
  });

  if (item) {
    return {
      props: JSON.parse(JSON.stringify(item)),
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export default PostedItem;
