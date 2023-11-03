"use client";

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsSubtract } from 'react-icons/bs';
import { useSession } from 'next-auth/react'


type Props = {}

const Navbar = (props: Props) => {
    const currentPath = usePathname();
    const {status, data: session} = useSession();

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]

    return (
        <nav className='container flex items-center justify-between px-5 space-x-6 h-14 border-b'>
            <div className='flex items-center space-x-6'>
                <Link href="/" className=' text-slate-800'><BsSubtract className="text-3xl" /></Link>
                <ul className='flex space-x-6'>
                    {links.map(link =>
                        <li key={link.label}>
                            <Link href={link.href} className={classNames({
                                'text-slate-800': link.href === currentPath,
                                'text-slate-500': link.href !== currentPath,
                                'hover:text-slate-800 font-semibold transition-colors': true
                            })}>{link.label}</Link>
                        </li>
                    )}
                </ul>
            </div>
            <div>
                {status === 'authenticated' && <Link className='text-slate-500 hover:text-slate-800 font-semibold transition-colors' href='/api/auth/signout'>Logout</Link>}
                {status === 'unauthenticated' && <Link className='text-slate-500 hover:text-slate-800 font-semibold transition-colors' href='/api/auth/signin'>Signin</Link>}
            </div>
        </nav>
    )
}

export default Navbar