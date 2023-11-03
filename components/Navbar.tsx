"use client";

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsSubtract } from 'react-icons/bs';
import Profile from './Profile';

type Props = {}

const Navbar = (props: Props) => {
    const currentPath = usePathname();

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
                                'nav-link': true,
                                '!text-slate-800': link.href === currentPath,
                            })}>{link.label}</Link>
                        </li>
                    )}
                </ul>
            </div>
            <Profile/>
        </nav>
    )
}

export default Navbar