
import NavBarPanel from '../../components/NavBarPanel'
import Providers from './Providers'

export default function PanelLayout({children}){
    return(
    
            <>
            <Providers>
            <NavBarPanel />            
            {children}
            </Providers>
            </>
)

}