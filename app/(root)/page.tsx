import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import React from 'react'

const Home = () => {
  return (
    <div>
      <p>

        HOME
      </p>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        {/* <UserButton /> */}
      </SignedIn>
    </div>
  )
}

export default Home