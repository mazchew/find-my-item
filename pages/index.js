import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getSession, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  // Check if the user is authenticated from the client
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <>Loading...</>
  }

  if (status === 'authenticated') {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  if (status === 'unauthenticated') {
    return (
      <>
        Not signed in <br />
        <Link href='/api/auth/signin'>
          <a>Login</a>
        </Link>
      </>
    )
  }
}

export const getServerSideProps = async ctx => {
  // Check if the user is authenticated from the server
  const session = await getSession(ctx)
  console.log({ session })
  return {
    props: {
      session
    }
  }
}

export default Home
