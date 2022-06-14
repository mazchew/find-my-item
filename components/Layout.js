import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';


const Layout = ({ children }) => {
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
                  <Link href="/item-creation">
                    <a className="hidden sm:block hover:bg-gray-200 transition px-3 py-1 rounded-md">
                      Post an item
                    </a>
                  </Link>
                  <Link href="/notice-creation">
                    <a className="hidden sm:block hover:bg-gray-200 transition px-3 py-1 rounded-md">
                      Post a notice
                    </a>
                  </Link>
                  <Link href="/login">
                    <a className="ml-4 px-4 py-1 rounded-md bg-rose-600 hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-500 focus:ring-opacity-50 text-white transition">
                      Log in
                    </a> 
                  </Link>

                </div>
              </div>
            </div>
          </header>

          <main className="flex-grow container mx-auto">
            <div className="px-4 py-12">
              {children}
            </div>
          </main>
        </div>
      </>
    );
};

Layout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};
  
export default Layout;