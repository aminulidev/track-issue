"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { BsSubtract } from 'react-icons/bs';
import classNames from 'classnames';


type Props = {}

const Navbar = (props: Props) => {
    const currentPath = usePathname();
    

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]

    return (
        <nav className='flex items-center px-5 space-x-6 h-14 border-b'>
            <Link href="/" className=' text-indigo-500'><BsSubtract className="text-3xl" /></Link>
            <ul className='flex space-x-6'>
                {links.map(link => 
                    <li key={link.label}><Link href={link.href} className={classNames({
                        'text-indigo-500': link.href === currentPath,
                        'text-zinc-500': link.href !== currentPath,
                        'hover:text-indigo-500 transition-colors': true
                    })}>{link.label}</Link></li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar