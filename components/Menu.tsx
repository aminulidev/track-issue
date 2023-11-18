'use client'

import Link from 'next/link'
import React from 'react'
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

const Menu = () => {
    const currentPath = usePathname();
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Lists', href: '/lists' },
        // { label: 'Issues', href: '/issues' },
        // { label: 'Users', href: '/user' },
    ]

    return (
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
    )
}

export default Menu