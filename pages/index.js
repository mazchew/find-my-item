import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import { getSession, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Home = () => {
  // Check if the user is authenticated from the client
  const { data: session, status } = useSession();

  if (status === "loading") {
    return;
    <>
      <Navbar />
      <div>Loading...</div>
    </>;
  }

  if (status === "authenticated") {
    return (
      <>
        <Navbar />
        <div>Signed in as {session.user.email}</div>
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Navbar />
        <button
          className="button"
          onClick={() => (window.location.href = "/api/auth/signin")}
        >
          Login
        </button>
      </>
    );
  }
};

export const getServerSideProps = async (ctx) => {
  // Check if the user is authenticated from the server
  const session = await getSession(ctx);
  console.log({ session });
  return {
    props: {
      session,
    },
  };
};

function box() {
  return <div className="box"></div>;
}

export default Home;
