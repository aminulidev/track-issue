import Link from 'next/link'
import React from 'react'
import { BsSubtract } from 'react-icons/bs';

type Props = {}

const Navbar = (props: Props) => {
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]
    return (
        <nav className='flex items-center px-5 space-x-6 h-14 border-b'>
            <Link href="/" className=' text-indigo-500'><BsSubtract className="text-3xl" /></Link>
            <ul className='flex space-x-6'>
                {links.map(link => 
                    <li key={link.label}><Link href={link.href} className='text-zinc-500 font-semibold hover:text-indigo-500 transition-colors'>{link.label}</Link></li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar