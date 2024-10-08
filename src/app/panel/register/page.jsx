import React from 'react'
import FormularioRegistro from '../../../components/FormularioRegistro'
//import { getServerSession } from 'next-auth'
//import {redirect} from 'next/navigation'

//import {authOptions} from '../../../lib/authOptions'
const Registro = async () => {

 /* const session = await getServerSession(authOptions)

  if(session) redirect("/panel/blog")*/

  return (
    <div>
      <FormularioRegistro />
    </div>
  )
}

export default Registro