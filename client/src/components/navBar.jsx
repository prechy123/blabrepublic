import React from 'react'
import { useAuth } from '../context/userContext'
import { Link, useNavigate } from 'react-router-dom';
import { useCustomNav } from '../context/navigationContext';
import NavLinksLg from './navLinksLg';
import NavLinksSm from './navLinksSm';

export const NavBar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, user, logout } = useAuth();
    const { handleToggle, isOpen, isNavMenu } = useCustomNav();

    const avatar = user && `http://localhost:5000/${user.img}`

    const handleLogout = async () => {
        await logout();
        if (!user) {
            navigate('/');
        }
    }

  return (
    <div className='fixed top-0 w-full z-20 border-b border-deepPurple'>
        {/* Top nav */}
        <div className='z-[1] w-full h-8 bg-deepPurple text-white flex items-center px-6'>
            {
                isLoggedIn ? (
                    <div className='flex items-center justify-between w-screen p-4'>
                        <div>
                            <p className='font-bold'>{user.role.toUpperCase()}</p>
                        </div>
                        <div className='flex items-center'>
                            <Link className='flex items-center mr-8'>
                                <img src={avatar} alt="alt" className='w-6 h-6 rounded-lg'/>
                                <p className='mx-3 font-bold'>{user.username.toUpperCase()}</p>
                            </Link>
                            <button className='w-full bg-lemonGreen hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lemonGreen text-center text-white rounded-sm px-2' onClick={handleLogout}>Logout</button>
                            
                        </div>
                    </div>
                ) : (
                    <div className='flex justify-end w-screen px-10'>
                        <Link to='/register' className='mr-5'>Register</Link>
                        <Link to='/login'>Login</Link>
                    </div>
                )
            }
        </div>

        {/* Bottom nav */}
        <div className='bg-white'>
            <div className='flex justify-between w-full p-5'>
                {
                    isNavMenu ? (
                        <NavLinksLg/>
                    ) : (
                        <div className='md:hidden w-full'>
                            <div className='flex justify-between items-center'>
                                <div className='md:hidden'>
                                    <Link to='/'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                                        </svg>
                                    </Link>
                                </div>
                                {!isOpen && <svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={handleToggle}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                                </svg>}
                                {isOpen && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8" onClick={handleToggle}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg >}
                            </div>
                            {isOpen && <NavLinksSm className='block' />}
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}
