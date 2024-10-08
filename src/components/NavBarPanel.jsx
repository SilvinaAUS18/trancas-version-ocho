"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession,signOut} from 'next-auth/react';

   function NavBarPanel  ()  {
   const {data: session ,status}= useSession();


    const pathname = usePathname();
  return (
    <div className='container py-2 h-16 flex  bg-blue-500 text-white'>

        <ul className='flex items-center mx-auto sm:gap-8 lg:gap-40 lg:text-xl  sm:text-lg font-bold '>
            { session ? (
                <>
                        <li>
                            <Link href="/panel/crear-noticia"  className={ pathname === '/panel/crear-noticia' ? "text-green-300 font-bold" : ""}>Crear Noticia</Link>
                        </li>
                        <li>
                            <Link href="/panel/crear-calendario"  className={ pathname === '/panel/crear-calendario' ? "text-green-300 font-bold" : ""}>Crear Calendario</Link>
                        </li>
                        <li>
                            <button onClick={() => signOut()} className="py-2 w-40 bg-blue-800  text-white p-5 rounded-lg"> Cerrar</button>
                        </li>

                </>
                    
                        
            ) : (
                <>
                        <li>
                            <Link href="/panel/login"  className={ pathname === '/panel/login' ? "text-green-300 font-bold" : ""}>Login</Link>
                         </li>
                         <li>
                            <Link href="/panel/register"  className={ pathname === '/panel/register' ? "text-green-300 font-bold" : ""}>Registrar </Link>
                         </li>

                </>
            )

            }
            <li>
                <Link href="/panel/noticias" className={ pathname === '/panel/noticias' ? "text-green-300 font-bold" : ""}>Noticias</Link>
            </li>
            <li>
                <Link href="/panel/calendario" className={ pathname === '/panel/calendario' ? "text-green-300 font-bold" : ""}>Calendario</Link>
            </li>

        </ul>
    </div>
  )
}

export default NavBarPanel