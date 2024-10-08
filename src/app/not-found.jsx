import React from 'react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className='container h-screen flex flex-col gap-5 justify-center items-center'>
        <h2>Not Found</h2>        
        <p>No se encontro la ruta </p>
        <Link href="/" className='text-blue-600 font-bold text-xl'>volver Home</Link>
    </div>
  )
}

export default NotFound