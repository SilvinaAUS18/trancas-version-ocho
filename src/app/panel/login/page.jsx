import React from 'react'
import LoginForm from '../../../components/LoginForm'
//import { getServerSession } from 'next-auth'
//import {redirect} from 'next/navigation'
//import {authOptions} from '../../../lib/authOptions'

const Login = async () => {
 /* const session = await getServerSession(authOptions)

  if(session) redirect("/panel/blog")*/
  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default Login