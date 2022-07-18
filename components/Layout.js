import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import PropTypes from "prop-types";
import { useSession, signOut } from "next-auth/react";
import { Menu } from "@headlessui/react";
import {
  CollectionIcon,
  ClipboardListIcon,
  LogoutIcon,
  PlusIcon,
  UserIcon,
  PhotographIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";

const menuItems = [
  {
    label: "Gallery",
    icon: PhotographIcon,
    href: "/",
    hide: true,
  },
  {
    label: "NoticeBoard",
    icon: InformationCircleIcon,
    href: "/noticeboard",
    hide: true,
  },
  {
    label: "Post An Item",
    icon: PlusIcon,
    href: "/item-creation",
    hide: false,
  },
  {
    label: "Post A Notice",
    icon: PlusIcon,
    href: "/notice-creation",
    hide: false,
  },
  {
    label: "My Posted Items",
    icon: CollectionIcon,
    href: "/items",
    hide: false,
  },
  {
    label: "My Posted Notices",
    icon: ClipboardListIcon,
    href: "/notices",
    hide: false,
  },
  {
    label: "Sign Out",
    icon: LogoutIcon,
    onClick: signOut,
    hide: false,
  },
];

const Layout = ({ children }) => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoadingUser = status === "loading";
  const router = useRouter();

  return (
    <>
      <Head>
        <title>FindMyItem</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <header className="h-16 w-full shadow-md">
          <div className="h-full container mx-auto">
            <div className="h-full px-4 flex justify-between items-center space-x-4">
              <Link href="/">
                <a className="flex items-center space-x-1">
                  <span className="text-xl font-semibold tracking-wide">
                    FindMyItem
                  </span>
                </a>
              </Link>
              <div className="flex items-center space-x-4">
                {/* <Link href="/item-listing">
                  <a className="hidden sm:block hover:bg-gray-200 transition px-3 py-1 rounded-md">
                    Post an item
                  </a>
                </Link> */}
                <button
                  onClick={() => {
                    router.push("/");
                  }}
                  className="hidden sm:block hover:bg-gray-200  transition px-3 py-1 rounded-md"
                  data-testid="gallery"
                >
                  Gallery
                </button>
                <button
                  onClick={() => {
                    router.push("/noticeboard");
                  }}
                  className="hidden sm:block hover:bg-gray-200 transition px-3 py-1 rounded-md"
                >
                  NoticeBoard
                </button>

                {isLoadingUser ? (
                  <div className="h-8 w-[75px] bg-gray-200 animate-pulse rounded-md" />
                ) : user ? (
                  <Menu as="div" className="relative z-50">
                    <Menu.Button className="flex items-center space-x-px group">
                      <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                        <UserIcon className="text-gray-400 w-6 h-6" />
                      </div>
                      <ChevronDownIcon className="w-5 h-5 shrink-0 text-gray-500 group-hover:text-current" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 w-72 overflow-hidden mt-1 divide-y divide-gray-100 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="flex flex-col py-2 px-4 truncate ml-3 rounded-full overflow-hidden relative shrink-0">
                        <span className="text-sm text-gray-500">
                          {"Signed in as: " + user?.email}
                        </span>
                      </div>

                      <div className="py-2">
                        {menuItems.map(
                          ({ label, href, onClick, icon: Icon, hide }) => (
                            <div
                              key={label}
                              className="px-2 last:border-t last:pt-2 last:mt-2"
                            >
                              <Menu.Item>
                                {href ? (
                                  <Link href={href}>
                                    <a
                                      className={`${
                                        hide ? "sm:hidden" : ""
                                      } flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100`}
                                    >
                                      <Icon className="w-5 h-5 shrink-0 text-gray-500" />
                                      <span>{label}</span>
                                    </a>
                                  </Link>
                                ) : (
                                  <button
                                    className="w-full flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100"
                                    onClick={onClick}
                                  >
                                    <Icon className="w-5 h-5 shrink-0 text-gray-500" />
                                    <span>{label}</span>
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          )
                        )}
                      </div>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <Link href="/signin">
                    <a className="ml-4 px-4 py-1 rounded-md bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white transition">
                      Sign In
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow container mx-auto">
          <div className="px-4 py-12">{children}</div>
        </main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default Layout;
