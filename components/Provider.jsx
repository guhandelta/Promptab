"use client";

import { SessionProvider } from 'next-auth/react'

const Provider = ({ children, session }) => {
  return (
    // Passing in the browser session as the prop
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider