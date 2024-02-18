import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../Logo'
import LogoutBtn from './LogoutBtn'
import { useSelector } from 'react-redux'
import Button from '../Button'

const Header = () => {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.userData);

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: authStatus
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        },

    ]

    const [showNavList, setshowNavList] = useState(false);

    const toggleNavList = () => {
        setshowNavList((prev) => !prev);
    }

    useEffect(() => {

        const handleOutClick = (e) => {
            if (e.target.closest(".toggleNavListBtn")) {
                setshowNavList((prev) => !prev);
            }else{
                setshowNavList(false)
            }
        }
        document.addEventListener("click", handleOutClick);
        return () => {
            document.removeEventListener("click", handleOutClick)
        };
    }, []);

    return (
        <header className='p-2 bg-gray-900 relative'>
            <div className='w-full max-w-2xl mx-auto'>
                <nav className={`flex items-center ${!authStatus ? 'justify-center' : 'justify-between'}`}>
                    <div className="mr-4">
                        <Link to={"/"}>
                            <Logo width='40px' />
                        </Link>
                    </div>
                    {authStatus &&
                        <Button classname={`toggleNavListBtn sm:hidden block h-10 max-w-[60px] ${showNavList ? 'bg-gray-600':'bg-gray-900'}`}>
                            <img src="/menu.svg" className="h-full w-full" alt="" />
                        </Button>
                    }

                    {authStatus &&
                        <>
                            <ul className={`hidden sm:flex pc navList w-100 ml-auto h-auto overflow-hidden rounded-2xl`}>
                                {navItems.map((item) =>
                                    item.active ? (
                                        <li key={item.name}>
                                            <button onClick={() => navigate(item.slug)} className='inline-block w-full px-6 py-2 duration-200 hover:bg-gray-700 rounded-xl'>
                                                {item.name}
                                            </button>
                                        </li>
                                    ) : null
                                )}
                                <li>
                                    <LogoutBtn classname='rounded-xl' />
                                </li>
                            </ul>
                            <ul className={`mobile navList z-[100] w-100 flex sm:hidden flex-col absolute h-auto top-16 right-0 p-2 duration-200 ${showNavList ? "" : 'transform translate-x-[100%] p-0'} overflow-hidden bg-gray-900 rounded-l-xl`}>
                                {navItems.map((item) =>
                                    item.active ? (
                                        <li key={item.name}>
                                            <button onClick={() => navigate(item.slug)} className='w-full px-6 py-2 duration-200 hover:bg-gray-700 rounded-lg'>
                                                {item.name}
                                            </button>
                                        </li>
                                    ) : null
                                )}
                                <li>
                                    <LogoutBtn className="rounded-lg" />
                                </li>
                            </ul>
                        </>

                    }

                </nav>
            </div>
        </header>
    )
}

export default Header