import Link from 'next/link'
import React from 'react'

const Success = () => {
    return (
        <div>
            <h1>Sign-in successful</h1>
            <Link href='/'>
                <a>Go back to homepage.</a>
            </Link>
        </div>
    )   
}

export default Success