import { FC, ReactNode } from 'react';
import { NavBar } from './navbar';


export const Layout: FC<{children?: ReactNode}> = ({children}) =>{
    return (
        <div className='min-h-screen relative bg-home bg-cover bg-bottom 2xl:container mx-auto'>
        <NavBar/>
        {children}
        <footer className='bottom-0 absolute bg-gp-purple-500 w-full py-4 text-white text-center'>
        <p className="text-white">
          &copy; {new Date().getFullYear()} GP
        </p>
        </footer>
        </div>
    )
}